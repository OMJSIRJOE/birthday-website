"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

interface FloatingHeartsProps {
  count?: number;
  className?: string;
}

export default function FloatingHearts({
  count = 12,
  className = "",
}: FloatingHeartsProps) {
  const hearts = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 4 + Math.random() * 4,
        size: 12 + Math.random() * 16,
        opacity: 0.2 + Math.random() * 0.5,
      })),
    [count]
  );

  return (
    <div
      className={`pointer-events-none fixed inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      {hearts.map((heart) => (
        <motion.span
          key={heart.id}
          className="absolute text-luxury-gold"
          style={{
            left: `${heart.x}%`,
            fontSize: heart.size,
            opacity: heart.opacity,
          }}
          initial={{ y: "110vh", rotate: 0 }}
          animate={{
            y: "-10vh",
            rotate: [0, 15, -15, 0],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          ❤
        </motion.span>
      ))}
    </div>
  );
}
