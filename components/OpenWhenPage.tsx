"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, X } from "lucide-react";
import { OPEN_WHEN_NOTES, type OpenWhenNote } from "@/content/openWhen";
import GoldButton from "./GoldButton";
import GlassCard from "./GlassCard";

interface OpenWhenPageProps {
  onContinue: () => void;
}

export default function OpenWhenPage({ onContinue }: OpenWhenPageProps) {
  const [openedNote, setOpenedNote] = useState<OpenWhenNote | null>(null);
  const [readNotes, setReadNotes] = useState<Set<string>>(new Set());

  const handleOpen = (note: OpenWhenNote) => {
    setOpenedNote(note);
    setReadNotes((prev) => new Set(prev).add(note.id));
  };

  const paragraphs = openedNote?.message.split("\n\n") ?? [];

  return (
    <section className="min-h-screen px-4 py-24 sm:px-6">
      <motion.div
        className="mb-4 flex items-center justify-center gap-3"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Mail className="text-luxury-gold" size={28} />
        <h2 className="luxury-heading text-luxury-gold">Open When…</h2>
      </motion.div>

      <motion.p
        className="mb-12 text-center font-body text-white/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Special letters for every moment. Tap to open.
      </motion.p>

      <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2 sm:gap-6">
        {OPEN_WHEN_NOTES.map((note, index) => {
          const isRead = readNotes.has(note.id);

          return (
            <motion.button
              key={note.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleOpen(note)}
              className="group relative overflow-hidden rounded-2xl border border-luxury-gold/30 bg-gradient-to-br from-luxury-gold/10 via-white/5 to-transparent p-6 text-left shadow-luxury transition-all duration-500 hover:border-luxury-gold/60 hover:shadow-gold sm:p-8"
            >
              <div className="absolute right-4 top-4 text-3xl opacity-30 transition group-hover:opacity-60">
                ✉️
              </div>

              {isRead && (
                <span className="absolute left-4 top-4 rounded-full bg-luxury-gold/20 px-2 py-0.5 font-body text-[10px] uppercase tracking-wider text-luxury-gold">
                  Read
                </span>
              )}

              <p className="mb-2 font-body text-xs uppercase tracking-[0.25em] text-luxury-gold/70">
                Open When
              </p>
              <h3 className="font-display text-xl text-white sm:text-2xl">
                {note.title.replace(/^Open When /i, "")} {note.emoji}
              </h3>
              <p className="mt-4 font-body text-sm text-luxury-gold/80 transition group-hover:text-luxury-gold">
                Tap to open →
              </p>
            </motion.button>
          );
        })}
      </div>

      <motion.div
        className="mt-16 flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <GoldButton onClick={onContinue}>Continue</GoldButton>
      </motion.div>

      <AnimatePresence>
        {openedNote && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
            onClick={() => setOpenedNote(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 40 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative mx-auto max-h-[85vh] w-full max-w-lg overflow-y-auto"
            >
              <button
                onClick={() => setOpenedNote(null)}
                className="absolute right-3 top-3 z-10 rounded-full border border-luxury-gold/30 p-2 text-luxury-gold transition hover:bg-luxury-gold/10"
                aria-label="Close letter"
              >
                <X size={20} />
              </button>

              <GlassCard className="relative overflow-hidden">
                <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-luxury-gold/60 via-luxury-gold/20 to-transparent" />

                <p className="mb-2 font-body text-xs uppercase tracking-[0.3em] text-luxury-gold/70">
                  {openedNote.title} {openedNote.emoji}
                </p>

                <div className="space-y-5 font-display text-base leading-relaxed text-white/90 sm:text-lg">
                  {paragraphs.map((paragraph, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + i * 0.08 }}
                    >
                      {paragraph}
                    </motion.p>
                  ))}
                </div>

                <motion.div
                  className="mt-8 flex justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <GoldButton onClick={() => setOpenedNote(null)}>
                    Close Letter
                  </GoldButton>
                </motion.div>
              </GlassCard>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
