import React, { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const MAX_DROPS = 3000;

export function Rain({ intensity = 0 }) {
  const ref = useRef();

  const active = Math.floor(MAX_DROPS * Math.min(1, intensity / 10));

  const positions = useMemo(() => {
    const arr = new Float32Array(MAX_DROPS * 3);
    for (let i = 0; i < MAX_DROPS; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 60;
      arr[i * 3 + 1] = Math.random() * 30;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 60;
    }
    return arr;
  }, []);

  const speeds = useMemo(() => {
    const v = new Float32Array(MAX_DROPS);
    for (let i = 0; i < MAX_DROPS; i++) v[i] = 14 + Math.random() * 10;
    return v;
  }, []);

  // Show only the first `active` drops
  useEffect(() => {
    if (ref.current) ref.current.geometry.setDrawRange(0, active);
  }, [active]);

  useFrame((_, delta) => {
    if (!ref.current || active === 0) return;
    const pos = ref.current.geometry.attributes.position.array;
    for (let i = 0; i < active; i++) {
      pos[i * 3 + 1] -= speeds[i] * delta;
      if (pos[i * 3 + 1] < 0) {
        pos[i * 3]     = (Math.random() - 0.5) * 60;
        pos[i * 3 + 1] = 30;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 60;
      }
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  if (active === 0) return null;

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={MAX_DROPS}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#a8c4d8"
        size={0.08}
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}