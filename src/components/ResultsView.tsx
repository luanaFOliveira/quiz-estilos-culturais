import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";
import { calculateDimensionScores, getAverageScore, getResultDescription } from "@/lib/quiz-utils";

interface ResultsViewProps {
  results: Record<string, number>;
  onReset: () => void;
  dimensions: string[];
  questions: Array<{ text: string; dimension: string }>;
}


export const ResultsView = ({ results, onReset, dimensions, questions }: ResultsViewProps) => {
  const dimensionScores = calculateDimensionScores(results, dimensions, questions);
  const avgScore = getAverageScore(dimensionScores, dimensions);
  
  const chartData = dimensions.map(dimension => ({
    dimension,
    score: dimensionScores[dimension]
  }));

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">
        <img 
              src="/images/id_da_cultura_logo.png" 
              alt="ID da CULTURA Logo" 
              className="h-auto max-h-80 md:max-h-96 mx-auto"
            />
        </h1>
      </div>

      <Card className="card-glass p-6 md:p-8">
        <h2 className="text-xl md:text-2xl font-bold mb-4 text-accent">Respostas enviadas com sucesso!</h2>
        <p className="text-foreground leading-relaxed text-sm md:text-base">
          {/* {getResultDescription(avgScore)} */}
          Obrigada por enviar suas respostas para o Assessment de Estilos Culturais. Consolidaremos os resultados e entraremos em contato em breve para realizar a devolutiva com seus resultados.
        </p>
      </Card>

      {/* <Card className="card-glass p-6 md:p-8">
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
              domain={[0, 5]}
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
              <span className="text-accent font-bold">{dimensionScores[dimension]}/5</span> 
            </div>
          ))}
        </div>
      </Card> */}

      <Button 
        onClick={onReset}
        className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg py-6"
      >
        Realizar Novo Diagnóstico
      </Button>
    </div>
  );
};
