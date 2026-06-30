export interface WheelPrize {
  id: number;
  label: string;
  /** Shorter lines shown on the wheel slice */
  wheelLines: string[];
  emoji: string;
  color: string;
}

export const WHEEL_PRIZES: WheelPrize[] = [
  {
    id: 0,
    label: "Movie Date",
    wheelLines: ["Movie", "Date"],
    emoji: "🍿",
    color: "#2a2010",
  },
  {
    id: 1,
    label: "Flowers",
    wheelLines: ["Flowers"],
    emoji: "🌹",
    color: "#1a1a1a",
  },
  {
    id: 2,
    label: "Cakes",
    wheelLines: ["Cakes"],
    emoji: "🎂",
    color: "#2a2010",
  },
  {
    id: 3,
    label: "100 Kisses",
    wheelLines: ["100", "Kisses"],
    emoji: "😘",
    color: "#1a1a1a",
  },
  {
    id: 4,
    label: "Romantic Dinner",
    wheelLines: ["Romantic", "Dinner"],
    emoji: "🍽️",
    color: "#2a2010",
  },
];

export const WHEEL_SEGMENT_ANGLE = 360 / WHEEL_PRIZES.length;

/** Segment center in SVG coords (0° = 3 o'clock, clockwise). */
export function getSegmentCenterAngle(index: number): number {
  return index * WHEEL_SEGMENT_ANGLE + WHEEL_SEGMENT_ANGLE / 2 - 90;
}

/** CSS rotation from 12 o'clock, clockwise. */
export function getLabelCssAngle(index: number): number {
  return getSegmentCenterAngle(index) + 90;
}

/** Pointer fixed at top of wheel (12 o'clock). */
const POINTER_ANGLE = -90;

function normalizeAngle(angle: number): number {
  return ((angle % 360) + 360) % 360;
}

function isAngleInsideSegment(
  angle: number,
  start: number,
  end: number
): boolean {
  const a = normalizeAngle(angle);
  const s = normalizeAngle(start);
  const e = normalizeAngle(end);

  if (s <= e) return a >= s && a < e;
  return a >= s || a < e;
}

/** Which slice sits under the pointer after the wheel stops. */
export function getPrizeIndexFromRotation(rotationDeg: number): number {
  const normalized = normalizeAngle(rotationDeg);

  for (let i = 0; i < WHEEL_PRIZES.length; i++) {
    const start = i * WHEEL_SEGMENT_ANGLE - 90 + normalized;
    const end = start + WHEEL_SEGMENT_ANGLE;

    if (isAngleInsideSegment(POINTER_ANGLE, start, end)) {
      return i;
    }
  }

  return 0;
}

/** Spin the wheel so the chosen prize ends under the pointer. */
export function getRotationForPrize(
  prizeIndex: number,
  currentRotation: number
): number {
  const center = getSegmentCenterAngle(prizeIndex);
  const targetMod = normalizeAngle(POINTER_ANGLE - center);
  const currentMod = normalizeAngle(currentRotation);

  let delta = targetMod - currentMod;
  if (delta <= 0) delta += 360;

  const fullSpins = 5 + Math.floor(Math.random() * 3);
  return currentRotation + fullSpins * 360 + delta;
}
