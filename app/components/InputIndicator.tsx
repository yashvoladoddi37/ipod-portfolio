"use client";

import { useEffect, useState, useCallback, useRef } from "react";

interface Click {
  id: number;
  x: number;
  y: number;
  timestamp: number;
}

interface TrailDot {
  id: number;
  x: number;
  y: number;
}

const KEY_DISPLAY_DURATION = 400; // ms - much faster
const CLICK_DISPLAY_DURATION = 400; // ms
const TRAIL_DOT_LIFETIME = 500; // ms - how long each dot lives
const TRAIL_THROTTLE = 30; // ms - how often to add a new dot

export default function InputIndicator() {
  const [currentKey, setCurrentKey] = useState<string | null>(null);
  const [clicks, setClicks] = useState<Click[]>([]);
  const [trail, setTrail] = useState<TrailDot[]>([]);
  const [idCounter, setIdCounter] = useState(0);
  const [keyTimeoutId, setKeyTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const lastTrailTimeRef = useRef(0);

  // Handle keyboard events - only show latest key
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const displayKey = getDisplayKey(e);
    if (!displayKey) return;

    // Clear any existing timeout
    if (keyTimeoutId) {
      clearTimeout(keyTimeoutId);
    }

    // Show the new key
    setCurrentKey(displayKey);

    // Set new timeout to hide it
    const timeoutId = setTimeout(() => {
      setCurrentKey(null);
    }, KEY_DISPLAY_DURATION);

    setKeyTimeoutId(timeoutId);
  }, [keyTimeoutId]);

  // Handle mouse clicks
  const handleClick = useCallback((e: MouseEvent) => {
    const newClick: Click = {
      id: idCounter,
      x: e.clientX,
      y: e.clientY,
      timestamp: Date.now(),
    };

    setIdCounter(prev => prev + 1);
    setClicks(prev => [...prev, newClick]);

    // Remove after duration
    setTimeout(() => {
      setClicks(prev => prev.filter(c => c.id !== newClick.id));
    }, CLICK_DISPLAY_DURATION);
  }, [idCounter]);

  // Handle mouse down/up for trail
  const handleMouseDown = useCallback(() => {
    setIsMouseDown(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsMouseDown(false);
  }, []);

  // Handle mouse move for trail (only when mouse is down)
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isMouseDown) return;

    const now = Date.now();
    if (now - lastTrailTimeRef.current < TRAIL_THROTTLE) return;
    lastTrailTimeRef.current = now;

    const dotId = idCounter;
    const newDot: TrailDot = {
      id: dotId,
      x: e.clientX,
      y: e.clientY,
    };

    setIdCounter(prev => prev + 1);
    setTrail(prev => [...prev, newDot]);

    // Remove after duration
    setTimeout(() => {
      setTrail(prev => prev.filter(d => d.id !== dotId));
    }, TRAIL_DOT_LIFETIME);
  }, [isMouseDown, idCounter]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("click", handleClick);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleKeyDown, handleClick, handleMouseDown, handleMouseUp, handleMouseMove]);

  return (
    <>
      {/* Keyboard indicator - bottom center, only shows latest key */}
      {currentKey && (
        <div style={{
          position: "fixed",
          bottom: "32px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 9999,
          pointerEvents: "none"
        }}>
          <div
            style={{
              backgroundColor: "white",
              color: "black",
              padding: "8px 16px",
              borderRadius: "10px",
              fontSize: "28px",
              fontFamily: "system-ui, sans-serif",
              fontWeight: 500,
              boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
              border: "1px solid #e0e0e0",
              lineHeight: 1
            }}
          >
            {currentKey}
          </div>
        </div>
      )}

      {/* Click indicators - at click position */}
      {clicks.map(c => (
        <div
          key={c.id}
          style={{
            position: "fixed",
            left: c.x,
            top: c.y,
            transform: "translate(-50%, -50%)",
            zIndex: 9999,
            pointerEvents: "none"
          }}
        >
          <div style={{
            width: "16px",
            height: "16px",
            borderRadius: "50%",
            border: "2px solid white",
            backgroundColor: "rgba(255,255,255,0.4)",
            animation: "ping 0.4s ease-out forwards"
          }} />
        </div>
      ))}

      {/* Mouse trail - shows when dragging/scrolling */}
      {trail.map(dot => (
        <div
          key={dot.id}
          style={{
            position: "fixed",
            left: dot.x,
            top: dot.y,
            transform: "translate(-50%, -50%)",
            zIndex: 9998,
            pointerEvents: "none",
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            backgroundColor: "rgba(255,255,255,0.8)",
            boxShadow: "0 0 8px rgba(255,255,255,0.5)",
            animation: "trail-fade 0.5s ease-out forwards"
          }}
        />
      ))}

      <style jsx global>{`
        @keyframes ping {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        @keyframes trail-fade {
          0% {
            opacity: 0.8;
            transform: translate(-50%, -50%) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.3);
          }
        }
      `}</style>
    </>
  );
}

// Convert key events to readable display strings
function getDisplayKey(e: KeyboardEvent): string | null {
  const key = e.key;

  // Special keys
  const specialKeys: Record<string, string> = {
    " ": "Space",
    "ArrowUp": "↑",
    "ArrowDown": "↓",
    "ArrowLeft": "←",
    "ArrowRight": "→",
    "Enter": "Enter ⏎",
    "Escape": "Esc",
    "Backspace": "⌫",
    "Tab": "Tab",
    "Shift": "⇧",
    "Control": "Ctrl",
    "Alt": "Alt",
    "Meta": "⌘",
  };

  if (specialKeys[key]) {
    return specialKeys[key];
  }

  // Single printable characters
  if (key.length === 1) {
    return key.toUpperCase();
  }

  // Function keys
  if (key.startsWith("F") && key.length <= 3) {
    return key;
  }

  // Skip other keys
  return null;
}
