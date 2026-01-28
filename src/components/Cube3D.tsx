/** DO NOT TOUCH - 3D Cube visual component for Kube section */
import { motion } from "framer-motion";

interface Cube3DProps {
  color?: string;
  size?: number;
  delay?: number;
  className?: string;
}

export const Cube3D = ({ color = "primary", size = 80, delay = 0, className = "" }: Cube3DProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, rotateY: -30, rotateX: 15 }}
      animate={{ opacity: 1, rotateY: 0, rotateX: 0 }}
      transition={{ duration: 0.8, delay }}
      className={`relative ${className}`}
      style={{
        width: size,
        height: size,
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
    >
      <motion.div
        animate={{
          rotateY: [0, 360],
          rotateX: [0, 15, 0, -15, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front face */}
        <div
          className="absolute inset-0 border-2 border-primary/30 bg-gradient-to-br from-primary/20 to-primary/5 backdrop-blur-sm"
          style={{
            transform: `translateZ(${size / 2}px)`,
          }}
        />
        {/* Back face */}
        <div
          className="absolute inset-0 border-2 border-primary/20 bg-primary/10"
          style={{
            transform: `rotateY(180deg) translateZ(${size / 2}px)`,
          }}
        />
        {/* Left face */}
        <div
          className="absolute inset-0 border-2 border-primary/25 bg-gradient-to-r from-primary/15 to-transparent"
          style={{
            transform: `rotateY(-90deg) translateZ(${size / 2}px)`,
          }}
        />
        {/* Right face */}
        <div
          className="absolute inset-0 border-2 border-primary/25 bg-gradient-to-l from-primary/15 to-transparent"
          style={{
            transform: `rotateY(90deg) translateZ(${size / 2}px)`,
          }}
        />
        {/* Top face */}
        <div
          className="absolute inset-0 border-2 border-primary/30 bg-gradient-to-b from-primary/25 to-primary/10"
          style={{
            transform: `rotateX(90deg) translateZ(${size / 2}px)`,
          }}
        />
        {/* Bottom face */}
        <div
          className="absolute inset-0 border-2 border-primary/15 bg-primary/5"
          style={{
            transform: `rotateX(-90deg) translateZ(${size / 2}px)`,
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export const FloatingCubes = () => {
  const cubes = [
    { size: 60, x: "10%", y: "20%", delay: 0 },
    { size: 40, x: "85%", y: "15%", delay: 0.3 },
    { size: 50, x: "75%", y: "70%", delay: 0.6 },
    { size: 35, x: "15%", y: "75%", delay: 0.9 },
    { size: 45, x: "50%", y: "85%", delay: 1.2 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {cubes.map((cube, idx) => (
        <motion.div
          key={idx}
          className="absolute"
          style={{ left: cube.x, top: cube.y }}
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 6 + idx,
            repeat: Infinity,
            ease: "easeInOut",
            delay: cube.delay,
          }}
        >
          <Cube3D size={cube.size} delay={cube.delay} />
        </motion.div>
      ))}
    </div>
  );
};
