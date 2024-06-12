import React, { useEffect, useRef, useState } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { Color, Mesh } from "three";

export function Car({
    wheelRotationSpeed,
    turningMove,
    headLightsON,
    headlightsBeamHIGH,
    directionalLights,
    openedDoors
}) {
    const gltf = useLoader(
        GLTFLoader,
        process.env.PUBLIC_URL + "models/edison_proto/edison_proto.gltf"
    );

    // Refs for headlights to add SpotLights
    const leftHeadlightRef = useRef();
    const rightHeadlightRef = useRef();

    // Hook for the initial state of the Doors
    const [initialDoorsState, setInitialDoorsState] = useState({
        Front_Left: -0.5,
        Front_Right: 0.5,
        Back_Left: -0.5,
        Back_Right: 0.5,
    });

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

        // Store initial doors state
        setInitialDoorsState({
            Front_Left: gltf.scene.children[0].rotation.y,
            Front_Right: gltf.scene.children[6].rotation.y,
            Back_Left: gltf.scene.children[1].rotation.y,
            Back_Right: gltf.scene.children[7].rotation.y,
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
        const turnedOFFDirectional = 0;
        const turnedONDirectional = 5;
        const blinking = Math.sin (t*12) * (0.5 * 5) + (0.5 * 5);
        
        switch(directionalLights) {
            case 'blinker':
                leftDirectionalLight.material.emissiveIntensity = blinking;
                rightDirectionalLight.material.emissiveIntensity = blinking;
                break;
            case 'left':
                leftDirectionalLight.material.emissiveIntensity = turnedONDirectional;
                rightDirectionalLight.material.emissiveIntensity = turnedOFFDirectional;
                break;
            case 'right':
                leftDirectionalLight.material.emissiveIntensity = turnedOFFDirectional;
                rightDirectionalLight.material.emissiveIntensity = turnedONDirectional;
                break;
            default:
                leftDirectionalLight.material.emissiveIntensity = turnedOFFDirectional;
                rightDirectionalLight.material.emissiveIntensity= turnedOFFDirectional;
        }
        
        // Doors animation
        for (const [doorName, rotationValue] of Object.entries(openedDoors)) {
            const doorIndexMap = new Map([
                ['Front_Left', 0],
                ['Back_Left', 1],
                ['Front_Right', 6],
                ['Back_Right', 7],
            ]);
            const doorIndex = doorIndexMap.get(doorName);

            if (doorIndex !== undefined) {
                // If the door is opened (true), animate it
                if (rotationValue) {
                    // Check if it's a LEFT or RIGHT door and set rotation accordingly
                    const rotation = doorName.includes('Right') ? 0.5 : -0.5;
                    gltf.scene.children[doorIndex].rotation.y = rotation;
                } else {
                    // Otherwise, set it to the initial state
                    gltf.scene.children[doorIndex].rotation.y = initialDoorsState[doorName];
                }
            }
        }
        
        // Headlights
        let headlightBeam = gltf.scene.children[2];
        const beamIntesity = {
            'OFF' : 0,
            'Low' : 1,
            'High' : 5
        }

        // Setup for default values for headlights
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
            <primitive object={gltf.scene}/>

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