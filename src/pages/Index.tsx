import { useState } from "react";
import { Button } from "@/components/ui/button";
import { QuestionCard } from "@/components/QuestionCard";
import { ResultsView } from "@/components/ResultsView";
import { UserInfoForm, type UserInfo } from "@/components/UserInfoForm";
import { toast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";


export const dimensions = [
  "Acolhimento",
  "Aprendizado", 
  "Autoridade",
  "Ordem",
  "Prazer",
  "Propósito",
  "Resultado",
  "Segurança",
];

export interface Question {
  text: string;
  dimension: string;
}



export const questions: Question[] = [
  //1
  { text: "Nós focamos em Colaboração e Confiança Mútua: aqui nós trabalhamos juntos para atingir nossos objetivos, confiamos uns nos outros, tanto do ponto de vista profissional quanto pessoal, e prezamos por bons relacionamentos.", dimension: dimensions[0] },
  //2
  { text: "Nós focamos em Compaixão e Tolerância: aqui nós trabalhamos em prol de uma causa, e por isso, temos compaixão e tolerância com pessoas de dentro ou fora da empresa. Buscamos um bem maior, não apenas atingir resultados do negócio.", dimension: dimensions[5] },
  //3
  { text: "Nós focamos em Exploração e Criatividade: aqui nós ouvimos e exploramos novas ideias de forma criativa, com pensamento aberto para aprender com as experiências e diferentes pontos de vista.", dimension: dimensions[1] },
  //4
  { text: "Nós focamos em Diversão e Empolgação: aqui nós buscamos nos divertir, temos um ambiente informal e trabalhamos de forma empolgada e leve no dia a dia.", dimension: dimensions[4] },
  //5
  { text: "Nós focamos em Realização e Conquista: aqui nós somos orientados a conquista e realização de nossos objetivos e resultados. Atingir metas é nossa prioridade. ", dimension: dimensions[6] },
  //6
  { text: "Nós focamos em Força e Ousadia: aqui nós somos ousados e determinados a vencer os desafios e os riscos. Isto nos energiza e nos dá força para ir em frente.   ", dimension: dimensions[2] },
  //7
  { text: "Nós focamos em Planejamento e Precaução: aqui nós gostamos de planejar as atividades com antecedência, avaliando e se prevenindo dos riscos e evitando problemas e erros de última hora", dimension: dimensions[7] },
  //8
  { text: "Nós focamos em Estrutura e Estabilidade: aqui nós temos uma estrutura organizacional clara, processos e regras muito bem definidos, e trabalhamos de forma organizada e sincronizada. ", dimension: dimensions[3] },
  //9
  { text: "Nós nos sentimos e nos relacionamos como uma grande família: somos próximos, nos respeitamos, cuidamos e queremos o bem um do outro. ", dimension: dimensions[0] },
  //10
  { text: "Nós agimos como uma comunidade que possui uma causa idealista que nos motiva e nos une.", dimension: dimensions[5] },
  //11
  { text: "Nós nos sentimos como se estivéssemos em um projeto dinâmico, com adaptabilidade às mudanças, muitos aprendizados e tolerância ao erro. ", dimension: dimensions[1] },
  //12
  { text: "Nós nos sentimos como se estivéssemos constantemente em uma grande comemoração, trabalhamos com alegria, entusiasmo e prazer. ", dimension: dimensions[4] },
  //13
  { text: "Nós valorizamos a meritocracia, ou seja, avaliamos resultados de forma criteriosa e damos mérito ou demérito conforme os atingimentos de objetivos e metas individuais.", dimension: dimensions[6] },
  //14
  { text: "Aqui nós nos sentimos como numa arena: lutamos bravamente, queremos vencer os desafios e conquistar a vitória.", dimension: dimensions[2] },
  //15
  { text: "Aqui nós somos como uma operação meticulosamente planejada, avaliamos os dados, cenários e contextos, e evitamos erros e riscos.", dimension: dimensions[7] },
  //16
  { text: "Aqui nos sentimos como em uma máquina com todas as engrenagens bem lubrificadas. Cada pessoa sabe seu papel e trabalha de forma colaborativa e ordenada com os demais para atingir os objetivos em conjunto.", dimension: dimensions[3] },
];



const Index = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
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
      userInfo: userInfo,
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
    setUserInfo(null);
    setAnswers({});
    setShowResults(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUserInfoSubmit = (data: UserInfo) => {
    setUserInfo(data);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!userInfo) {
    return <UserInfoForm onSubmit={handleUserInfoSubmit} />;
  }

  if (showResults) {
    return (
      <div className="min-h-screen p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <ResultsView
            results={answers}
            onReset={handleReset}
            dimensions={dimensions}
            questions={questions}
          />
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
              question={question.text}
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
