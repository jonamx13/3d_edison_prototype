import React, { useEffect, useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { Color, Mesh, SpotLight } from "three";

export function Car({ wheelRotationSpeed, directionalLights, headLightsON, headlightsBeamHIGH, turningMove }) {
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

    //Animation Controlers
    useFrame((state) => {
        let t = state.clock.getElapsedTime();

        
        // Rotate wheels
        const wheels = gltf.scene.children[3];
        const wheelMap = new Map([
            ['Back_Left', 6],
            ['Back_Right', 7],
            ['Front_Left', 8],
            ['Front_Right', 9]
        ]);

        for (const index of wheelMap.values()) {
            wheels.children[index].rotation.z = t * -wheelRotationSpeed;
        }
        
        wheels.children[8].rotation.y = turningMove;
        wheels.children[9].rotation.y = turningMove;

        // Turning Lights
        
        let leftDirectionalLight = gltf.scene.children[4];
        let rightDirectionalLight = gltf.scene.children[5];
        const turnedOFF = 0;
        const blinking = Math.sin (t*12) * (0.5 * 5) + (0.5 * 5);
        
        switch(directionalLights) {
            case 'blinker':
                leftDirectionalLight.material.emissiveIntensity = blinking;
                rightDirectionalLight.material.emissiveIntensity = blinking;
                break;
            case 'left':
                leftDirectionalLight.material.emissiveIntensity = blinking;
                rightDirectionalLight.material.emissiveIntensity = turnedOFF;
                break;
            case 'right':
                leftDirectionalLight.material.emissiveIntensity = turnedOFF;
                rightDirectionalLight.material.emissiveIntensity = blinking;
                break;
            default:
                leftDirectionalLight.material.emissiveIntensity = turnedOFF;
                rightDirectionalLight.material.emissiveIntensity= turnedOFF;
        }
        
        // Doors
        let doors = gltf.scene;
        doors.children[0].rotation.y = -0.5; // Front_Left
        doors.children[1].rotation.y = -0.5; // Back_Left
        doors.children[6].rotation.y = 0.5; // Front_Right
        doors.children[7].rotation.y = 0.5; // Back_Right
        
        // Headlights
        let headlightBeam = gltf.scene.children[2];
        const beamIntesity = {
            'OFF' : 0,
            'Low' : 1,
            'High' : 5
        }

        if(headLightsON && headlightsBeamHIGH) {
            headlightBeam.material.emissiveIntensity = beamIntesity['High']
        } else if (headLightsON) {
            headlightBeam.material.emissiveIntensity = beamIntesity['Low'];
        } else {
            headlightBeam.material.emissiveIntensity = beamIntesity['OFF'];
        }
        
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