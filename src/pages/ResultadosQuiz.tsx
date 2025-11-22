import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { dimensions } from "@/pages/Index"; // Import global dimensions as fallback

interface QuizResult {
  id: string;
  name?: string; // Made optional
  email: string;
  company?: string; // Made optional
  position?: string; // Made optional
  createdAt?: string; // Add createdAt field
  result?: { // Make result itself optional
    dimensionScores?: Record<string, number>; // Made optional
    avgScore?: number;
    totalQuestions?: number;
    answers?: Record<string, number>;
  };
}

const ResultadosQuiz = () => {
  const [results, setResults] = useState<QuizResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = 'https://s2d72ne0mi.execute-api.us-east-2.amazonaws.com/quiz'; 

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: QuizResult[] = await response.json();
        setResults(data);
      } catch (err: any) {
        console.error("Error fetching quiz results:", err);
        setError(err.message || "Failed to fetch results.");
        toast({
          title: "Erro ao Carregar Resultados",
          description: "Não foi possível carregar os resultados do quiz.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [API_URL]);

  const exportToCsv = () => {
    if (results.length === 0) {
      toast({
        title: "Nenhum dado para exportar",
        description: "Não há resultados para gerar um arquivo CSV.",
        variant: "destructive",
      });
      return;
    }

    // Use dimensions from the first result or fallback to global dimensions
    const dimensionHeaders = results[0]?.result?.dimensionScores ? Object.keys(results[0].result.dimensionScores) : dimensions;
    const headers = ["ID", "Nome", "Email", "Empresa", "Cargo", "Média", "Data Criação", ...dimensionHeaders]; // Added "Data Criação"
    const csvRows = [];
    csvRows.push(headers.join(";"));

    results.forEach(result => {
      const rowData = [
        result.id,
        result.name || "-", // Provide default for optional fields
        result.email,
        result.company || "-", // Provide default for optional fields
        result.position || "-", // Provide default for optional fields
        result.result && typeof result.result.avgScore === 'number' ? result.result.avgScore.toFixed(1) : "-", // Handle optional result and avgScore with type check
        result.createdAt || "-", // Add createdAt to CSV row
        ...dimensionHeaders.map(dim => result.result?.dimensionScores && typeof result.result.dimensionScores[dim] === 'number' ? result.result.dimensionScores[dim].toFixed(1) : "-") // Handle optional result and dimensionScores with type check
      ];
      csvRows.push(rowData.join(";"));
    });

    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'resultados_quiz.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast({
      title: "Exportado para CSV",
      description: "Os resultados foram exportados para resultados_quiz.csv.",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen p-4 md:p-8 flex items-center justify-center">
        <p className="text-xl text-muted-foreground">Carregando resultados...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-4 md:p-8 flex items-center justify-center">
        <Card className="card-glass p-6 text-center">
          <p className="text-xl text-destructive">Erro: {error}</p>
          <Button onClick={() => window.location.reload()} className="mt-4">Tentar Novamente</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-accent text-center">
          Resultados do Quiz
        </h1>

        <div className="mb-4 flex justify-end">
          <Button onClick={exportToCsv} disabled={results.length === 0}>
            Exportar para CSV
          </Button>
        </div>

        {results.length === 0 ? (
          <Card className="card-glass p-6 text-center">
            <p className="text-xl text-muted-foreground">Nenhum resultado de quiz encontrado.</p>
          </Card>
        ) : (
          <div className="overflow-x-auto rounded-lg shadow-lg card-glass">
            <table className="min-w-full divide-y divide-accent/20">
              <thead className="bg-accent/10">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-accent uppercase tracking-wider">Nome</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-accent uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-accent uppercase tracking-wider">Empresa</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-accent uppercase tracking-wider">Cargo</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-accent uppercase tracking-wider">Média</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-accent uppercase tracking-wider">Data Criação</th> 
                  {(results[0]?.result?.dimensionScores ? Object.keys(results[0].result.dimensionScores) : dimensions).map(dim => (
                    <th key={dim} className="px-6 py-3 text-left text-xs font-medium text-accent uppercase tracking-wider">{dim}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-accent/20">
                {results.map((result) => (
                  <tr key={result.id} className="hover:bg-accent/5 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">{result.name || "-"}</td> 
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">{result.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">{result.company || "-"}</td> 
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">{result.position || "-"}</td> 
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground font-medium">{result.result && typeof result.result.avgScore === 'number' ? result.result.avgScore.toFixed(1) : "-"}</td> 
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">{result.createdAt || "-"}</td> {/* New data cell */}
                    {(results[0]?.result?.dimensionScores ? Object.keys(results[0].result.dimensionScores) : dimensions).map((dim, index) => (
                      <td key={index} className="px-6 py-4 whitespace-nowrap text-sm text-foreground">{result.result?.dimensionScores && typeof result.result.dimensionScores[dim] === 'number' ? result.result.dimensionScores[dim].toFixed(1) : "-"}</td> 
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultadosQuiz;
