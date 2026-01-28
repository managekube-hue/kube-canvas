/** DO NOT TOUCH - Automation animation for hero section */
import { motion } from "framer-motion";
import { 
  Server, 
  Shield, 
  Cloud, 
  Database, 
  Cpu, 
  Network,
  Lock,
  Zap
} from "lucide-react";

const nodes = [
  { icon: Server, label: "Infrastructure", x: 50, y: 20 },
  { icon: Shield, label: "Security", x: 85, y: 35 },
  { icon: Cloud, label: "Cloud", x: 75, y: 65 },
  { icon: Database, label: "Data", x: 30, y: 75 },
  { icon: Cpu, label: "Compute", x: 15, y: 45 },
  { icon: Lock, label: "Compliance", x: 55, y: 50 },
  { icon: Network, label: "Network", x: 40, y: 30 },
  { icon: Zap, label: "Automation", x: 60, y: 80 },
];

const connections = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 0],
  [5, 0], [5, 1], [5, 2], [5, 3], [5, 4],
  [6, 0], [6, 5], [7, 2], [7, 3],
];

export const AutomationAnimation = () => {
  return (
    <div className="relative w-full h-full min-h-[400px]">
      {/* Animated connection lines */}
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
        {connections.map(([from, to], idx) => (
          <motion.line
            key={idx}
            x1={`${nodes[from].x}%`}
            y1={`${nodes[from].y}%`}
            x2={`${nodes[to].x}%`}
            y2={`${nodes[to].y}%`}
            stroke="hsl(var(--primary))"
            strokeWidth="1"
            strokeOpacity="0.3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 2,
              delay: idx * 0.1,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
        
        {/* Animated pulse along connections */}
        {connections.slice(0, 5).map(([from, to], idx) => (
          <motion.circle
            key={`pulse-${idx}`}
            r="3"
            fill="hsl(var(--primary))"
            initial={{
              cx: `${nodes[from].x}%`,
              cy: `${nodes[from].y}%`,
            }}
            animate={{
              cx: [`${nodes[from].x}%`, `${nodes[to].x}%`],
              cy: [`${nodes[from].y}%`, `${nodes[to].y}%`],
            }}
            transition={{
              duration: 3,
              delay: idx * 0.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>

      {/* Nodes */}
      {nodes.map((node, idx) => {
        const Icon = node.icon;
        const isCenter = idx === 5;
        
        return (
          <motion.div
            key={idx}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${node.x}%`, top: `${node.y}%`, zIndex: 1 }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5 + idx * 0.1, duration: 0.5 }}
          >
            <motion.div
              className={`
                flex items-center justify-center rounded-lg backdrop-blur-sm
                ${isCenter 
                  ? "w-16 h-16 bg-primary/20 border-2 border-primary" 
                  : "w-12 h-12 bg-white/10 border border-white/20"
                }
              `}
              animate={{
                boxShadow: isCenter
                  ? [
                      "0 0 20px hsl(var(--primary) / 0.3)",
                      "0 0 40px hsl(var(--primary) / 0.5)",
                      "0 0 20px hsl(var(--primary) / 0.3)",
                    ]
                  : undefined,
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Icon 
                className={`${isCenter ? "w-8 h-8" : "w-5 h-5"} text-white`} 
                strokeWidth={1.5} 
              />
            </motion.div>
            <motion.span
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-white/60 whitespace-nowrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 + idx * 0.1 }}
            >
              {node.label}
            </motion.span>
          </motion.div>
        );
      })}

      {/* Central glow effect */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(var(--primary) / 0.2) 0%, transparent 70%)",
          zIndex: 0,
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};
