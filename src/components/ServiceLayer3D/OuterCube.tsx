import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function OuterCube() {
  const wireRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (wireRef.current) {
      wireRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      wireRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.015) * 0.03;
    }
  });

  return (
    <group>
      {/* Primary wireframe */}
      <mesh ref={wireRef}>
        <boxGeometry args={[5.5, 5.5, 5.5]} />
        <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.06} />
      </mesh>

      {/* Edge highlight — slightly larger */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(5.52, 5.52, 5.52)]} />
        <lineBasicMaterial color="#22d3ee" transparent opacity={0.15} />
      </lineSegments>

      {/* Inner ambient glow shell */}
      <mesh>
        <boxGeometry args={[5.4, 5.4, 5.4]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.008} side={THREE.BackSide} />
      </mesh>
    </group>
  );
}
