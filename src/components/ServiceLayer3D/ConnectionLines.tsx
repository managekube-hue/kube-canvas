import { useMemo } from "react";
import { Line } from "@react-three/drei";
import * as THREE from "three";

interface ConnectionLinesProps {
  positions: [number, number, number][];
}

export function ConnectionLines({ positions }: ConnectionLinesProps) {
  const connections = useMemo(() => {
    const lines: { start: THREE.Vector3; end: THREE.Vector3 }[] = [];

    // Connect each kube to 2-3 nearby kubes
    for (let i = 0; i < positions.length; i++) {
      const distances: { index: number; dist: number }[] = [];
      for (let j = 0; j < positions.length; j++) {
        if (i === j) continue;
        const a = new THREE.Vector3(...positions[i]);
        const b = new THREE.Vector3(...positions[j]);
        distances.push({ index: j, dist: a.distanceTo(b) });
      }
      distances.sort((a, b) => a.dist - b.dist);
      // Connect to 2 nearest
      for (let k = 0; k < Math.min(2, distances.length); k++) {
        const j = distances[k].index;
        // Avoid duplicate lines
        if (j > i) {
          lines.push({
            start: new THREE.Vector3(...positions[i]),
            end: new THREE.Vector3(...positions[j]),
          });
        }
      }
    }
    return lines;
  }, [positions]);

  return (
    <group>
      {connections.map((line, i) => (
        <Line
          key={i}
          points={[line.start, line.end]}
          color="#22d3ee"
          lineWidth={0.5}
          transparent
          opacity={0.08}
        />
      ))}
    </group>
  );
}
