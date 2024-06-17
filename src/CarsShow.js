import React from 'react';
import { OrbitControls, PerspectiveCamera, Environment } from "@react-three/drei";
import { Ground } from "./Ground";
import { Car } from "./Car";
import { GroundGrid } from "./GroundGrid";

function CarShow({
    Speed,
    turningMove,
    isheadLightsON,
    isheadlightBeamHIGH,
    directionalLights,
    openedDoors,
    dayNight // Prop value ranging from -10 to 10
}) {
  // Calculate the opacity of the night_Sky based on the interpolation value
  const nightSkyOpacity = Math.max(0, Math.min((10 - dayNight) / 10, 1));
  // Calculate the opacity of the day_Sky based on the interpolation value
  const daySkyOpacity = Math.max(0, Math.min((dayNight + 10) / 10, 1));

  return (
    <>
      {/* Environment component with interpolated opacity for night_Sky */}
      <Environment files={['textures/day_Sky.hdr']} />

      <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} />
      <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />
      <color args={[0, 0, 0]} attach="background" />
      <Car
        wheelRotationSpeed={Speed}
        directionalLights={directionalLights}
        headLightsON={isheadLightsON}
        headlightsBeamHIGH={isheadlightBeamHIGH}
        turningMove={turningMove}
        openedDoors={openedDoors}
      />
      <GroundGrid speed={Speed} />
      {/* Define your spotlights or other lights here */}
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
      <Ground speed={Speed} />
    </>
  );
}

export default CarShow;
