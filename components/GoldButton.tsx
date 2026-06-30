"use client";

import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

interface GoldButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit";
}

export default function GoldButton({
  children,
  onClick,
  className,
  disabled = false,
  type = "button",
}: GoldButtonProps) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? undefined : { scale: 1.05 }}
      whileTap={disabled ? undefined : { scale: 0.95 }}
      className={cn(
        "gold-button relative z-10 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
