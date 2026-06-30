"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function Lightbox({
  images,
  currentIndex,
  onClose,
  onNavigate,
}: LightboxProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onNavigate(Math.max(0, currentIndex - 1));
      if (e.key === "ArrowRight")
        onNavigate(Math.min(images.length - 1, currentIndex + 1));
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [currentIndex, images.length, onClose, onNavigate]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
        onClick={onClose}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full border border-luxury-gold/30 p-2 text-luxury-gold transition hover:bg-luxury-gold/10"
          aria-label="Close lightbox"
        >
          <X size={24} />
        </button>

        {currentIndex > 0 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate(currentIndex - 1);
            }}
            className="absolute left-4 z-10 rounded-full border border-luxury-gold/30 p-2 text-luxury-gold transition hover:bg-luxury-gold/10"
            aria-label="Previous image"
          >
            <ChevronLeft size={28} />
          </button>
        )}

        {currentIndex < images.length - 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate(currentIndex + 1);
            }}
            className="absolute right-16 z-10 rounded-full border border-luxury-gold/30 p-2 text-luxury-gold transition hover:bg-luxury-gold/10"
            aria-label="Next image"
          >
            <ChevronRight size={28} />
          </button>
        )}

        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          className="relative max-h-[85vh] max-w-5xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images[currentIndex]}
            alt={`Memory photo ${currentIndex + 1}`}
            className="max-h-[85vh] w-auto rounded-lg object-contain shadow-gold-lg"
          />
          <p className="mt-4 text-center font-body text-sm text-luxury-gold/70">
            {currentIndex + 1} / {images.length}
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
