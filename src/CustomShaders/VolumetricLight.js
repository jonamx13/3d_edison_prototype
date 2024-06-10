import React, { useEffect, useMemo } from "react";
import * as THREE from "three";
import { extend, useThree, useFrame } from "@react-three/fiber";
import CustomShaders from './CustomShaders.glsl'

// Extend the namespace to include ShaderMaterial
extend({ ShaderMaterial: THREE.ShaderMaterial });

// Split shader code into vertex and fragment shaders
const [vertexShader, fragmentShader] = CustomShaders.split("// Fragment shader");

/**
 * VolumetricLightMaterial component represents the shader material used for volumetric light effect.
 * It creates a material with vertex and fragment shaders.
 */
const VolumetricLightMaterial = () => {
  const { viewport } = useThree();

  // Create material with vertex and fragment shaders
  const material = useMemo(() => {
    const uniforms = {
      lightPosition: { value: new THREE.Vector3() },
      viewportSize: { value: new THREE.Vector2(viewport.width, viewport.height) },
      time: { value: 0 },
    };

    return new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
    });
  }, [viewport]);

  // Update material on viewport or time change
  useEffect(() => {
    material.needsUpdate = true;
  }, [material]);

  // Update time uniform in material every frame
  useFrame(({ clock }) => {
    material.uniforms.time.value = clock.elapsedTime;
  });

  return material;
};

/**
 * VolumetricLight component renders a volumetric light effect at the specified position.
 * It utilizes VolumetricLightMaterial for the shader effect.
 * @param {Object} props - Component props
 * @param {THREE.Vector3} props.position - The position of the volumetric light
 * @returns {null} - Returns null as the volumetric light is rendered to a fullscreen quad
 */
const VolumetricLight = ({ position }) => {
  const material = VolumetricLightMaterial();

  // Update light position in material when position prop changes
  useEffect(() => {
    material.uniforms.lightPosition.value = position;
  }, [material, position]);

  return null; // Volumetric light is rendered to a fullscreen quad, so no visible component needed
};

export default VolumetricLight;
