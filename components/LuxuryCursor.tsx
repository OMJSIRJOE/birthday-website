"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function LuxuryCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleLeave = () => setIsVisible(false);
    const handleEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
    };
  }, []);

  if (isTouch) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed z-[9999] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-luxury-gold/40"
        animate={{
          x: position.x,
          y: position.y,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
      />
      <motion.div
        className="pointer-events-none fixed z-[9999] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-luxury-gold shadow-[0_0_15px_rgba(212,175,55,0.8)]"
        animate={{
          x: position.x,
          y: position.y,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 800, damping: 35, mass: 0.2 }}
      />
    </>
  );
}
