"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaImages } from "react-icons/fa";
import { GALLERY_IMAGES } from "@/utils/constants";
import GoldButton from "./GoldButton";
import Lightbox from "./Lightbox";

interface GalleryPageProps {
  onContinue: () => void;
}

export default function GalleryPage({ onContinue }: GalleryPageProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [images, setImages] = useState<string[]>([...GALLERY_IMAGES]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/gallery")
      .then((res) => res.json())
      .then((data: { images?: string[] }) => {
        if (data.images && data.images.length > 0) {
          setImages(data.images);
        }
      })
      .catch(() => {
        // keep default filenames as fallback
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="min-h-screen px-4 py-24 sm:px-6">
      <motion.div
        className="mb-4 flex items-center justify-center gap-3"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <FaImages className="text-luxury-gold" size={28} />
        <h2 className="luxury-heading gold-text-gradient">Photo Gallery</h2>
      </motion.div>

      <motion.p
        className="mb-12 text-center font-body text-white/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Tap any photo to view
      </motion.p>

      {loading ? (
        <p className="text-center font-body text-luxury-gold/70">
          Loading memories…
        </p>
      ) : images.length === 0 ? (
        <div className="mx-auto max-w-md rounded-2xl border border-luxury-gold/20 bg-white/5 p-8 text-center">
          <p className="font-body text-white/80">No photos found yet.</p>
          <p className="mt-3 font-body text-sm text-white/50">
            Add images to{" "}
            <code className="text-luxury-gold">public/images/</code>
            <br />
            (jpg, png, or webp — any filename works)
          </p>
        </div>
      ) : (
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {images.map((src, index) => (
            <motion.button
              key={src}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setLightboxIndex(index)}
              className="group relative aspect-square overflow-hidden rounded-xl border border-luxury-gold/20 bg-white/5 shadow-luxury"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`Memory ${index + 1}`}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute inset-0 border-2 border-luxury-gold/0 transition-all duration-500 group-hover:border-luxury-gold/40 group-hover:shadow-gold" />
            </motion.button>
          ))}
        </div>
      )}

      <motion.div
        className="mt-16 flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <GoldButton onClick={onContinue}>Continue</GoldButton>
      </motion.div>

      {lightboxIndex !== null && images.length > 0 && (
        <Lightbox
          images={images}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </section>
  );
}
