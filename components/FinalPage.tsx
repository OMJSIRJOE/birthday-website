"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { GiRose } from "react-icons/gi";
import { PERSONAL } from "@/content/personal";
import FloatingHearts from "./FloatingHearts";

export default function FinalPage() {
  const stars = useMemo(
    () =>
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 1 + Math.random() * 3,
        delay: Math.random() * 3,
      })),
    []
  );

  const petals = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 10 + Math.random() * 8,
      })),
    []
  );

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-24">
      <FloatingHearts count={15} />

      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="star-twinkle pointer-events-none absolute rounded-full bg-luxury-gold"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            boxShadow: "0 0 4px rgba(212, 175, 55, 0.8)",
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}

      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="rose-petal pointer-events-none absolute text-lg opacity-60"
          style={{
            left: `${petal.x}%`,
            animationDuration: `${petal.duration}s`,
            animationDelay: `${petal.delay}s`,
          }}
        >
          🌸
        </motion.div>
      ))}

      <motion.div
        className="relative z-10 mx-auto max-w-3xl text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <motion.h1
          className="luxury-heading gold-text-gradient text-shadow-gold mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1.2 }}
        >
          Forever &amp; Always
        </motion.h1>

        <motion.p
          className="mb-6 font-display text-2xl italic text-luxury-gold sm:text-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Love,
          <br />
          {PERSONAL.yourName} ❤️
        </motion.p>

        <motion.p
          className="flex items-center justify-center gap-2 font-body text-lg text-white/70 sm:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <GiRose className="text-luxury-gold" />
          Thank You For Being My Greatest Blessing.
          <GiRose className="text-luxury-gold" />
        </motion.p>

        <motion.div
          className="mt-12 flex justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.span
              key={i}
              className="text-2xl text-luxury-gold"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                delay: i * 0.3,
                repeat: Infinity,
              }}
            >
              ❤
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
