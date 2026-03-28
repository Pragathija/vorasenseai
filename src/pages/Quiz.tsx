import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { streamChat } from "@/services/aiChat";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Brain, ArrowLeft, CheckCircle2, XCircle, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

type QuizQuestion = { q: string; options: string[]; answerIndex: number; explanation: string };

export default function Quiz() {
  const { topic } = useParams();
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const { user } = useAuth();
  
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [isGenerating, setIsGenerating] = useState(true);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    generateQuiz();
  }, [topic]);

  const generateQuiz = async () => {
    setIsGenerating(true);
    setQuestions([]);
    setCurrentIdx(0);
    setScore(0);
    setIsFinished(false);

    let rawJson = "";
    const prompt = `Generate a 3-question multiple choice educational quiz in valid JSON format about "${topic}". The JSON format must be an array of objects: [{"q": "Question text?", "options": ["A", "B", "C", "D"], "answerIndex": 0, "explanation": "Why"}]. Do NOT output anything else except the JSON array.`;

    await streamChat({
      messages: [{ role: "user", content: prompt }],
      language,
      onDelta: (chunk) => { rawJson += chunk; },
      onDone: () => {
        try {
          const parsed = JSON.parse(rawJson.replace(/```json/g, "").replace(/```/g, "").trim());
          if (Array.isArray(parsed) && parsed.length > 0) {
            setQuestions(parsed);
          } else {
            toast.error("Failed to parse quiz format");
            navigate("/dashboard/learning");
          }
        } catch (e) {
          toast.error("AI returned invalid markup for quiz.");
          navigate("/dashboard/learning");
        }
        setIsGenerating(false);
      },
      onError: () => {
        toast.error("Failed to generate quiz.");
        navigate("/dashboard/learning");
      }
    });
  };

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === questions[currentIdx].answerIndex) {
      setScore(s => s + 1);
    }
  };

  const handleNext = async () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(i => i + 1);
      setSelected(null);
    } else {
      setIsFinished(true);
      if (user) {
        // Fetch any course to associate with this dynamic quiz to satisfy FK constraint
        const { data: course } = await supabase.from("courses").select("id").limit(1).single();
        if (course) {
          await supabase.from("quiz_results").insert({
            user_id: user.id,
            course_id: course.id,
            quiz_title: `Quiz: ${topic}`,
            score: score + (selected === questions[currentIdx].answerIndex ? 1 : 0),
            max_score: questions.length
          });
          toast.success("Quiz results saved!");
        } else {
          toast.success("Quiz finished!");
        }
      }
    }
  };

  if (isGenerating) {
    return (
      <div className="flex h-[calc(100vh-100px)] flex-col items-center justify-center">
        <RefreshCw className="h-12 w-12 animate-spin text-primary mb-4" />
        <h2 className="text-xl font-bold">Generating AI Quiz...</h2>
        <p className="text-muted-foreground mt-2">Crafting adaptive questions on {topic}</p>
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="flex h-[calc(100vh-100px)] flex-col items-center justify-center">
        <Brain className="h-16 w-16 text-primary mb-6" />
        <h1 className="text-3xl font-bold mb-2">Quiz Complete!</h1>
        <p className="text-xl mb-8">You scored {score} out of {questions.length}</p>
        <div className="flex gap-4">
          <Button variant="outline" onClick={() => navigate("/dashboard/learning")}>Back to Courses</Button>
          <Button onClick={generateQuiz} className="vs-gradient-hero">Retake Quiz</Button>
        </div>
      </div>
    );
  }

  const q = questions[currentIdx];
  if (!q) return null;

  const isCorrect = selected === q.answerIndex;

  return (
    <div className="max-w-2xl mx-auto space-y-8 pt-8">
      <Button variant="ghost" className="mb-4" onClick={() => navigate("/dashboard/learning")}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>

      <div className="flex justify-between items-center text-sm font-medium text-muted-foreground">
        <span>Question {currentIdx + 1} of {questions.length}</span>
        <span>Score: {score}</span>
      </div>
      
      <div className="h-2 rounded-full bg-muted overflow-hidden">
        <div className="h-full vs-gradient-hero transition-all duration-500" style={{ width: `${((currentIdx) / questions.length) * 100}%` }} />
      </div>

      <h2 className="text-2xl font-bold">{q.q}</h2>

      <div className="grid gap-3">
        {q.options.map((opt, i) => {
          let stateClass = "border-border hover:bg-muted/50 text-foreground";
          if (selected !== null) {
            if (i === q.answerIndex) stateClass = "border-green-500 bg-green-500/10 text-green-700 dark:text-green-400";
            else if (i === selected) stateClass = "border-destructive bg-destructive/10 text-destructive";
            else stateClass = "border-border opacity-50";
          }

          return (
            <button
              key={i}
              disabled={selected !== null}
              onClick={() => handleSelect(i)}
              className={`flex items-center justify-between w-full p-4 rounded-xl border-2 transition-all ${stateClass} text-left font-medium`}
            >
              {opt}
              {selected !== null && i === q.answerIndex && <CheckCircle2 className="h-5 w-5 text-green-500" />}
              {selected === i && i !== q.answerIndex && <XCircle className="h-5 w-5 text-destructive" />}
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {selected !== null && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`p-4 rounded-xl ${isCorrect ? 'bg-green-500/10 text-green-800 dark:text-green-300' : 'bg-orange-500/10 text-orange-800 dark:text-orange-300'}`}>
            <p className="font-semibold mb-1">{isCorrect ? 'Correct!' : 'Incorrect.'}</p>
            <p className="text-sm">{q.explanation}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-end pt-4">
        <Button size="lg" disabled={selected === null} className="vs-gradient-hero" onClick={handleNext}>
          {currentIdx < questions.length - 1 ? "Next Question" : "Finish Quiz"}
        </Button>
      </div>
    </div>
  );
}
