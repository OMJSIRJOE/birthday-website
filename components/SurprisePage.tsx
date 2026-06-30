"use client";

import { motion } from "framer-motion";
import { FaSpotify } from "react-icons/fa";
import { PERSONAL } from "@/content/personal";
import GoldParticles from "./GoldParticles";
import GoldButton from "./GoldButton";

interface SurprisePageProps {
  onContinue: () => void;
}

export default function SurprisePage({ onContinue }: SurprisePageProps) {
  const hasPlaylist = PERSONAL.spotifyPlaylistUrl.trim().length > 0;

  const openSpotifyPlaylist = () => {
    if (!hasPlaylist) return;
    window.open(PERSONAL.spotifyPlaylistUrl, "_blank", "noopener,noreferrer");
  };

  const roses = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 8 + Math.random() * 4,
  }));

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-24">
      <GoldParticles count={50} />

      {roses.map((rose) => (
        <motion.span
          key={rose.id}
          className="pointer-events-none absolute text-2xl"
          style={{ left: `${rose.x}%`, top: "-5%" }}
          animate={{ y: ["0vh", "110vh"], rotate: [0, 360], opacity: [1, 0.3] }}
          transition={{
            duration: rose.duration,
            delay: rose.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          🌹
        </motion.span>
      ))}

      <motion.div
        className="relative z-10 mx-auto max-w-3xl text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <motion.h1
          className="luxury-heading gold-text-gradient text-shadow-gold mb-10"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          I Love You More Than Words Can Ever Explain ❤️
        </motion.h1>

        <motion.div
          className="heart-beat mx-auto mb-10 text-8xl sm:text-9xl"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
        >
          ❤️
        </motion.div>

        <motion.div
          className="mb-10 flex flex-col items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <GoldButton
            onClick={openSpotifyPlaylist}
            disabled={!hasPlaylist}
            className="flex items-center justify-center gap-3 sm:px-10"
          >
            <FaSpotify size={22} />
            Play Our Favourite Songs
          </GoldButton>

          {!hasPlaylist && (
            <p className="max-w-sm font-body text-xs text-white/40">
              Add your Spotify playlist link in{" "}
              <code className="text-luxury-gold/70">content/personal.ts</code>
            </p>
          )}

          {hasPlaylist && (
            <p className="font-body text-xs text-white/50">
              Opens in Spotify on your phone or browser ❤️
            </p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <GoldButton onClick={onContinue}>Continue</GoldButton>
        </motion.div>
      </motion.div>
    </section>
  );
}
