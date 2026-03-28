import { motion } from "framer-motion";
import { Rocket, Zap, Flame, BookOpen, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

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
