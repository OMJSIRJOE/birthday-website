"use client";

import { motion } from "framer-motion";
import GoldButton from "./GoldButton";
import GlassCard from "./GlassCard";

interface QuizIntroProps {
  onStart: () => void;
}

export default function QuizIntro({ onStart }: QuizIntroProps) {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-4 py-24 sm:px-6">
      <GlassCard className="mx-auto max-w-lg text-center">
        <motion.h2
          className="font-display text-3xl text-luxury-gold sm:text-4xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          Before You Continue…
        </motion.h2>

        <motion.div
          className="mt-8 space-y-4 font-body text-base leading-relaxed text-white/80 sm:text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p>Answer these 5 questions correctly.</p>
          <p>
            You must score at least{" "}
            <span className="font-semibold text-luxury-gold">3 out of 5</span> to
            unlock your surprise gallery.
          </p>
          <p className="text-luxury-gold">Good luck ❤️</p>
        </motion.div>

        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <GoldButton onClick={onStart}>Start Quiz</GoldButton>
        </motion.div>
      </GlassCard>
    </section>
  );
}
