import React, {useEffect, useRef} from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { Color, Mesh, Vector3, Euler } from "three";
import VolumetricLight from "./CustomShaders/VolumetricLight";

export function Car() {
    const gltf = useLoader(
        GLTFLoader,
        process.env.PUBLIC_URL + "models/edison_proto/edison_proto.gltf"
    );

    // Refs for headlights to add SpotLights
    const leftHeadlightRef = useRef();
    const rightHeadlightRef = useRef();

    // Position Car in space
    useEffect(() => {
        gltf.scene.scale.set(0.5, 0.5, 0.5);
        gltf.scene.position.set(0, 0.22, 0);
        gltf.scene.rotation.set(0, -1.5, 0);
        gltf.scene.traverse((object) => {
            if (object instanceof Mesh) {
                object.castShadow = true;
                object.receiveShadow = true;
                object.material.envMapIntensity = 20;

                // Set emissive color for headlight bulbs to white
                if (object.name.includes("HeadLights_Up")) { // Adjust the name as per your model
                    object.material.emissive = new Color(0xffffff); // White color for emissive
                }
            }
        });
    }, [gltf]);

    //Animation Controls
    useFrame((state, delta) => {
        let t = state.clock.getElapsedTime();

        
        // Rotate wheels
        let wheels = gltf.scene.children[3];
        wheels.children[6].rotation.z = t*-2; // Back_Left
        wheels.children[7].rotation.z = t*-2; // Back_Right
        wheels.children[8].rotation.z = t*-2; // Front_Left
        wheels.children[9].rotation.z = t*-2; // Front_Right
        

        /* let turningLights = gltf.scene;
        turningLights.children[4].rotation.y = t * 2; // Left
        turningLights.children[5].rotation.y = t * 2; // Right */
        

        /* // Doors
        let doors = gltf.scene; // Back_Left
        doors.children[0].rotation.y = t*2 // Front_Left
        doors.children[1].rotation.y = t*2; // Back_Left
        doors.children[6].rotation.y = t*2; // Front_Right
        doors.children[7].rotation.y = t*2; // Back_Right */
        
        // HeadLights
        let headlight = gltf.scene;
        headlight.children[2].material.emissiveIntensity = Math.sin(t * 2) * 0.5 + 0.5;
        
    });

    const leftHeadlightPosition = new Vector3(0.42, 0.39, 2.0); // Adjust these values
    const rightHeadlightPosition = new Vector3(-0.36, 0.39, 2.0); // Adjust these values

    const headlightRotation = new Euler(-Math.PI / 2, 0, 0);

    return (
        <group>
            <primitive object={gltf.scene} />
            <spotLight
                ref={leftHeadlightRef}
                position={[1, 1, 1]} // Adjust to the actual headlight position
                angle={0.3}
                intensity={5}
                distance={10}
                castShadow
            />
            <spotLight
                ref={rightHeadlightRef}
                position={[-1, 1, 1]} // Adjust to the actual headlight position
                angle={0.3}
                intensity={5}
                distance={10}
                castShadow
            />
             <VolumetricLight
             position={leftHeadlightPosition}
             rotation={headlightRotation} 
             intensity={1}
             />
             <VolumetricLight
             position={rightHeadlightPosition}
             rotation={headlightRotation}
             intensity={1}
             />
        </group>
    );
}