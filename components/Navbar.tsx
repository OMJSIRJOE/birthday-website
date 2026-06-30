"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Heart } from "lucide-react";
import { NAV_ITEMS, type PageStep } from "@/utils/constants";
import { PERSONAL } from "@/content/personal";
import { cn } from "@/utils/cn";

interface NavbarProps {
  currentStep: PageStep;
  maxReachedStep: number;
  galleryUnlocked: boolean;
  onNavigate: (step: PageStep) => void;
}

const STEP_INDEX: Record<PageStep, number> = {
  loading: 0,
  hero: 1,
  letter: 2,
  "quiz-intro": 3,
  quiz: 3,
  "quiz-fail": 3,
  "quiz-success": 3,
  gallery: 4,
  wheel: 5,
  videos: 6,
  surprise: 7,
  "open-when": 8,
  final: 9,
};

export default function Navbar({
  currentStep,
  maxReachedStep,
  galleryUnlocked,
  onNavigate,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (currentStep === "loading") return null;

  const visibleItems = NAV_ITEMS.filter((item) => {
    if (item.id === "gallery" || item.id === "videos") return galleryUnlocked;
    return maxReachedStep >= item.minStep;
  });

  const handleNavigate = (step: PageStep) => {
    onNavigate(step);
    setIsOpen(false);
  };

  return (
    <nav className="fixed left-0 right-0 top-0 z-40 border-b border-luxury-gold/10 bg-luxury-black/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <button
          onClick={() => handleNavigate("hero")}
          className="flex items-center gap-2 font-display text-lg text-luxury-gold transition hover:text-luxury-gold-light"
        >
          <Heart size={18} className="fill-luxury-gold text-luxury-gold" />
          <span className="hidden sm:inline">{PERSONAL.herName} ❤️</span>
        </button>

        <div className="hidden items-center gap-1 md:flex">
          {visibleItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigate(item.id)}
              className={cn(
                "rounded-full px-4 py-2 font-body text-xs uppercase tracking-wider transition-all duration-300",
                STEP_INDEX[currentStep] === item.minStep
                  ? "bg-luxury-gold/20 text-luxury-gold shadow-gold"
                  : "text-white/50 hover:text-luxury-gold hover:bg-white/5"
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-lg border border-luxury-gold/20 p-2 text-luxury-gold md:hidden"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-luxury-gold/10 bg-luxury-black/95 md:hidden"
          >
            <div className="flex flex-col gap-1 p-4">
              {visibleItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className={cn(
                    "rounded-lg px-4 py-3 text-left font-body text-sm uppercase tracking-wider transition",
                    STEP_INDEX[currentStep] === item.minStep
                      ? "bg-luxury-gold/20 text-luxury-gold"
                      : "text-white/60 hover:bg-white/5 hover:text-luxury-gold"
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
