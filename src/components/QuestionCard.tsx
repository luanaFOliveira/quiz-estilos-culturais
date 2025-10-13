import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface QuestionCardProps {
  question: string;
  questionNumber: number;
  value: string;
  onValueChange: (value: string) => void;
}

const options = [
  { value: "1", label: "Discordo Totalmente" },
  { value: "2", label: "Discordo" },
  { value: "3", label: "Concordo" },
  { value: "4", label: "Concordo Totalmente" },
];

export const QuestionCard = ({ question, questionNumber, value, onValueChange }: QuestionCardProps) => {
  return (
    <Card className="card-glass p-4 md:p-6 mb-4">
      <div className="mb-4">
        <span className="text-accent font-bold text-sm">Pergunta {questionNumber}</span>
        <h3 className="text-foreground text-base md:text-lg font-medium mt-1">{question}</h3>
      </div>
      
      <RadioGroup value={value} onValueChange={onValueChange} className="space-y-2">
        {options.map((option) => (
          <div key={option.value} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/20 transition-colors">
            <RadioGroupItem 
              value={option.value} 
              id={`q${questionNumber}-${option.value}`}
              className="border-accent data-[state=checked]:bg-accent data-[state=checked]:border-accent"
            />
            <Label 
              htmlFor={`q${questionNumber}-${option.value}`}
              className="text-sm md:text-base cursor-pointer flex-1"
            >
              {option.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </Card>
  );
};
