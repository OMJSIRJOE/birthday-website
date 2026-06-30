"use client";

import { motion } from "framer-motion";
import GoldButton from "./GoldButton";
import GlassCard from "./GlassCard";

interface QuizFailProps {
  score: number;
  total: number;
  onRetry: () => void;
}

export default function QuizFail({ score, total, onRetry }: QuizFailProps) {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-4 py-24">
      <GlassCard className="mx-auto max-w-md text-center">
        <motion.h2
          className="font-display text-3xl text-luxury-gold sm:text-4xl"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ❤️ Almost There ❤️
        </motion.h2>

        <motion.p
          className="mt-6 font-body text-lg text-white/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          You scored{" "}
          <span className="font-semibold text-luxury-gold">
            {score}/{total}
          </span>
          .
        </motion.p>

        <p className="mt-4 font-body text-white/60">
          You need at least 3 correct answers to unlock the surprise.
        </p>

        <motion.div className="mt-10">
          <GoldButton onClick={onRetry}>Try Again</GoldButton>
        </motion.div>
      </GlassCard>
    </section>
  );
}
