import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from "@react-three/drei";
import { Ground } from "./Ground";
import { Car } from "./Car";
import { GroundGrid } from "./GroundGrid";
import { SceneAtmosphere } from "./SceneAtmosphere";
import { Rain } from "./Rain";

function CarShow({
  Speed,
  turningMove,
  isheadLightsON,
  isheadlightBeamHIGH,
  directionalLights,
  openedDoors,
  dayNight,
  climate,
}) {
  // Smoothed steering-derived scroll angle.
  // Reaches turningMove * 0.9 rad (±0.45 rad ≈ ±26°) with a spring-like ease.
  const scrollAngleRef = useRef(0);

  useFrame((_, delta) => {
    const target = turningMove * 0.9;
    scrollAngleRef.current +=
      (target - scrollAngleRef.current) * Math.min(1, delta * 6);
  });

  return (
    <>
      {/* Sky, sun/moon, ambient, fog — driven by dayNight + climate */}
      <SceneAtmosphere dayNight={dayNight} climate={climate} />

      {/* Rain particles — hidden when climate = 0 */}
      <Rain intensity={climate} />

      {/* HDRi for car paint reflections only */}
      <Environment files={['textures/day_Sky.hdr']} />

      <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} />
      <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />

      {/* Car stays put — no group rotation */}
      <Car
        wheelRotationSpeed={Speed}
        directionalLights={directionalLights}
        headLightsON={isheadLightsON}
        headlightsBeamHIGH={isheadlightBeamHIGH}
        turningMove={turningMove}
        openedDoors={openedDoors}
      />

      <GroundGrid speed={Speed} scrollAngleRef={scrollAngleRef} />

      <spotLight
        color={[1, 0.25, 0.7]}
        intensity={150}
        angle={0.6}
        penumbra={0.5}
        position={[5, 5, 0]}
        castShadow
        shadowBias={-0.0001}
      />
      <spotLight
        color={[0.14, 0.5, 1]}
        intensity={200}
        angle={0.6}
        penumbra={0.5}
        position={[-5, 5, 0]}
        castShadow
        shadowBias={-0.0001}
      />

      <Ground speed={Speed} scrollAngleRef={scrollAngleRef} />
    </>
  );
}

export default CarShow;