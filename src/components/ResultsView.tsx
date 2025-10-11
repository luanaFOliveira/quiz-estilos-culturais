import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";

interface ResultsViewProps {
  results: Record<string, number>;
  onReset: () => void;
}

const dimensions = [
  "Inovação",
  "Colaboração", 
  "Liderança",
  "Comunicação",
  "Adaptabilidade",
  "Resultados",
  "Desenvolvimento",
  "Valores"
];

export const ResultsView = ({ results, onReset }: ResultsViewProps) => {
  // Calculate scores for each dimension (8 dimensions, 4 questions each)
  const calculateDimensionScores = () => {
    const scores: Record<string, number> = {};
    const questionsPerDimension = 4;
    
    dimensions.forEach((dimension, index) => {
      let total = 0;
      for (let i = 0; i < questionsPerDimension; i++) {
        const questionIndex = index * questionsPerDimension + i + 1;
        const answerValue = results[questionIndex.toString()];
        total += answerValue || 0;
      }
      // Convert to 1-4 scale (average and scale down)
      scores[dimension] = Math.min(4, Math.max(1, Math.round((total / questionsPerDimension) * 0.8)));
    });
    
    return scores;
  };

  const dimensionScores = calculateDimensionScores();
  
  const chartData = dimensions.map(dimension => ({
    dimension,
    score: dimensionScores[dimension]
  }));

  const getResultDescription = () => {
    const avgScore = Object.values(dimensionScores).reduce((a, b) => a + b, 0) / dimensions.length;
    
    if (avgScore >= 3.5) {
      return "Cultura Organizacional Excelente: Sua organização demonstra uma cultura forte e bem estabelecida, com altos níveis de engajamento, inovação e colaboração em todas as dimensões avaliadas.";
    } else if (avgScore >= 2.5) {
      return "Cultura Organizacional Sólida: Sua organização possui uma cultura positiva com boas práticas estabelecidas. Existem oportunidades de crescimento em algumas áreas específicas.";
    } else if (avgScore >= 1.5) {
      return "Cultura em Desenvolvimento: Sua organização está construindo sua cultura. Há espaço significativo para melhorias em várias dimensões para fortalecer o ambiente organizacional.";
    } else {
      return "Cultura Organizacional em Formação: Sua organização está nos estágios iniciais de desenvolvimento cultural. Foco estratégico é necessário para estabelecer práticas e valores fundamentais.";
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">
          <span className="text-accent">ID</span> <span className="text-glow">da CULTURA</span>
        </h1>
        <p className="text-muted-foreground text-sm">Seus Resultados</p>
      </div>

      <Card className="card-glass p-6 md:p-8">
        <h2 className="text-xl md:text-2xl font-bold mb-4 text-accent">Análise da Cultura</h2>
        <p className="text-foreground leading-relaxed text-sm md:text-base">
          {getResultDescription()}
        </p>
      </Card>

      <Card className="card-glass p-6 md:p-8">
        <h2 className="text-xl md:text-2xl font-bold mb-6 text-accent">Gráfico de Dimensões</h2>
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart data={chartData}>
            <PolarGrid stroke="rgba(168, 255, 96, 0.2)" />
            <PolarAngleAxis 
              dataKey="dimension" 
              tick={{ fill: '#fff', fontSize: 12 }}
            />
            <PolarRadiusAxis 
              angle={90} 
              domain={[0, 4]} 
              tick={{ fill: '#a8ff60' }}
            />
            <Radar
              name="Score"
              dataKey="score"
              stroke="#a8ff60"
              fill="#a8ff60"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ResponsiveContainer>
        
        <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
          {dimensions.map((dimension) => (
            <div key={dimension} className="flex justify-between items-center bg-secondary/30 p-2 rounded">
              <span>{dimension}</span>
              <span className="text-accent font-bold">{dimensionScores[dimension]}/4</span>
            </div>
          ))}
        </div>
      </Card>

      <Button 
        onClick={onReset}
        className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg py-6"
      >
        Realizar Novo Diagnóstico
      </Button>
    </div>
  );
};
