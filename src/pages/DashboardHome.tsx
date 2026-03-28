import { motion } from "framer-motion";
import { Rocket, Zap, Flame, BookOpen, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { PlayCircle, Sparkles, Clock, ArrowRight } from "lucide-react";

export default function DashboardHome() {
  const navigate = useNavigate();
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

  const { data: progressCount } = useQuery({
    queryKey: ["progress-count", user?.id],
    queryFn: async () => {
      const { count } = await supabase.from("user_progress").select("*", { count: "exact", head: true }).eq("user_id", user!.id);
      return count ?? 0;
    },
    enabled: !!user,
  });

  const stats = [
    { icon: Zap, label: t.totalXP, value: profile?.xp ?? 0, color: "text-primary" },
    { icon: Flame, label: "Streak", value: `${profile?.streak_days ?? 0} days`, color: "text-destructive" },
    { icon: BookOpen, label: "Courses", value: progressCount ?? 0, color: "text-accent" },
    { icon: Trophy, label: t.currentLevel, value: `Level ${profile?.level ?? 1}`, color: "text-secondary" },
  ];

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="vs-card p-6">
          <h1 className="text-2xl font-bold">{t.welcomeBackDash}, {profile?.full_name || "Learner"} 👋</h1>
          <p className="text-muted-foreground">{t.continueJourney}</p>
        </div>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <div className="vs-card p-5">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-muted p-2.5"><s.icon className={`h-5 w-5 ${s.color}`} /></div>
                <div>
                  <div className="text-2xl font-bold">{s.value}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          <div className="vs-card p-6 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-primary mb-2">
                <PlayCircle className="h-4 w-4" /> Current Course
              </div>
              <h3 className="text-xl font-bold mb-1">Advanced Voice Interfaces</h3>
              <p className="text-sm text-muted-foreground mb-4">Voice Development Track</p>
              
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span className="font-medium">45%</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-primary w-[45%]" />
                </div>
              </div>
            </div>
            
            <Button className="w-full justify-between group" onClick={() => navigate("/dashboard/learning")}>
              Resume: Multilingual STT
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
          <div className="vs-card p-6 h-full border-primary/20 bg-primary/5">
            <div className="flex items-center gap-2 text-sm font-medium text-primary mb-2">
              <Sparkles className="h-4 w-4" /> AI Recommended Next
            </div>
            <h3 className="text-xl font-bold mb-2">AI & ML Foundations</h3>
            <p className="text-sm text-muted-foreground mb-4">Recommended because you are excelling in Voice Development.</p>
            
            <div className="flex gap-4 text-sm font-medium mb-6">
              <span className="flex items-center gap-1 text-green-600 dark:text-green-400">
                <Trophy className="h-4 w-4" /> 98% Match
              </span>
              <span className="flex items-center gap-1 text-muted-foreground">
                <Clock className="h-4 w-4" /> 4 hours
              </span>
            </div>
            
            <Button variant="outline" className="w-full border-primary/20 hover:bg-primary/10" onClick={() => navigate("/dashboard/learning")}>
              View Course Details
            </Button>
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <div className="rounded-2xl p-8 vs-gradient-hero">
          <div className="flex items-start gap-3">
            <Rocket className="h-7 w-7 text-primary-foreground" />
            <div>
              <h2 className="text-xl font-bold text-primary-foreground">{t.startLearning}</h2>
              <p className="mt-1 text-primary-foreground/80">{t.aiGenerate}</p>
            </div>
          </div>
          <Button variant="outline" className="mt-6 bg-card/90 hover:bg-card border-0 font-semibold" onClick={() => navigate("/dashboard/learning")}>
            {t.startLearning}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
