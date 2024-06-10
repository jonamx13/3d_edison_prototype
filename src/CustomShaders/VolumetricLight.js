import React, { useMemo, useEffect } from "react";
import * as THREE from "three";
import { extend } from "@react-three/fiber";

extend({ ConeGeometry: THREE.ConeGeometry });

const VolumetricLightMaterial = () => {
  return new THREE.ShaderMaterial({
    uniforms: {
      lightPosition: { value: new THREE.Vector3() },
      color: { value: new THREE.Color(0xffffff) },
      intensity: { value: 1.0 },
      decay: { value: 0 },
      opacity: { value: 1 }, // Add opacity uniform
    },
    vertexShader: `
      varying vec3 vWorldPosition;
      void main() {
        vec4 worldPosition = modelMatrix * vec4(position, 1.0);
        vWorldPosition = worldPosition.xyz;
        gl_Position = projectionMatrix * viewMatrix * worldPosition;
      }
    `,
    fragmentShader: `
      uniform vec3 lightPosition;
      uniform vec3 color;
      uniform float intensity;
      uniform float decay;
      uniform float opacity; // Add opacity uniform
      varying vec3 vWorldPosition;
      void main() {
        float distance = length(lightPosition - vWorldPosition);
        float attenuation = pow(1.0 / (distance * distance), decay);
        gl_FragColor = vec4(color * intensity * attenuation, opacity);
      }
    `,
    transparent: true,
    depthWrite: false,
  });
};

const VolumetricLight = ({ position, rotation, intensity}) => {
  const material = useMemo(() => VolumetricLightMaterial(), []);

  useEffect(() => {
    material.uniforms.lightPosition.value = position;
  }, [material, position]);

  useEffect(() => {
    material.uniforms.opacity.value = intensity;
  }, [material, intensity]);

  return (
    <mesh position={position} rotation={rotation} material={material}>
      <coneGeometry args={[0.5, 5, 32, 1, true]} />
    </mesh>
  );
};

export default VolumetricLight;