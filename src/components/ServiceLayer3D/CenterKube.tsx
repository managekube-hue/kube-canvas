import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

export function CenterKube() {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
    if (glowRef.current) {
      glowRef.current.intensity = 1.5 + Math.sin(state.clock.elapsedTime * 2) * 0.5;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <pointLight ref={glowRef} color="#22d3ee" intensity={1.5} distance={4} />

      <mesh ref={meshRef}>
        <boxGeometry args={[0.7, 0.7, 0.7]} />
        <meshStandardMaterial
          color="#0a0f1c"
          emissive="#22d3ee"
          emissiveIntensity={0.8}
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={0.95}
        />
      </mesh>

      {/* Wireframe */}
      <mesh ref={meshRef}>
        <boxGeometry args={[0.72, 0.72, 0.72]} />
        <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.4} />
      </mesh>

      {/* Brand text */}
      <Text
        position={[0, -0.6, 0]}
        fontSize={0.14}
        color="#22d3ee"
        anchorX="center"
        anchorY="top"
        outlineWidth={0.004}
        outlineColor="#000000"
      >
        MANAGEKUBE
      </Text>
    </group>
  );
}
