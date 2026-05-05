"use client";

// iPod-style sound effects using Web Audio API
// Designed to be subtle and authentic to the original iPod experience

let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext {
    if (!audioContext) {
        audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContext;
}

// Click wheel tick - very subtle, fast click for each scroll notch
export function playWheelTick() {
    try {
        const ctx = getAudioContext();
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        // High-pitched, very short tick - mimics the iPod click wheel
        oscillator.frequency.value = 3200;
        oscillator.type = "sine";

        // Very quiet and extremely short
        gainNode.gain.setValueAtTime(0.04, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.012);

        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.012);
    } catch (e) {
        // Silently fail if audio context not available
    }
}

// Center button click - subtle click similar to wheel tick but slightly different
export function playButtonClick() {
    try {
        const ctx = getAudioContext();
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        // Similar to wheel tick but slightly lower and longer for a "select" feel
        oscillator.frequency.value = 2800;
        oscillator.type = "sine";

        gainNode.gain.setValueAtTime(0.05, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.018);

        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.018);
    } catch (e) {
        // Silently fail
    }
}

// Menu button click - subtle tick similar to wheel
export function playMenuClick() {
    try {
        const ctx = getAudioContext();
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        // Same style as wheel tick - quick, subtle
        oscillator.frequency.value = 3000;
        oscillator.type = "sine";

        gainNode.gain.setValueAtTime(0.045, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.015);

        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.015);
    } catch (e) {
        // Silently fail
    }
}

// Play/Pause click - crisp toggle sound
export function playPlayPauseClick() {
    try {
        const ctx = getAudioContext();
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.frequency.setValueAtTime(2000, ctx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(1000, ctx.currentTime + 0.035);
        oscillator.type = "sine";

        gainNode.gain.setValueAtTime(0.10, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.05);
    } catch (e) {
        // Silently fail
    }
}

// Forward/Rewind button click
export function playNavClick() {
    try {
        const ctx = getAudioContext();
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.frequency.setValueAtTime(1600, ctx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(900, ctx.currentTime + 0.04);
        oscillator.type = "sine";

        gainNode.gain.setValueAtTime(0.08, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.055);

        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.055);
    } catch (e) {
        // Silently fail
    }
}
