"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QUIZ_QUESTIONS } from "@/utils/quizData";
import { QUIZ_PASS_SCORE } from "@/utils/constants";
import GlassCard from "./GlassCard";

interface QuizProps {
  onComplete: (score: number, passed: boolean) => void;
}

export default function Quiz({ onComplete }: QuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentQuestion = QUIZ_QUESTIONS[currentIndex];
  const totalQuestions = QUIZ_QUESTIONS.length;

  const handleSelect = useCallback(
    (option: string) => {
      if (isTransitioning) return;
      setSelectedOption(option);
      setIsTransitioning(true);

      const isCorrect = option === currentQuestion.correctAnswer;
      const newScore = isCorrect ? score + 1 : score;

      setTimeout(() => {
        if (currentIndex < totalQuestions - 1) {
          setScore(newScore);
          setCurrentIndex((prev) => prev + 1);
          setSelectedOption(null);
          setIsTransitioning(false);
        } else {
          const finalScore = newScore;
          onComplete(finalScore, finalScore >= QUIZ_PASS_SCORE);
        }
      }, 800);
    },
    [currentIndex, currentQuestion.correctAnswer, isTransitioning, onComplete, score, totalQuestions]
  );

  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-4 py-24 sm:px-6">
      <div className="mb-8 flex items-center gap-2">
        {QUIZ_QUESTIONS.map((_, i) => (
          <motion.div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i <= currentIndex ? "bg-luxury-gold w-8" : "bg-white/20 w-4"
            }`}
            layout
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -60 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-xl"
        >
          <GlassCard>
            <p className="mb-2 font-body text-xs uppercase tracking-[0.3em] text-luxury-gold/70">
              Question {currentIndex + 1} of {totalQuestions}
            </p>
            <h3 className="mb-8 font-display text-2xl text-white sm:text-3xl">
              {currentQuestion.question}
            </h3>

            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedOption === option;
                const isCorrect = option === currentQuestion.correctAnswer;
                const showResult = selectedOption !== null;

                return (
                  <motion.button
                    key={option}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleSelect(option)}
                    disabled={isTransitioning}
                    whileTap={!isTransitioning ? { scale: 0.98 } : undefined}
                    className={`w-full touch-manipulation rounded-xl border px-6 py-4 text-left font-body text-sm outline-none transition-all duration-300 focus:outline-none focus-visible:outline-none sm:text-base ${
                      showResult && isSelected && isCorrect
                        ? "border-luxury-gold bg-luxury-gold/20 text-luxury-gold shadow-gold"
                        : showResult && isSelected && !isCorrect
                          ? "border-red-500/50 bg-red-500/10 text-red-300"
                          : "border-white/10 bg-white/5 text-white/90 [@media(hover:hover)_and_(pointer:fine)]:hover:border-luxury-gold/30 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-luxury-gold/5"
                    }`}
                  >
                    <span className="mr-3 text-luxury-gold/60">
                      {String.fromCharCode(65 + index)}.
                    </span>
                    {option}
                  </motion.button>
                );
              })}
            </div>
          </GlassCard>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
