import React, { useEffect, useRef } from 'react';
import { MeshReflectorMaterial } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { LinearEncoding } from "@react-three/drei/helpers/deprecated";
import { RepeatWrapping, TextureLoader } from "three";

export function Ground({ speed, scrollAngleRef }) {
  const [roughness, normal] = useLoader(TextureLoader, [
    process.env.PUBLIC_URL + "textures/terrain-roughness.jpg",
    process.env.PUBLIC_URL + "textures/terrain-normal.jpg",
  ]);

  const smoothSpeed = useRef(0);

  useEffect(() => {
    [normal, roughness].forEach((t) => {
      t.wrapS = RepeatWrapping;
      t.wrapT = RepeatWrapping;
      t.repeat.set(5, 5);
    });
    normal.encoding = LinearEncoding;
  }, [normal, roughness]);

  useFrame((_, delta) => {
    // Smooth speed so slider changes never snap
    smoothSpeed.current +=
      (speed - smoothSpeed.current) * Math.min(1, delta * 3);

    const dist  = (smoothSpeed.current / 2) * 0.128 * delta;
    const angle = scrollAngleRef?.current ?? 0;

    const dx =  Math.sin(angle) * dist;
    const dy = -Math.cos(angle) * dist;

    roughness.offset.x += dx;
    roughness.offset.y += dy;
    normal.offset.x    += dx;
    normal.offset.y    += dy;
  });

  return (
    <mesh rotation-x={-Math.PI * 0.5} castShadow receiveShadow>
      <planeGeometry args={[30, 30]} />
      <MeshReflectorMaterial
        envMapIntensity={0}
        normalMap={normal}
        normalScale={[0.15, 0.15]}
        roughnessMap={roughness}
        dithering={true}
        color={[0.015, 0.015, 0.015]}
        roughness={0.7}
        blur={[1000, 400]}
        mixBlur={30}
        mixStrength={80}
        mixContrast={1}
        resolution={1024}
        mirror={0}
        depthScale={0.01}
        minDepthThreshold={0.9}
        maxDepthThreshold={1}
        depthToBlurRatioBias={0.25}
        debug={0}
        reflectorOffset={0.2}
      />
    </mesh>
  );
}