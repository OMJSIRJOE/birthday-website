"use client";

import { useEffect, useState, useCallback } from "react";
import { usePageNavigation } from "@/hooks/usePageNavigation";
import type { PageStep } from "@/utils/constants";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";
import LuxuryCursor from "@/components/LuxuryCursor";
import HeroPage from "@/components/HeroPage";
import LetterPage from "@/components/LetterPage";
import QuizIntro from "@/components/QuizIntro";
import Quiz from "@/components/Quiz";
import QuizFail from "@/components/QuizFail";
import CelebrationScreen from "@/components/CelebrationScreen";
import GalleryPage from "@/components/GalleryPage";
import VideoMemoriesPage from "@/components/VideoMemoriesPage";
import SpinWheelPage from "@/components/SpinWheelPage";
import SurprisePage from "@/components/SurprisePage";
import OpenWhenPage from "@/components/OpenWhenPage";
import FinalPage from "@/components/FinalPage";

const GALLERY_UNLOCK_KEY = "birthday-gallery-unlocked";

export default function Home() {
  const { currentStep, maxReachedStep, goToStep } = usePageNavigation("loading");
  const [quizScore, setQuizScore] = useState(0);
  const [galleryUnlocked, setGalleryUnlocked] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(GALLERY_UNLOCK_KEY) === "true") {
        setGalleryUnlocked(true);
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  const handleLoadingComplete = useCallback(() => {
    goToStep("hero");
  }, [goToStep]);

  const handleQuizComplete = useCallback(
    (score: number, passed: boolean) => {
      setQuizScore(score);
      goToStep(passed ? "quiz-success" : "quiz-fail");
    },
    [goToStep]
  );

  const handleQuizRetry = useCallback(() => {
    setQuizScore(0);
    goToStep("quiz");
  }, [goToStep]);

  const unlockGallery = useCallback(() => {
    setGalleryUnlocked(true);
    try {
      sessionStorage.setItem(GALLERY_UNLOCK_KEY, "true");
    } catch {
      // ignore storage errors
    }
    goToStep("gallery");
  }, [goToStep]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentStep]);

  const renderPage = () => {
    switch (currentStep) {
      case "hero":
        return <HeroPage onBegin={() => goToStep("letter")} />;
      case "letter":
        return <LetterPage onContinue={() => goToStep("quiz-intro")} />;
      case "quiz-intro":
        return <QuizIntro onStart={() => goToStep("quiz")} />;
      case "quiz":
        return <Quiz onComplete={handleQuizComplete} />;
      case "quiz-fail":
        return (
          <QuizFail score={quizScore} total={5} onRetry={handleQuizRetry} />
        );
      case "quiz-success":
        return <CelebrationScreen onUnlock={unlockGallery} />;
      case "gallery":
        return <GalleryPage onContinue={() => goToStep("wheel")} />;
      case "wheel":
        return <SpinWheelPage onContinue={() => goToStep("videos")} />;
      case "videos":
        return <VideoMemoriesPage onContinue={() => goToStep("surprise")} />;
      case "surprise":
        return <SurprisePage onContinue={() => goToStep("open-when")} />;
      case "open-when":
        return <OpenWhenPage onContinue={() => goToStep("final")} />;
      case "final":
        return <FinalPage />;
      default:
        return <HeroPage onBegin={() => goToStep("letter")} />;
    }
  };

  const isLoading = currentStep === "loading";

  return (
    <main className="relative min-h-screen bg-luxury-black">
      <LuxuryCursor />

      {isLoading && (
        <LoadingScreen onComplete={handleLoadingComplete} duration={4000} />
      )}

      {!isLoading && (
        <>
          <Navbar
            currentStep={currentStep}
            maxReachedStep={maxReachedStep}
            galleryUnlocked={galleryUnlocked}
            onNavigate={(step: PageStep) => goToStep(step)}
          />

          <div className="pt-16">
            <PageTransition stepKey={currentStep}>
              {renderPage()}
            </PageTransition>
          </div>
        </>
      )}
    </main>
  );
}
