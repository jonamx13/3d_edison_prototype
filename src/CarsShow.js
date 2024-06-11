import React from 'react';
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Ground } from "./Ground";
import { Car } from "./Car";
import { GroundGrid } from "./GroundGrid";

function CarShow() {
  // Controls
  const speed = 2;

  return (
    <>
      <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} />
      <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />
      <color args={[0, 0, 0]} attach="background" />
      <Car
        wheelRotationSpeed={speed}
        directionalLights={'blinker'}
        headLights={'high'}
        turningMove={-0.5} // TODO: Make it analog
      />
      <GroundGrid speed={speed} />
      <spotLight
        color={[1, 0.25, 0.7]}
        intensity={150}
        angle={0.6}
        penumbra={0.5}
        position={[5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />
      <spotLight
        color={[0.14, 0.5, 1]}
        intensity={200}
        angle={0.6}
        penumbra={0.5}
        position={[-5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />
      <Ground speed={speed} />
    </>
  );
}

export default CarShow;