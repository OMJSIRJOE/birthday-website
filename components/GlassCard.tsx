"use client";

import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function GlassCard({
  children,
  className,
  delay = 0,
}: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn("glass-card p-6 sm:p-8 md:p-10", className)}
    >
      {children}
    </motion.div>
  );
}
