import { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Html } from "@react-three/drei";
import * as THREE from "three";
import { KubeModule, PILLAR_COLORS } from "./types";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface InnerKubeProps {
  module: KubeModule;
  position: [number, number, number];
}

export function InnerKube({ module, position }: InnerKubeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const baseColor = PILLAR_COLORS[module.pillar];

  const color = useMemo(() => new THREE.Color(baseColor), [baseColor]);
  const hoverColor = useMemo(() => new THREE.Color("#00ff88"), []);

  useFrame((_, delta) => {
    if (meshRef.current) {
      const mat = meshRef.current.material as THREE.MeshStandardMaterial;
      const target = hovered ? hoverColor : color;
      mat.emissive.lerp(target, delta * 6);
      mat.emissiveIntensity = THREE.MathUtils.lerp(
        mat.emissiveIntensity,
        hovered ? 1.8 : 0.4,
        delta * 6
      );
    }
    if (glowRef.current) {
      const s = hovered ? 1.35 : 1.0;
      glowRef.current.scale.lerp(new THREE.Vector3(s, s, s), delta * 6);
      const mat = glowRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = THREE.MathUtils.lerp(mat.opacity, hovered ? 0.15 : 0.03, delta * 6);
    }
  });

  return (
    <group position={position}>
      {/* Glow shell */}
      <mesh ref={glowRef}>
        <boxGeometry args={[0.52, 0.52, 0.52]} />
        <meshBasicMaterial color={baseColor} transparent opacity={0.03} />
      </mesh>

      {/* Main kube */}
      <mesh
        ref={meshRef}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = "pointer"; }}
        onPointerOut={() => { setHovered(false); document.body.style.cursor = "auto"; }}
      >
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshStandardMaterial
          color="#0a0f1c"
          emissive={color}
          emissiveIntensity={0.4}
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Wireframe overlay */}
      <mesh>
        <boxGeometry args={[0.41, 0.41, 0.41]} />
        <meshBasicMaterial color={baseColor} wireframe transparent opacity={hovered ? 0.6 : 0.2} />
      </mesh>

      {/* Label */}
      <Text
        position={[0, -0.35, 0]}
        fontSize={0.1}
        color={hovered ? "#00ff88" : baseColor}
        anchorX="center"
        anchorY="top"
        outlineWidth={0.003}
        outlineColor="#000000"
      >
        {module.label}
      </Text>

      {/* Tooltip on hover */}
      {hovered && (
        <Html
          position={[0.45, 0.3, 0]}
          center={false}
          distanceFactor={5}
          style={{ pointerEvents: "auto" }}
        >
          <div
            className="w-72 p-4 rounded-lg border border-white/10 shadow-2xl"
            style={{
              background: "rgba(10, 15, 28, 0.92)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
            onPointerOver={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 mb-1">
              <span
                className="text-xs font-black tracking-[0.15em] uppercase px-2 py-0.5 rounded"
                style={{ background: baseColor + "22", color: baseColor, fontFamily: "'Roboto Mono', monospace" }}
              >
                {module.label}
              </span>
            </div>
            <h4 className="text-sm font-bold text-white mt-2" style={{ fontFamily: "'Special Elite', serif" }}>
              {module.fullName}
            </h4>
            <p className="text-[10px] uppercase tracking-widest mt-1" style={{ color: baseColor }}>
              {module.pillar === "infra" ? "Infrastructure" : module.pillar === "detection" ? "Detection & Response" : "Intelligence"}
            </p>
            <p className="text-xs text-white/50 leading-relaxed mt-2">{module.desc}</p>
            <div className="flex gap-2 mt-3">
              <Link
                to={module.href}
                className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded text-white"
                style={{ background: baseColor }}
              >
                Explore Kube <ArrowRight size={10} />
              </Link>
              <Link
                to="/service-layer"
                className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded border"
                style={{ borderColor: baseColor + "60", color: baseColor }}
              >
                All Kubes
              </Link>
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}
