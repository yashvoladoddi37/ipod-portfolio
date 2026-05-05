"use client";

import SplashCursor from "components/SplashCursor";

export default function SplashCursorWrapper() {
  return (
    <SplashCursor 
      colorMode="blue"
      SPLAT_RADIUS={0.15}
      SPLAT_FORCE={2500}
      DENSITY_DISSIPATION={5}
      VELOCITY_DISSIPATION={3}
    />
  );
}
