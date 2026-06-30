export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Where did we first meet?",
    options: ["School", "Park", "Home", "Church"],
    correctAnswer: "Church",
  },
  {
    id: 2,
    question: "What was the first gift I ever gave you?",
    options: ["Cloth", "Shoes", "Necklace", "Flower"],
    correctAnswer: "Shoes",
  },
  {
    id: 3,
    question: "Do you know how much I love you?",
    options: ["So much", "Very Much", "Plenty much", "Plenty Uncountable Billion Dollars"],
    correctAnswer: "Plenty Uncountable Billion Dollars",
  },
  {
    id: 4,
    question: "Which part of you caught my attention first?",
    options: ["Your waist", "Your body", "Your eyes", "Your teeth"],
    correctAnswer: "Your eyes",
  },
  {
    id: 5,
    question: "If I could describe you in one word, what would it be?",
    options: ["Asa", "Trouble", "Love", "POM"],
    correctAnswer: "POM",
  },
];
