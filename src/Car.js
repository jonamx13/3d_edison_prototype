import React, { useEffect, useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { Color, Mesh, SpotLight } from "three";

export function Car({ wheelRotationSpeed }) {
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
                // Set emissive color for headlight bulbs to white
                if (object.name.includes("Directional_Light_Right")) { // Adjust the name as per your model
                    object.material.emissive = new Color(0xFF0000); // White color for emissive
                }
            }
        });
    }, [gltf]);

    //Animation Controls
    useFrame((state) => {
        let t = state.clock.getElapsedTime();

        
        // Rotate wheels
        let wheels = gltf.scene.children[3];
        const wheelMap = new Map([
            ['Back_Left', 6],
            ['Back_Right', 7],
            ['Front_Left', 8],
            ['Front_Right', 9]
        ]);

        for (const index of wheelMap.values()) {
            wheels.children[index].rotation.z = t * -wheelRotationSpeed;
        }
        

        // Turning Lights
        let turningLights = gltf.scene;
        turningLights.children[4].material.emissiveIntensity = Math.sin(t * 2) * 0.5 + 0.5; // Left
        turningLights.children[5].material.emissiveIntensity = Math.sin(t * 2) * 0.5 + 0.5; // Right
        

        // Doors
        let doors = gltf.scene;
        doors.children[0].rotation.y = -0.5; // Front_Left
        doors.children[1].rotation.y = -0.5; // Back_Left
        doors.children[6].rotation.y = 0.5; // Front_Right
        doors.children[7].rotation.y = 0.5; // Back_Right
        
        // Headlights
        let headlight = gltf.scene;
        headlight.children[2].material.emissiveIntensity = Math.sin(t * 2) * 0.5 + 0.5;
        
    });


    return (
        <group>
            <primitive object={gltf.scene} />

            <spotLight
                ref={leftHeadlightRef}
                position={[1, 1, 1]}
                angle={0.3}
                intensity={5}
                distance={10}
                castShadow
            />
            <spotLight
                ref={rightHeadlightRef}
                position={[-1, 1, 1]}
                angle={0.3}
                intensity={5}
                distance={10}
                castShadow
            />

        </group>
    );
}