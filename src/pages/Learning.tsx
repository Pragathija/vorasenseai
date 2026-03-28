import { motion } from "framer-motion";
import { BookOpen, Zap, Clock, Brain as BrainIcon, Mic, Rocket, Award, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useState } from "react";

export default function Learning() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [activeTrack, setActiveTrack] = useState("foundation");

  const { data: profile } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: async () => {
      const { data } = await supabase.from("profiles").select("*").eq("id", user!.id).single();
      return data;
    },
    enabled: !!user,
  });

  const { data: courses = [] } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const { data } = await supabase.from("courses").select("*").order("sort_order");
      return data ?? [];
    },
  });

  const { data: progress = [] } = useQuery({
    queryKey: ["user-progress", user?.id],
    queryFn: async () => {
      const { data } = await supabase.from("user_progress").select("*").eq("user_id", user!.id);
      return data ?? [];
    },
    enabled: !!user,
  });

  const startCourse = useMutation({
    mutationFn: async (courseId: string) => {
      const { error } = await supabase.from("user_progress").insert({
        user_id: user!.id,
        course_id: courseId,
        status: "in_progress",
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-progress"] });
      toast.success("Course started!");
    },
  });

  const tracks = [
    { icon: BookOpen, title: t.foundationTrack, key: "foundation", emoji: "📕" },
    { icon: BrainIcon, title: t.dsaTrack, key: "dsa", emoji: "⚡" },
    { icon: Mic, title: t.voiceDev, key: "voice", emoji: "🔧" },
    { icon: Rocket, title: t.advancedTrack, key: "advanced", emoji: "🚀" },
  ];

  const filteredCourses = courses.filter((c: any) => c.track === activeTrack);

  const getStatus = (courseId: string) => {
    const p = progress.find((p: any) => p.course_id === courseId);
    return p?.status || "not_started";
  };

  const statusConfig: Record<string, { label: string; color: string; emoji: string }> = {
    completed: { label: "Completed", color: "bg-green-500/20 text-green-400", emoji: "🏆" },
    in_progress: { label: "In Progress", color: "bg-accent/20 text-accent", emoji: "📖" },
    not_started: { label: "Start", color: "bg-muted text-muted-foreground", emoji: "🚀" },
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">{t.yourLearning} <span className="vs-gradient-text">{t.journey}</span></h1>
          <p className="text-muted-foreground">{t.masterSkills}</p>
        </div>
        <div className="flex gap-3">
          {[
            { icon: Zap, value: profile?.xp ?? 0, label: t.totalXP, color: "text-primary" },
            { icon: Award, value: `Level ${profile?.level ?? 1}`, label: t.currentLevel, color: "text-secondary" },
            { icon: Clock, value: `${Math.round((profile?.total_learning_minutes ?? 0) / 60)}h`, label: t.learningTime, color: "text-accent" },
            { icon: CheckCircle, value: progress.filter((p: any) => p.status === "completed").length, label: t.achievements, color: "text-primary" },
          ].map((s, i) => (
            <div key={i} className="vs-card flex items-center gap-3 px-4 py-3">
              <s.icon className={`h-5 w-5 ${s.color}`} />
              <div>
                <div className={`text-lg font-bold ${s.color}`}>{s.value}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-semibold">{t.chooseTrack}</h2>
        <div className="grid gap-4 md:grid-cols-4">
          {tracks.map((tr) => (
            <motion.button key={tr.key} whileHover={{ scale: 1.02 }} onClick={() => setActiveTrack(tr.key)} className={`vs-card p-5 text-left transition-all ${tr.key === activeTrack ? "ring-2 ring-primary vs-gradient-hero" : ""}`}>
              <tr.icon className={`mb-2 h-8 w-8 ${tr.key === activeTrack ? "text-primary-foreground" : ""}`} />
              <div className={`flex items-center gap-1 text-sm font-bold ${tr.key === activeTrack ? "text-primary-foreground" : ""}`}>{tr.emoji} {tr.title}</div>
            </motion.button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filteredCourses.map((c: any, i: number) => {
          const status = getStatus(c.id);
          const st = statusConfig[status];
          return (
            <motion.div key={c.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="vs-card flex items-center justify-between p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-muted text-2xl">{st.emoji}</div>
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-primary">{c.title}</h3>
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${st.color}`}>{st.label}</span>
                  </div>
                  <p className="mt-0.5 text-sm text-muted-foreground">{c.description}</p>
                  <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {c.hours}h</span>
                    <span className="flex items-center gap-1"><BookOpen className="h-3 w-3" /> {c.lessons_count} lessons</span>
                    <span className="flex items-center gap-1"><BrainIcon className="h-3 w-3" /> {c.quizzes_count} quizzes</span>
                    <span className="flex items-center gap-1"><Zap className="h-3 w-3" /> {c.xp_reward} XP</span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {(c.tags || []).map((tag: string) => <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>)}
                  </div>
                </div>
              </div>
              <Button
                className={status === "not_started" ? "vs-gradient-hero border-0 text-primary-foreground" : ""}
                variant={status === "not_started" ? "default" : "outline"}
                onClick={() => status === "not_started" && startCourse.mutate(c.id)}
                disabled={startCourse.isPending}
              >
                {status === "completed" ? "Review →" : status === "in_progress" ? "Continue →" : "Start →"}
              </Button>
            </motion.div>
          );
        })}
        {filteredCourses.length === 0 && (
          <div className="vs-card p-12 text-center text-muted-foreground">No courses in this track yet.</div>
        )}
      </div>
    </div>
  );
}
