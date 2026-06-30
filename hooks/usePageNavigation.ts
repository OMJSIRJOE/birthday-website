"use client";

import { useCallback, useState } from "react";
import type { PageStep } from "@/utils/constants";

const STEP_ORDER: PageStep[] = [
  "loading",
  "hero",
  "letter",
  "quiz-intro",
  "quiz",
  "quiz-fail",
  "quiz-success",
  "gallery",
  "wheel",
  "videos",
  "surprise",
  "open-when",
  "final",
];

export function usePageNavigation(initialStep: PageStep = "loading") {
  const [currentStep, setCurrentStep] = useState<PageStep>(initialStep);
  const [maxReachedStep, setMaxReachedStep] = useState(0);

  const goToStep = useCallback((step: PageStep) => {
    setCurrentStep(step);
    const stepIndex = STEP_ORDER.indexOf(step);
    if (stepIndex >= 0) {
      setMaxReachedStep((prev) => Math.max(prev, stepIndex));
    }
  }, []);

  const goNext = useCallback(() => {
    const currentIndex = STEP_ORDER.indexOf(currentStep);
    if (currentIndex < STEP_ORDER.length - 1) {
      const nextStep = STEP_ORDER[currentIndex + 1];
      goToStep(nextStep);
    }
  }, [currentStep, goToStep]);

  return {
    currentStep,
    maxReachedStep,
    goToStep,
    goNext,
  };
}
