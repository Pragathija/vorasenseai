import { motion } from "framer-motion";
import { Users, BookOpen, TrendingDown, Target, TrendingUp, Clock, Zap, Trophy } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

export default function Analytics() {
  const { t } = useLanguage();
  const { user } = useAuth();

  const { data: profile } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: async () => {
      const { data } = await supabase.from("profiles").select("*").eq("id", user!.id).single();
      return data;
    },
    enabled: !!user,
  });

  const { data: progress = [] } = useQuery({
    queryKey: ["user-progress", user?.id],
    queryFn: async () => {
      const { data } = await supabase.from("user_progress").select("*").eq("user_id", user!.id);
      return data ?? [];
    },
    enabled: !!user,
  });

  const { data: quizResults = [] } = useQuery({
    queryKey: ["quiz-results", user?.id],
    queryFn: async () => {
      const { data } = await supabase.from("quiz_results").select("*").eq("user_id", user!.id);
      return data ?? [];
    },
    enabled: !!user,
  });

  const { data: courses = [] } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const { data } = await supabase.from("courses").select("*");
      return data ?? [];
    },
  });

  const completedCount = progress.filter((p: any) => p.status === "completed").length;
  const inProgressCount = progress.filter((p: any) => p.status === "in_progress").length;
  const avgQuizScore = quizResults.length > 0 ? Math.round(quizResults.reduce((s: number, q: any) => s + (q.score / q.max_score) * 100, 0) / quizResults.length) : 0;
  const courseCompletionPct = courses.length > 0 ? Math.round((completedCount / courses.length) * 100) : 0;

  const statCards = [
    { icon: BookOpen, label: "Courses Started", value: progress.length, change: `${inProgressCount} active`, up: true, bgClass: "from-primary/20 to-accent/20" },
    { icon: Trophy, label: "Completed", value: completedCount, change: `${courseCompletionPct}%`, up: true, bgClass: "from-accent/20 to-secondary/20" },
    { icon: Zap, label: "Total XP", value: profile?.xp ?? 0, change: `Level ${profile?.level ?? 1}`, up: true, bgClass: "from-secondary/20 to-primary/20" },
    { icon: Target, label: "Avg Quiz Score", value: `${avgQuizScore}%`, change: `${quizResults.length} quizzes`, up: avgQuizScore >= 50, bgClass: "from-primary/20 to-primary/10" },
  ];

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-4">
        {statCards.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="vs-card overflow-hidden">
            <div className={`bg-gradient-to-br ${s.bgClass} p-5`}>
              <div className="flex items-start justify-between">
                <div className="rounded-xl bg-card/50 p-2"><s.icon className="h-5 w-5 text-foreground/70" /></div>
                <Badge variant="outline" className={`text-xs ${s.up ? "text-green-400" : "text-destructive"}`}>
                  {s.up ? <TrendingUp className="mr-1 h-3 w-3" /> : <TrendingDown className="mr-1 h-3 w-3" />}{s.change}
                </Badge>
              </div>
              <div className="mt-4"><div className="text-3xl font-bold">{s.value}</div><div className="text-sm text-muted-foreground">{s.label}</div></div>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="vs-card p-6">
          <div className="flex items-center gap-2 mb-4"><TrendingUp className="h-5 w-5 text-primary" /><h3 className="font-semibold">{t.weeklyProgress}</h3></div>
          <div className="space-y-5">
            {[{ label: "Course Completion", value: courseCompletionPct }, { label: "Quiz Scores", value: avgQuizScore }].map((p) => (
              <div key={p.label}><div className="flex items-center justify-between text-sm mb-1.5"><span>{p.label}</span><span className="font-medium">{p.value}%</span></div><Progress value={p.value} className="h-2" /></div>
            ))}
          </div>
        </div>
        <div className="vs-card p-6">
          <div className="flex items-center gap-2 mb-4"><Clock className="h-5 w-5 text-secondary" /><h3 className="font-semibold">{t.monthlyTargets}</h3></div>
          <div className="space-y-5">
            <div><div className="flex items-center justify-between text-sm mb-1.5"><span>Learning Time</span><span className="font-medium">{Math.round((profile?.total_learning_minutes ?? 0) / 60)}h</span></div><Progress value={Math.min(100, (profile?.total_learning_minutes ?? 0) / 6)} className="h-2" /></div>
            <div><div className="flex items-center justify-between text-sm mb-1.5"><span>Streak</span><span className="font-medium">{profile?.streak_days ?? 0} days</span></div><Progress value={Math.min(100, (profile?.streak_days ?? 0) * 3.3)} className="h-2" /></div>
          </div>
        </div>
      </div>
      <div className="vs-card p-6">
        <div className="flex items-center gap-2 mb-4"><TrendingUp className="h-5 w-5 text-primary" /><h3 className="font-semibold">Recent Quiz Results</h3></div>
        {quizResults.length > 0 ? (
          <div className="space-y-3">
            {quizResults.slice(0, 5).map((q: any) => (
              <div key={q.id} className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                <span className="text-sm font-medium">{q.quiz_title}</span>
                <span className="text-sm font-bold text-primary">{q.score}/{q.max_score}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex h-32 items-center justify-center rounded-lg bg-muted/30 text-muted-foreground">No quiz results yet. {t.startLearning}!</div>
        )}
      </div>
    </div>
  );
}
