/** DO NOT TOUCH - Automation network visualization for hero section */
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Node {
  id: string;
  x: number;
  y: number;
  label: string;
  type: "core" | "service" | "endpoint";
}

interface Connection {
  from: string;
  to: string;
}

const nodes: Node[] = [
  { id: "core", x: 50, y: 50, label: "ManageKube", type: "core" },
  { id: "assess", x: 20, y: 25, label: "Assess", type: "service" },
  { id: "remediate", x: 80, y: 20, label: "Remediate", type: "service" },
  { id: "manage", x: 85, y: 70, label: "Manage", type: "service" },
  { id: "optimize", x: 15, y: 75, label: "Optimize", type: "service" },
  { id: "dell", x: 35, y: 10, label: "Dell", type: "endpoint" },
  { id: "ibm", x: 65, y: 10, label: "IBM", type: "endpoint" },
  { id: "cloud", x: 95, y: 45, label: "Cloud", type: "endpoint" },
  { id: "siem", x: 90, y: 90, label: "SIEM", type: "endpoint" },
  { id: "soc", x: 50, y: 90, label: "SOC", type: "endpoint" },
  { id: "backup", x: 10, y: 50, label: "BCDR", type: "endpoint" },
];

const connections: Connection[] = [
  { from: "core", to: "assess" },
  { from: "core", to: "remediate" },
  { from: "core", to: "manage" },
  { from: "core", to: "optimize" },
  { from: "assess", to: "dell" },
  { from: "assess", to: "ibm" },
  { from: "remediate", to: "dell" },
  { from: "remediate", to: "ibm" },
  { from: "manage", to: "cloud" },
  { from: "manage", to: "siem" },
  { from: "manage", to: "soc" },
  { from: "optimize", to: "backup" },
  { from: "optimize", to: "cloud" },
];

export const AutomationNetwork = () => {
  const [activeConnection, setActiveConnection] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveConnection((prev) => (prev + 1) % connections.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const getNodeById = (id: string) => nodes.find((n) => n.id === id);

  return (
    <div className="relative w-full h-full min-h-[400px] lg:min-h-[500px]">
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Connections */}
        {connections.map((conn, index) => {
          const from = getNodeById(conn.from);
          const to = getNodeById(conn.to);
          if (!from || !to) return null;

          const isActive = index === activeConnection;

          return (
            <g key={`${conn.from}-${conn.to}`}>
              <motion.line
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke={isActive ? "hsl(24, 95%, 50%)" : "hsl(0, 0%, 40%)"}
                strokeWidth={isActive ? 0.5 : 0.2}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: index * 0.1 }}
              />
              {isActive && (
                <motion.circle
                  r="1"
                  fill="hsl(24, 95%, 50%)"
                  initial={{ cx: from.x, cy: from.y }}
                  animate={{ cx: to.x, cy: to.y }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                />
              )}
            </g>
          );
        })}

        {/* Nodes */}
        {nodes.map((node, index) => (
          <motion.g
            key={node.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 + index * 0.08 }}
          >
            {/* Outer glow for core */}
            {node.type === "core" && (
              <motion.circle
                cx={node.x}
                cy={node.y}
                r="8"
                fill="none"
                stroke="hsl(24, 95%, 50%)"
                strokeWidth="0.3"
                animate={{ r: [8, 10, 8], opacity: [0.5, 0.2, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
            
            {/* Node circle */}
            <circle
              cx={node.x}
              cy={node.y}
              r={node.type === "core" ? 6 : node.type === "service" ? 4 : 2.5}
              fill={
                node.type === "core"
                  ? "hsl(24, 95%, 50%)"
                  : node.type === "service"
                  ? "hsl(0, 0%, 20%)"
                  : "hsl(0, 0%, 30%)"
              }
              stroke={
                node.type === "core"
                  ? "hsl(24, 95%, 60%)"
                  : "hsl(0, 0%, 50%)"
              }
              strokeWidth={node.type === "core" ? 0.5 : 0.3}
            />

            {/* Label */}
            <text
              x={node.x}
              y={node.y + (node.type === "core" ? 10 : node.type === "service" ? 7 : 5)}
              textAnchor="middle"
              fill="hsl(0, 0%, 70%)"
              fontSize={node.type === "core" ? 3 : 2}
              fontFamily="monospace"
            >
              {node.label}
            </text>
          </motion.g>
        ))}
      </svg>

      {/* Floating data particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-brand-orange rounded-full opacity-60"
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: "100%",
              opacity: 0 
            }}
            animate={{ 
              y: "-10%",
              opacity: [0, 0.6, 0]
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              delay: i * 0.8,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>
    </div>
  );
};
/** END DO NOT TOUCH */
