import { useFrame, useLoader } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { RepeatWrapping, TextureLoader } from "three";

export function GroundGrid({ speed, scrollAngleRef }) {
  const diffuse = useLoader(
    TextureLoader,
    process.env.PUBLIC_URL + "textures/grid-texture.png"
  );

  const smoothSpeed = useRef(0);

  useEffect(() => {
    diffuse.wrapS = RepeatWrapping;
    diffuse.wrapT = RepeatWrapping;
    diffuse.anisotropy = 4;
    diffuse.repeat.set(150, 150);
    diffuse.offset.set(0, 0);
  }, [diffuse]);

  useFrame((_, delta) => {
    smoothSpeed.current +=
      (speed - smoothSpeed.current) * Math.min(1, delta * 3);

    const dist  = smoothSpeed.current * 0.68 * delta;
    const angle = scrollAngleRef?.current ?? 0;

    diffuse.offset.x += Math.sin(angle) * dist;
    diffuse.offset.y -= Math.cos(angle) * dist;
  });

  return (
    <mesh rotation-x={-Math.PI * 0.5} position={[0, 0.025, 0]}>
      <planeGeometry args={[35, 35]} />
      <meshBasicMaterial
        color={[1, 1, 1]}
        opacity={0.8}
        map={diffuse}
        alphaMap={diffuse}
        transparent
        bloom
      />
    </mesh>
  );
}