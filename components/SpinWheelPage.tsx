"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  WHEEL_PRIZES,
  WHEEL_SEGMENT_ANGLE,
  getLabelCssAngle,
} from "@/utils/wheelData";
import { useWheelSpin } from "@/hooks/useWheelSpin";
import GoldButton from "./GoldButton";
import GlassCard from "./GlassCard";

interface SpinWheelPageProps {
  onContinue: () => void;
}

export default function SpinWheelPage({ onContinue }: SpinWheelPageProps) {
  const { rotation, isSpinning, hasSpun, wonPrize, displayPrize, spin } =
    useWheelSpin();
  const [showPopup, setShowPopup] = useState(false);

  const handleSpin = () => {
    const prize = spin();
    if (prize) {
      setTimeout(() => setShowPopup(true), 5000);
    }
  };

  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-4 py-24">
      <motion.h2
        className="luxury-heading mb-4 text-center gold-text-gradient"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Spin The Wheel ❤️
      </motion.h2>

      <motion.p
        className="mb-10 text-center font-body text-white/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {hasSpun
          ? "You've already claimed your prize!"
          : "Spin once to reveal your gift"}
      </motion.p>

      <div className="relative mb-10">
        <div className="absolute -top-7 left-1/2 z-20 -translate-x-1/2">
          <div className="h-0 w-0 border-l-[14px] border-r-[14px] border-t-[24px] border-l-transparent border-r-transparent border-t-luxury-gold drop-shadow-[0_0_12px_rgba(212,175,55,0.9)]" />
        </div>

        <div className="relative h-80 w-80 overflow-hidden rounded-full sm:h-[22rem] sm:w-[22rem] md:h-96 md:w-96">
          <motion.div
            className="relative h-full w-full rounded-full border-4 border-luxury-gold shadow-gold-lg"
            animate={{ rotate: rotation }}
            transition={
              isSpinning
                ? { duration: 5, ease: [0.17, 0.67, 0.12, 0.99] }
                : { duration: 0 }
            }
          >
            <svg viewBox="0 0 400 400" className="h-full w-full">
              {WHEEL_PRIZES.map((prize, index) => {
                const startAngle = index * WHEEL_SEGMENT_ANGLE - 90;
                const endAngle = startAngle + WHEEL_SEGMENT_ANGLE;
                const startRad = (startAngle * Math.PI) / 180;
                const endRad = (endAngle * Math.PI) / 180;
                const x1 = 200 + 190 * Math.cos(startRad);
                const y1 = 200 + 190 * Math.sin(startRad);
                const x2 = 200 + 190 * Math.cos(endRad);
                const y2 = 200 + 190 * Math.sin(endRad);

                return (
                  <path
                    key={prize.id}
                    d={`M 200 200 L ${x1} ${y1} A 190 190 0 0 1 ${x2} ${y2} Z`}
                    fill={prize.color}
                    stroke="#D4AF37"
                    strokeWidth="2"
                  />
                );
              })}
              <circle
                cx="200"
                cy="200"
                r="36"
                fill="#090909"
                stroke="#D4AF37"
                strokeWidth="3"
              />
            </svg>

            {WHEEL_PRIZES.map((prize, index) => {
              const cssAngle = getLabelCssAngle(index);
              const labelRadius = prize.wheelLines.length > 1 ? 102 : 108;
              const fontSize =
                prize.wheelLines.length > 1 ? "text-[9px] sm:text-[10px]" : "text-[10px] sm:text-[11px]";

              return (
                <div
                  key={`label-${prize.id}`}
                  className="pointer-events-none absolute left-1/2 top-1/2 z-[1] w-[4.5rem] text-center sm:w-20"
                  style={{
                    transform: `translate(-50%, -50%) rotate(${cssAngle}deg) translateY(-${labelRadius}px) rotate(${-cssAngle}deg)`,
                  }}
                >
                  <span className="block text-xl leading-none sm:text-2xl">
                    {prize.emoji}
                  </span>
                  <span
                    className={`mt-0.5 block font-body font-bold leading-[1.1] tracking-wide text-luxury-gold drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] ${fontSize}`}
                  >
                    {prize.wheelLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </span>
                </div>
              );
            })}
          </motion.div>

          <button
            onClick={handleSpin}
            disabled={isSpinning || hasSpun}
            className="absolute left-1/2 top-1/2 z-10 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-luxury-gold bg-luxury-black font-body text-xs font-bold uppercase tracking-wider text-luxury-gold shadow-gold transition hover:scale-105 hover:shadow-gold-lg disabled:cursor-not-allowed disabled:opacity-50 sm:h-20 sm:w-20 sm:text-sm"
          >
            {isSpinning ? "..." : hasSpun ? "✓" : "SPIN"}
          </button>
        </div>
      </div>

      {hasSpun && displayPrize && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <p className="font-body text-white/60">Your prize:</p>
          <p className="font-display text-2xl text-luxury-gold">
            {displayPrize.emoji} {displayPrize.label}
          </p>
        </motion.div>
      )}

      <GoldButton onClick={onContinue}>Continue</GoldButton>

      <AnimatePresence>
        {showPopup && wonPrize && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            onClick={() => setShowPopup(false)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <GlassCard className="max-w-sm text-center">
                <motion.div
                  className="text-6xl"
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 1, repeat: 2 }}
                >
                  {wonPrize.emoji}
                </motion.div>
                <h3 className="mt-4 font-display text-3xl text-luxury-gold">
                  You Won!
                </h3>
                <p className="mt-2 font-display text-xl text-white">
                  {wonPrize.label}
                </p>
                <p className="mt-4 font-body text-sm text-white/60">
                  Redeem anytime, my love ❤️
                </p>
                <div className="mt-6">
                  <GoldButton onClick={() => setShowPopup(false)}>
                    Claim Prize
                  </GoldButton>
                </div>
              </GlassCard>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
