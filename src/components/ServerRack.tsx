import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface LED {
  id: string;
  x: number;
  y: number;
  color: "green" | "amber" | "red" | "off";
  delay: number;
}

const generateLEDs = (rackY: number, rackIndex: number): LED[] => {
  const leds: LED[] = [];
  const ledPositions = [
    { x: 45, baseColor: "green" as const },
    { x: 55, baseColor: "green" as const },
    { x: 65, baseColor: "amber" as const },
    { x: 135, baseColor: "green" as const },
    { x: 145, baseColor: "green" as const },
    { x: 155, baseColor: "green" as const },
    { x: 165, baseColor: "amber" as const },
  ];

  ledPositions.forEach((pos, i) => {
    const randomColor = Math.random();
    let color: LED["color"] = pos.baseColor;
    if (randomColor > 0.85) color = "red";
    else if (randomColor > 0.7) color = "amber";
    else if (randomColor > 0.15) color = "green";
    else color = "off";

    leds.push({
      id: `led-${rackIndex}-${i}`,
      x: pos.x,
      y: rackY + 18,
      color,
      delay: Math.random() * 2,
    });
  });

  return leds;
};

export const ServerRack = () => {
  const [leds, setLeds] = useState<LED[]>([]);

  useEffect(() => {
    const allLeds: LED[] = [];
    const rackUnits = [0, 50, 100, 150, 200];
    rackUnits.forEach((y, index) => {
      allLeds.push(...generateLEDs(y, index));
    });
    setLeds(allLeds);

    // Randomize LED states periodically
    const interval = setInterval(() => {
      setLeds((prev) =>
        prev.map((led) => {
          if (Math.random() > 0.9) {
            const colors: LED["color"][] = ["green", "green", "green", "amber", "off"];
            return { ...led, color: colors[Math.floor(Math.random() * colors.length)] };
          }
          return led;
        })
      );
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const ServerUnit = ({ y, index }: { y: number; index: number }) => (
    <g>
      {/* Server chassis */}
      <rect
        x="20"
        y={y}
        width="180"
        height="45"
        fill="hsl(0 0% 18%)"
        stroke="hsl(0 0% 25%)"
        strokeWidth="1"
        rx="2"
      />
      
      {/* Front bezel */}
      <rect
        x="25"
        y={y + 5}
        width="170"
        height="35"
        fill="hsl(0 0% 12%)"
        rx="1"
      />
      
      {/* Ventilation holes */}
      {[0, 1, 2, 3, 4].map((i) => (
        <rect
          key={`vent-${index}-${i}`}
          x={80 + i * 12}
          y={y + 12}
          width="8"
          height="20"
          fill="hsl(0 0% 8%)"
          rx="1"
        />
      ))}
      
      {/* Drive bays */}
      {[0, 1].map((i) => (
        <rect
          key={`drive-${index}-${i}`}
          x={170 + i * 12}
          y={y + 10}
          width="10"
          height="25"
          fill="hsl(0 0% 15%)"
          stroke="hsl(0 0% 22%)"
          strokeWidth="0.5"
          rx="1"
        />
      ))}
    </g>
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="relative"
    >
      <svg
        viewBox="0 0 220 280"
        className="w-full max-w-[280px] h-auto"
        style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.15))" }}
      >
        {/* Rack frame */}
        <rect
          x="10"
          y="0"
          width="200"
          height="270"
          fill="hsl(0 0% 8%)"
          stroke="hsl(0 0% 15%)"
          strokeWidth="2"
          rx="4"
        />
        
        {/* Rack rails */}
        <rect x="12" y="5" width="4" height="260" fill="hsl(0 0% 20%)" rx="1" />
        <rect x="204" y="5" width="4" height="260" fill="hsl(0 0% 20%)" rx="1" />
        
        {/* Server units */}
        {[10, 60, 110, 160, 210].map((y, i) => (
          <ServerUnit key={i} y={y} index={i} />
        ))}
        
        {/* LEDs with animations */}
        {leds.map((led) => (
          <motion.circle
            key={led.id}
            cx={led.x}
            cy={led.y}
            r="3"
            className={`led-${led.color}`}
            initial={{ opacity: 0.3 }}
            animate={{ opacity: led.color === "off" ? 0.2 : [0.4, 1, 0.4] }}
            transition={{
              duration: led.color === "red" ? 0.8 : led.color === "amber" ? 1.5 : 2.5,
              repeat: Infinity,
              delay: led.delay,
              ease: "easeInOut",
            }}
            style={{
              fill:
                led.color === "green"
                  ? "hsl(142 71% 45%)"
                  : led.color === "amber"
                  ? "hsl(38 92% 50%)"
                  : led.color === "red"
                  ? "hsl(0 84% 60%)"
                  : "hsl(0 0% 30%)",
              filter:
                led.color !== "off"
                  ? `drop-shadow(0 0 4px ${
                      led.color === "green"
                        ? "hsl(142 71% 45%)"
                        : led.color === "amber"
                        ? "hsl(38 92% 50%)"
                        : "hsl(0 84% 60%)"
                    })`
                  : "none",
            }}
          />
        ))}
        
        {/* Subtle breathing glow overlay */}
        <motion.rect
          x="20"
          y="10"
          width="180"
          height="250"
          fill="url(#glowGradient)"
          opacity={0.15}
          animate={{ opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <defs>
          <linearGradient id="glowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(142 71% 45%)" stopOpacity="0.3" />
            <stop offset="50%" stopColor="hsl(38 92% 50%)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="hsl(142 71% 45%)" stopOpacity="0.3" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
};
