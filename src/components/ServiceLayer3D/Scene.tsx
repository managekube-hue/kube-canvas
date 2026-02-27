import { useMemo, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { OuterCube } from "./OuterCube";
import { CenterKube } from "./CenterKube";
import { InnerKube } from "./InnerKube";
import { ConnectionLines } from "./ConnectionLines";
import { MODULES } from "./types";

function computePositions(): [number, number, number][] {
  const positions: [number, number, number][] = [];
  // 5 layers × 4 corners = 20 kubes
  const layers = [-2, -1, 0, 1, 2];
  const corners: [number, number][] = [
    [-1.6, -1.6],
    [1.6, -1.6],
    [-1.6, 1.6],
    [1.6, 1.6],
  ];

  for (const y of layers) {
    for (const [x, z] of corners) {
      positions.push([x, y, z]);
    }
  }
  return positions;
}

function SceneContent() {
  const positions = useMemo(() => computePositions(), []);

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.15} />
      <directionalLight position={[5, 5, 5]} intensity={0.3} color="#ffffff" />
      <pointLight position={[0, 3, 0]} intensity={0.5} color="#22d3ee" distance={10} />
      <pointLight position={[0, -3, 0]} intensity={0.3} color="#f97316" distance={8} />

      {/* Outer glass cube */}
      <OuterCube />

      {/* Center managekube block */}
      <CenterKube />

      {/* 20 inner kubes */}
      {MODULES.map((mod, i) => (
        <InnerKube key={mod.id} module={mod} position={positions[i]} />
      ))}

      {/* Connection lines */}
      <ConnectionLines positions={positions} />

      {/* Orbital controls */}
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={5}
        maxDistance={12}
        autoRotate
        autoRotateSpeed={0.3}
        dampingFactor={0.05}
        enableDamping
      />
    </>
  );
}

export function ServiceLayerScene() {
  return (
    <div className="w-full h-[700px] lg:h-[800px] relative">
      <Canvas
        camera={{ position: [6, 3, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>
    </div>
  );
}
