import { useFrame, useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import { RepeatWrapping, TextureLoader } from "three";

export function GroundGrid({speed}){
    const diffuse = useLoader(TextureLoader, process.env.PUBLIC_URL + "textures/grid-texture.png");

    useEffect(() => {
        diffuse.wrapS = RepeatWrapping;
        diffuse.wrapT = RepeatWrapping;
        diffuse.anisotropy = 4;
        diffuse.repeat.set(150, 150);
        diffuse.offset.set(0, 0);
    }, [diffuse]);

    useFrame((state, delta) => {
        let t = -state.clock.getElapsedTime() * (speed * 0.68);
        diffuse.offset.set(0, t);
    });

    return <>
        <mesh rotation-x={-Math.PI * 0.5} position={[0, 0.025, 0]}>
            <planeGeometry args={[35, 35]}/>
            <meshBasicMaterial
            color={[1, 1, 1]}
            opacity={0.8}
            map={diffuse}
            alphaMap={diffuse}
            transparent={true}
            bloom
            />
        </mesh>
    </>
}