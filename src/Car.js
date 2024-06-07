import React, {useEffect} from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { Mesh } from "three";

export function Car() {
    const gltf = useLoader(
        GLTFLoader,
        process.env.PUBLIC_URL + "models/edison_proto/edison_proto.gltf"
    );

    useEffect(() => {
        gltf.scene.scale.set(0.5, 0.5, 0.5);
        gltf.scene.position.set(0, .22, 0);
        gltf.scene.rotation.set(0, -1.5, 0);
        gltf.scene.traverse((object) => {
            if (object instanceof Mesh) {
                object.castShadow = true;
                object.receiveShadow = true;
                object.material.envMapIntensity = 20;
            }
        });
    });

    useFrame((state, delta) => {
        let t = state.clock.getElapsedTime();

        let wheels = gltf.scene.children[3];
        wheels.children[7].rotation.z = t*2; // Back_Left
        wheels.children[8].rotation.z = t*2; // Back_Right
        wheels.children[9].rotation.z = t*2; // Front_Left
        wheels.children[10].rotation.z = t*2; // Front_Right
        
    });

    return <primitive object={gltf.scene}/>
}