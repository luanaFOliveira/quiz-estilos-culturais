import { useState } from "react";
import { Button } from "@/components/ui/button";
import { QuestionCard } from "@/components/QuestionCard";
import { ResultsView } from "@/components/ResultsView";
import { toast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";

const questions = [
  "Nossa empresa incentiva a inovação e novas ideias",
  "Os colaboradores se sentem confortáveis em compartilhar opiniões",
  "A liderança demonstra valores claros e éticos",
  "A comunicação entre equipes é clara e eficiente",
  "Nossa empresa se adapta rapidamente a mudanças",
  "Os resultados são reconhecidos e celebrados",
  "Há oportunidades de desenvolvimento profissional",
  "Os valores da empresa são vividos no dia a dia",
  "Experimentamos novas abordagens para resolver problemas",
  "As equipes trabalham bem juntas em projetos",
  "Os líderes inspiram confiança nos colaboradores",
  "Informações importantes são compartilhadas abertamente",
  "Aceitamos bem feedback e críticas construtivas",
  "Metas são alcançadas consistentemente",
  "Investimos em treinamento e capacitação",
  "A cultura organizacional é forte e consistente",
  "Falhas são vistas como oportunidades de aprendizado",
  "A colaboração é valorizada mais que a competição",
  "Há transparência nas decisões da liderança",
  "Canais de comunicação são acessíveis a todos",
  "Mudanças organizacionais são bem gerenciadas",
  "Performance individual é avaliada de forma justa",
  "Planos de carreira são claros e acessíveis",
  "Comportamentos alinhados aos valores são recompensados",
  "Criatividade é encorajada em todas as áreas",
  "Conflitos são resolvidos de maneira construtiva",
  "Líderes são acessíveis e receptivos",
  "Reuniões são produtivas e objetivas",
  "A empresa responde bem a crises",
  "Sucessos são atribuídos ao esforço coletivo",
  "Há mentoria e coaching disponíveis",
  "A missão e visão da empresa são conhecidas por todos"
];

const Index = () => {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAnswerChange = (questionNumber: number, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionNumber.toString()]: parseInt(value)
    }));
  };

  const progress = (Object.keys(answers).length / questions.length) * 100;

  const handleSubmit = async () => {
    const unanswered = questions.length - Object.keys(answers).length;
    
    if (unanswered > 0) {
      toast({
        title: "Questionário Incompleto",
        description: `Por favor, responda todas as ${questions.length} perguntas. Faltam ${unanswered} respostas.`,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    const apiPayload = {
      timestamp: new Date().toISOString(),
      answers: answers,
      totalQuestions: questions.length,
    };

    console.log("Enviando para API:", apiPayload);
    console.log("Endpoint simulado: POST /api/questionario/submit");
    console.log("Headers:", {
      "Content-Type": "application/json",
      "Authorization": "Bearer <token-here>"
    });

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: "Questionário Enviado!",
      description: "Suas respostas foram registradas com sucesso.",
    });

    setIsSubmitting(false);
    setShowResults(true);
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (showResults) {
    return (
      <div className="min-h-screen p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <ResultsView results={answers} onReset={handleReset} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <header className="text-center mb-8">
          <div className="flex justify-between items-start mb-6">
            <div></div>
            <div className="text-right text-xs md:text-sm">
              <div className="font-bold">Pande</div>
              <div className="text-muted-foreground">The Value Driven</div>
              <div className="text-muted-foreground">Company</div>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="text-accent">ID</span> <span className="text-glow">da CULTURA</span>
          </h1>
          <p className="text-muted-foreground text-sm md:text-base mb-6">
            Diagnóstico Cultural Organizacional
          </p>
          
          <div className="mb-2">
            <Progress value={progress} className="h-2" />
          </div>
          <p className="text-xs md:text-sm text-muted-foreground">
            {Object.keys(answers).length} de {questions.length} perguntas respondidas
          </p>
        </header>

        <div className="space-y-4">
          {questions.map((question, index) => (
            <QuestionCard
              key={index}
              question={question}
              questionNumber={index + 1}
              value={answers[(index + 1).toString()]?.toString() || ""}
              onValueChange={(value) => handleAnswerChange(index + 1, value)}
            />
          ))}
        </div>

        <div className="mt-8 sticky bottom-4">
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg py-6 shadow-lg"
          >
            {isSubmitting ? "Enviando..." : "Enviar Questionário"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
