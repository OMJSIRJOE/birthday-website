export const COLORS = {
  black: "#090909",
  gold: "#D4AF37",
  goldLight: "#E8C547",
  goldDark: "#B8962E",
  white: "#FFFFFF",
} as const;

export const LOADING_DURATION = 4000;

export const QUIZ_PASS_SCORE = 3;

export const GALLERY_IMAGES = [
  "/images/photo1.jpeg",
  "/images/photo2.jpeg",
  "/images/photo3.jpeg",
  "/images/photo4.jpeg",
  "/images/photo5.jpeg",
  "/images/photo6.jpeg",
  "/images/photo7.jpeg",
  "/images/photo8.jpeg",
] as const;

export const WHEEL_STORAGE_KEY = "birthday-wheel-result-v4";

export type PageStep =
  | "loading"
  | "hero"
  | "letter"
  | "quiz-intro"
  | "quiz"
  | "quiz-fail"
  | "quiz-success"
  | "gallery"
  | "videos"
  | "wheel"
  | "surprise"
  | "open-when"
  | "final";

export const NAV_ITEMS: { id: PageStep; label: string; minStep: number }[] = [
  { id: "hero", label: "Home", minStep: 1 },
  { id: "letter", label: "Letter", minStep: 2 },
  { id: "quiz-intro", label: "Quiz", minStep: 3 },
  { id: "gallery", label: "Gallery", minStep: 4 },
  { id: "wheel", label: "Wheel", minStep: 5 },
  { id: "videos", label: "Videos", minStep: 6 },
  { id: "surprise", label: "Surprise", minStep: 7 },
  { id: "open-when", label: "Open When", minStep: 8 },
  { id: "final", label: "Forever", minStep: 9 },
];
