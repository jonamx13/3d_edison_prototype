import React, {useEffect} from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { Mesh } from "three";

export function Car() {
    const gltf = useLoader(
        GLTFLoader,
        process.env.PUBLIC_URL + "models/edison_proto/edison_proto.gltf"
    );

    // Position Car in space
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

    //Animation Controls
    useFrame((state, delta) => {
        let t = state.clock.getElapsedTime();

        // Rotate wheels
        let wheels = gltf.scene.children[3];
        wheels.children[7].rotation.z = t*2; // Back_Left
        wheels.children[8].rotation.z = t*2; // Back_Right
        wheels.children[9].rotation.z = t*2; // Front_Left
        wheels.children[10].rotation.z = t*2; // Front_Right

        // Animate headlights
        /* let headlights = gltf.scene.children[3];
        headlights.children[4].rotation.y = t*2; // Lightsbulbs */

        let turningLights = gltf.scene;
        turningLights.children[4].rotation.y = t * 2; // Left
        turningLights.children[5].rotation.y = t * 2; // Right

        // Doors
        let doors = gltf.scene; // Back_Left
        doors.children[0].rotation.y = t*2 // Front_Left
        doors.children[1].rotation.y = t*2; // Back_Left
        doors.children[6].rotation.y = t*2; // Front_Right
        doors.children[7].rotation.y = t*2; // Back_Right

        // HeadLights
        let headlight = gltf.scene;
        headlight.children[2].rotation.y = t*2

        

        
        
    });

    return <primitive object={gltf.scene}/>
}