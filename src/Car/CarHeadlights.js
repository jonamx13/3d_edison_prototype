import React, { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Vector3, Matrix4 } from 'three';

// ---------- Tunables ----------
const SWEEP_MULTIPLIER   = 0.6;   // steering * this = sweep radians (±17° at full lock)
const LIGHT_HEIGHT       = 0.55;  // how high above the wheels the lights sit
const LIGHT_FORWARD_OFF  = 0.4;   // how far in front of the wheels they sit
const TARGET_DISTANCE    = 18;    // where they're aiming (metres ahead)
// -------------------------------

export function CarHeadlights({ isOn, isHigh, steering, carGltf }) {
  const leftLightRef   = useRef();
  const rightLightRef  = useRef();
  const leftTargetRef  = useRef();
  const rightTargetRef = useRef();

  // Wire target objects once — three.js spotLights need an Object3D as target
  useEffect(() => {
    if (leftLightRef.current  && leftTargetRef.current)
      leftLightRef.current.target  = leftTargetRef.current;
    if (rightLightRef.current && rightTargetRef.current)
      rightLightRef.current.target = rightTargetRef.current;
  }, []);

  // Reused scratch objects — no per-frame allocations
  const scratch = useRef({
    fl: new Vector3(),
    fr: new Vector3(),
    bl: new Vector3(),
    forward: new Vector3(),
    up: new Vector3(0, 1, 0),
    sweepMatrix: new Matrix4(),
    tmp: new Vector3(),
  }).current;

  useFrame(() => {
    if (!carGltf || !carGltf.scene) return;
    if (!leftLightRef.current || !rightLightRef.current) return;
    if (!leftTargetRef.current || !rightTargetRef.current) return;

    const wheels = carGltf.scene.children[3];
    if (!wheels || !wheels.children[6] || !wheels.children[8] || !wheels.children[9]) return;

    // World positions of the wheels (indices match your existing wheelMap)
    wheels.children[8].getWorldPosition(scratch.fl); // Front_Left
    wheels.children[9].getWorldPosition(scratch.fr); // Front_Right
    wheels.children[6].getWorldPosition(scratch.bl); // Back_Left

    // Forward = front-left - back-left, flattened to XZ
    scratch.forward.copy(scratch.fl).sub(scratch.bl).setY(0).normalize();

    // Sweep with steering
    scratch.sweepMatrix.makeRotationAxis(scratch.up, steering * SWEEP_MULTIPLIER);
    scratch.forward.applyMatrix4(scratch.sweepMatrix);

    // Offset to lift lights in front of the front wheels
    scratch.tmp.copy(scratch.forward).multiplyScalar(LIGHT_FORWARD_OFF);
    scratch.tmp.y += LIGHT_HEIGHT;

    // Place the lights
    leftLightRef.current.position.copy(scratch.fl).add(scratch.tmp);
    rightLightRef.current.position.copy(scratch.fr).add(scratch.tmp);

    // Aim their targets far ahead
    leftTargetRef.current.position
      .copy(leftLightRef.current.position)
      .add(scratch.tmp.copy(scratch.forward).multiplyScalar(TARGET_DISTANCE));
    rightTargetRef.current.position
      .copy(rightLightRef.current.position)
      .add(scratch.tmp.copy(scratch.forward).multiplyScalar(TARGET_DISTANCE));
  });

  // Light parameters — HIGH beam is wider, brighter, longer
  const intensity = isOn ? (isHigh ? 500 : 180) : 0;
  const angle     = isHigh ? 0.55 : 0.38;
  const distance  = isHigh ? 45   : 25;
  const penumbra  = isHigh ? 0.25 : 0.55;

  return (
    <>
      <spotLight
        ref={leftLightRef}
        visible={isOn}
        color="#fff4d6"
        intensity={intensity}
        angle={angle}
        distance={distance}
        penumbra={penumbra}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0005}
      />
      <spotLight
        ref={rightLightRef}
        visible={isOn}
        color="#fff4d6"
        intensity={intensity}
        angle={angle}
        distance={distance}
        penumbra={penumbra}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0005}
      />
      <object3D ref={leftTargetRef} />
      <object3D ref={rightTargetRef} />
    </>
  );
}