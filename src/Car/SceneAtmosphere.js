import React, { useEffect, useMemo } from 'react';
import { useThree } from '@react-three/fiber';
import { Color } from 'three';

// dayNight: -10 (full day) .. +10 (full night)
// climate  :   0 (clear)   .. 10 (storm)
export function SceneAtmosphere({ dayNight = -5, climate = 0 }) {
  const { scene } = useThree();

  // Normalize
  const daylight = Math.max(0, Math.min(1, (10 - dayNight) / 20)); // 1=day, 0=night
  const storm    = Math.max(0, Math.min(1, climate / 10));         // 0=clear, 1=storm

  // --- Sky palette (linear interpolation) ---
  const skyColor = useMemo(() => {
    const night = new Color('#02040a');
    const dawn  = new Color('#2a1e35');
    const day   = new Color('#8fb8d6');
    const rain  = new Color('#3a4048');

    let base;
    if (daylight < 0.5) {
      base = night.clone().lerp(dawn, daylight * 2);
    } else {
      base = dawn.clone().lerp(day, (daylight - 0.5) * 2);
    }
    return base.lerp(rain, storm * 0.75);
  }, [daylight, storm]);

  // --- Light color and intensities ---
  const sunColor = useMemo(() => {
    const warm = new Color('#ffb26b'); // dawn / dusk
    const cool = new Color('#fff4d6'); // noon
    const moon = new Color('#9fb8d9'); // night
    if (daylight > 0.6) return cool.clone().lerp(warm, (1 - daylight) / 0.4 * 0.2);
    if (daylight > 0.2) return warm.clone().lerp(moon, (0.6 - daylight) / 0.4);
    return moon.clone();
  }, [daylight]);

  const sunIntensity  = 0.2 + daylight * 2.4 * (1 - storm * 0.7);
  const ambient       = 0.08 + daylight * 0.7 * (1 - storm * 0.5);
  const sunY          = -8 + daylight * 40;   // rises from below horizon
  const sunX          = 15 - daylight * 20;

  // --- Fog ---
  const fogNear = 8  + (1 - storm) * 30;
  const fogFar  = 70 - storm * 45;

  // Apply sky as scene background
  useEffect(() => {
    scene.background = skyColor;
  }, [scene, skyColor]);

  return (
    <>
      <fog attach="fog" args={[skyColor.getHex(), fogNear, fogFar]} />

      <ambientLight intensity={ambient} color={skyColor} />

      <directionalLight
        position={[sunX, sunY, 12]}
        intensity={sunIntensity}
        color={sunColor}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />

      {/* Faint cool bounce from the opposite side — moon-ish fill */}
      <directionalLight
        position={[-sunX, 8, -12]}
        intensity={0.15 * (1 - daylight) + 0.05}
        color="#9fb8d9"
      />
    </>
  );
}