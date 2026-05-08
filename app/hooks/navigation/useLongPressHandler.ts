import { useCallback, useRef } from "react";

const LONG_PRESS_THRESHOLD = 500;

export interface UseLongPressHandlerProps {
  onLongPress: () => void;
  onPress: () => void;
  longPressThreshold?: number;
}

export const useLongPressHandler = ({
  onPress,
  onLongPress,
  longPressThreshold = LONG_PRESS_THRESHOLD,
}: UseLongPressHandlerProps) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const wasLongPressActivated = useRef(false);

  const handleClearTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = null;
  }, []);

  const handlePointerDown = useCallback((event: React.PointerEvent) => {
    event.stopPropagation();
    timeoutRef.current = setTimeout(() => {
      wasLongPressActivated.current = true;
      onLongPress();
    }, longPressThreshold);
  }, [longPressThreshold, onLongPress]);

  const handlePointerUp = useCallback((event: React.PointerEvent) => {
    event.stopPropagation();
    if (wasLongPressActivated.current) {
      wasLongPressActivated.current = false;
    } else {
      onPress();
    }
    handleClearTimeout();
  }, [handleClearTimeout, onPress]);

  const handlePointerCancel = useCallback((event: React.PointerEvent) => {
    event.stopPropagation();
    handleClearTimeout();
  }, [handleClearTimeout]);

  return {
    onPointerDown: handlePointerDown,
    onPointerUp: handlePointerUp,
    onPointerCancel: handlePointerCancel,
  };
};
