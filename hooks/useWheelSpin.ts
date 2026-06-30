"use client";

import { useState, useCallback, useEffect } from "react";
import {
  WHEEL_PRIZES,
  getPrizeIndexFromRotation,
  getRotationForPrize,
} from "@/utils/wheelData";
import { WHEEL_STORAGE_KEY } from "@/utils/constants";
import { useLocalStorage } from "./useLocalStorage";

interface StoredWheelResult {
  prizeIndex: number;
  label: string;
  emoji: string;
  finalRotation: number;
  spunAt: string;
}

export function useWheelSpin() {
  const [storedResult, setStoredResult] = useLocalStorage<StoredWheelResult | null>(
    WHEEL_STORAGE_KEY,
    null
  );
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [wonPrize, setWonPrize] = useState<(typeof WHEEL_PRIZES)[0] | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated || !storedResult) return;

    setRotation(storedResult.finalRotation);
    const prize = WHEEL_PRIZES[storedResult.prizeIndex];
    if (prize) setWonPrize(prize);
  }, [isHydrated, storedResult]);

  const hasSpun = storedResult !== null;

  const spin = useCallback(() => {
    if (isSpinning || hasSpun) return null;

    setIsSpinning(true);

    const randomIndex = Math.floor(Math.random() * WHEEL_PRIZES.length);
    const targetRotation = getRotationForPrize(randomIndex, rotation);

    setRotation(targetRotation);

    setTimeout(() => {
      const actualIndex = getPrizeIndexFromRotation(targetRotation);
      const prize = WHEEL_PRIZES[actualIndex];

      setIsSpinning(false);
      setWonPrize(prize);
      setStoredResult({
        prizeIndex: actualIndex,
        label: prize.label,
        emoji: prize.emoji,
        finalRotation: targetRotation,
        spunAt: new Date().toISOString(),
      });
    }, 5000);

    return WHEEL_PRIZES[randomIndex];
  }, [hasSpun, isSpinning, rotation, setStoredResult]);

  const displayPrize =
    wonPrize ??
    (storedResult && WHEEL_PRIZES[storedResult.prizeIndex]
      ? WHEEL_PRIZES[storedResult.prizeIndex]
      : null);

  return {
    rotation,
    isSpinning,
    hasSpun,
    wonPrize,
    displayPrize,
    spin,
  };
}
