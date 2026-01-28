/** DO NOT TOUCH - Animated counter with light mode support */
import { useCountUp } from "@/hooks/useCountUp";
import { motion } from "framer-motion";

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  label: string;
  highlight?: boolean;
  duration?: number;
  light?: boolean;
}

export const AnimatedCounter = ({
  end,
  suffix = "",
  label,
  highlight = false,
  duration = 2000,
  light = false,
}: AnimatedCounterProps) => {
  const { ref, formattedValue } = useCountUp({
    end,
    duration,
    suffix,
    startOnView: true,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col items-center text-center"
    >
      <div
        className={`text-display ${
          highlight 
            ? "text-primary" 
            : light 
              ? "text-background" 
              : "text-foreground"
        }`}
      >
        {formattedValue}
      </div>
      <div className={`text-label mt-2 ${light ? "text-background/60" : "text-muted-foreground"}`}>
        {label}
      </div>
    </motion.div>
  );
};
