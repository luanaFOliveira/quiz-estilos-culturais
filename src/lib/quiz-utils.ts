import { Question } from "@/pages/Index"; // Assuming Question interface is in Index.tsx

export const calculateDimensionScores = (
  results: Record<string, number>,
  dimensions: string[],
  questions: Question[]
) => {
  const scores: Record<string, number> = {};
  const counts: Record<string, number> = {};

  questions.forEach((q, idx) => {
    const questionNumber = idx + 1;
    const answerValue = results[questionNumber.toString()] || 0;
    scores[q.dimension] = (scores[q.dimension] || 0) + answerValue;
    counts[q.dimension] = (counts[q.dimension] || 0) + 1;
  });

  dimensions.forEach((dimension) => {
    const total = scores[dimension] || 0;
    const count = counts[dimension] || 1;
    const average = total / count;
    const rounded = Math.round(average);
    scores[dimension] = Math.min(5, Math.max(1, rounded)); 
  });

  return scores;
};

export const getAverageScore = (dimensionScores: Record<string, number>, dimensions: string[]) => {
  const avgScore = Object.values(dimensionScores).reduce((a, b) => a + b, 0) / dimensions.length;
  return avgScore;
};

export const getResultDescription = (avgScore: number) => {
  if (avgScore >= 4.0) { 
    return "Cultura Organizacional Excelente: Sua organização demonstra uma cultura forte e bem estabelecida, com altos níveis de engajamento, inovação e colaboração em todas as dimensões avaliadas.";
  } else if (avgScore >= 3.0) {
    return "Cultura Organizacional Sólida: Sua organização possui uma cultura positiva com boas práticas estabelecidas. Existem oportunidades de crescimento em algumas áreas específicas.";
  } else if (avgScore >= 2.0) {
    return "Cultura em Desenvolvimento: Sua organização está construindo sua cultura. Há espaço significativo para melhorias em várias dimensões para fortalecer o ambiente organizacional.";
  } else {
    return "Cultura Organizacional em Formação: Sua organização está nos estágios iniciais de desenvolvimento cultural. Foco estratégico é necessário para estabelecer práticas e valores fundamentais.";
  }
};
