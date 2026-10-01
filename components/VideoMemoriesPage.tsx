"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  Film,
} from "lucide-react";
import { FaPlayCircle } from "react-icons/fa";
import GoldButton from "./GoldButton";
import GlassCard from "./GlassCard";

interface VideoMemoriesPageProps {
  onContinue: () => void;
}

export default function VideoMemoriesPage({ onContinue }: VideoMemoriesPageProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videos, setVideos] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    fetch("/api/videos")
      .then((res) => res.json())
      .then((data: { videos?: string[] }) => {
        if (data.videos) setVideos(data.videos);
      })
      .catch(() => {
        // keep empty list
      })
      .finally(() => setLoading(false));
  }, []);

  const currentVideo = videos[currentIndex];

  const playCurrent = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;
    try {
      await video.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  }, []);

  const goToVideo = useCallback(
    (index: number) => {
      if (videos.length === 0) return;
      const nextIndex = ((index % videos.length) + videos.length) % videos.length;
      setCurrentIndex(nextIndex);
      setProgress(0);
    },
    [videos.length]
  );

  const goNext = useCallback(() => {
    goToVideo(currentIndex + 1);
  }, [currentIndex, goToVideo]);

  const goPrev = useCallback(() => {
    goToVideo(currentIndex - 1);
  }, [currentIndex, goToVideo]);

  const handleStart = async () => {
    setHasStarted(true);
    setIsPlaying(true);
  };

  useEffect(() => {
    if (!hasStarted || !currentVideo) return;
    const video = videoRef.current;
    if (!video) return;

    video.load();
    void playCurrent();
  }, [hasStarted, currentVideo, currentIndex, playCurrent]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onTimeUpdate = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };

    const onEnded = () => {
      if (currentIndex < videos.length - 1) {
        goToVideo(currentIndex + 1);
      } else {
        setIsPlaying(false);
        setProgress(100);
      }
    };

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("ended", onEnded);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);

    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
    };
  }, [currentIndex, videos.length, goToVideo]);

  const togglePlay = async () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      await playCurrent();
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section className="min-h-screen px-4 py-24 sm:px-6">
      <motion.div
        className="mb-4 flex items-center justify-center gap-3"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Film className="text-luxury-gold" size={28} />
        <h2 className="luxury-heading gold-text-gradient">Video Memories</h2>
      </motion.div>

      <motion.p
        className="mb-10 text-center font-body text-white/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        A cinematic journey through how much you&apos;ve grown
      </motion.p>

      {loading ? (
        <p className="text-center font-body text-luxury-gold/70">
          Loading videos…
        </p>
      ) : videos.length === 0 ? (
        <GlassCard className="mx-auto max-w-lg text-center">
          <p className="font-body text-white/80">No videos found yet.</p>
          <p className="mt-3 font-body text-sm text-white/50">
            Add your memory videos to{" "}
            <code className="text-luxury-gold">public/videos/</code>
            <br />
            (.mp4, .webm, or .mov — any filename works)
          </p>
          <div className="mt-8">
            <GoldButton onClick={onContinue}>Continue</GoldButton>
          </div>
        </GlassCard>
      ) : (
        <>
          <GlassCard className="relative mx-auto max-w-4xl overflow-hidden p-0">
            <div className="relative aspect-video w-full bg-black">
              {!hasStarted && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={handleStart}
                  className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 bg-luxury-black/70 backdrop-blur-sm transition hover:bg-luxury-black/60"
                >
                  <FaPlayCircle className="text-6xl text-luxury-gold sm:text-7xl" />
                  <span className="font-display text-xl text-luxury-gold sm:text-2xl">
                    Play Our Memories
                  </span>
                </motion.button>
              )}

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentVideo}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <video
                    ref={videoRef}
                    src={currentVideo}
                    className="h-full w-full object-contain"
                    playsInline
                    preload="auto"
                    muted={isMuted}
                  />
                </motion.div>
              </AnimatePresence>

              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-luxury-black/90 via-luxury-black/40 to-transparent p-4 sm:p-6">
                <div className="mb-3 h-1 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-luxury-gold-dark via-luxury-gold to-luxury-gold-light"
                    style={{ width: `${progress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>

                <div className="flex items-center justify-between gap-3">
                  <p className="font-body text-xs text-white/70 sm:text-sm">
                    Memory {currentIndex + 1} of {videos.length}
                  </p>

                  {hasStarted && (
                    <div className="pointer-events-auto flex items-center gap-2 sm:gap-3">
                      <button
                        onClick={goPrev}
                        disabled={currentIndex === 0}
                        className="rounded-full border border-luxury-gold/30 p-2 text-luxury-gold transition hover:bg-luxury-gold/10 disabled:opacity-30"
                        aria-label="Previous video"
                      >
                        <ChevronLeft size={18} />
                      </button>

                      <button
                        onClick={togglePlay}
                        className="rounded-full border border-luxury-gold/30 p-2 text-luxury-gold transition hover:bg-luxury-gold/10"
                        aria-label={isPlaying ? "Pause" : "Play"}
                      >
                        {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                      </button>

                      <button
                        onClick={goNext}
                        disabled={currentIndex === videos.length - 1}
                        className="rounded-full border border-luxury-gold/30 p-2 text-luxury-gold transition hover:bg-luxury-gold/10 disabled:opacity-30"
                        aria-label="Next video"
                      >
                        <ChevronRight size={18} />
                      </button>

                      <button
                        onClick={toggleMute}
                        className="rounded-full border border-luxury-gold/30 p-2 text-luxury-gold/80 transition hover:bg-luxury-gold/10"
                        aria-label={isMuted ? "Unmute" : "Mute"}
                      >
                        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </GlassCard>

          <div className="mx-auto mt-6 flex max-w-4xl justify-center gap-2">
            {videos.map((src, index) => (
              <button
                key={src}
                onClick={() => {
                  if (!hasStarted) setHasStarted(true);
                  goToVideo(index);
                }}
                className={`h-2 rounded-full transition-all duration-500 ${
                  index === currentIndex
                    ? "w-8 bg-luxury-gold shadow-gold"
                    : "w-2 bg-white/20 hover:bg-luxury-gold/40"
                }`}
                aria-label={`Go to video ${index + 1}`}
              />
            ))}
          </div>

          <motion.p
            className="mt-4 text-center font-body text-xs text-white/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Videos play one after another automatically
          </motion.p>

          <motion.div
            className="mt-12 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <GoldButton onClick={onContinue}>Continue</GoldButton>
          </motion.div>
        </>
      )}
    </section>
  );
}
