import { motion } from "framer-motion";
import { BookOpen, Zap, Clock, Brain as BrainIcon, Mic, Rocket, Award, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Learning() {
  const { t } = useLanguage();

  const tracks = [
    { icon: BookOpen, title: t.foundationTrack, desc: "Core concepts for beginners", active: true, emoji: "📕" },
    { icon: BrainIcon, title: t.dsaTrack, desc: "Data Structures & Algorithms", active: false, emoji: "⚡" },
    { icon: Mic, title: t.voiceDev, desc: "Voice-enabled applications", active: false, emoji: "🔧" },
    { icon: Rocket, title: t.advancedTrack, desc: "System design & architecture", active: false, emoji: "🚀" },
  ];

  const courses = [
    { title: "Programming Fundamentals", desc: "Master variables, data types, and basic syntax", hours: 2, lessons: 5, quizzes: 2, xp: 150, tags: ["Variables", "Data Types", "Operators"], status: "completed" },
    { title: "Control Flow Mastery", desc: "Loops, conditionals, and decision making", hours: 3, lessons: 6, quizzes: 3, xp: 200, tags: ["If-Else", "Loops", "Switch"], status: "excellent" },
    { title: "Functions & Modularity", desc: "Build reusable and modular code", hours: 2.5, lessons: 4, quizzes: 2, xp: 175, tags: ["Functions", "Scope", "Parameters"], status: "in-progress" },
    { title: "Arrays & Collections", desc: "Work with data collections", hours: 4, lessons: 8, quizzes: 4, xp: 300, tags: ["Arrays", "Lists", "Sorting"], status: "locked" },
  ];

  const statusConfig: Record<string, { label: string; color: string; emoji: string }> = {
    completed: { label: "Completed", color: "bg-green-100 text-green-700", emoji: "🏆" },
    excellent: { label: "Excellent", color: "bg-yellow-100 text-yellow-700", emoji: "⭐" },
    "in-progress": { label: "In Progress", color: "bg-blue-100 text-blue-700", emoji: "📖" },
    locked: { label: "Locked", color: "bg-muted text-muted-foreground", emoji: "🔒" },
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
            { icon: Zap, value: "0", label: t.totalXP, color: "text-vs-cyan" },
            { icon: Award, value: "Level 1", label: t.currentLevel, color: "text-vs-purple" },
            { icon: Clock, value: "0h", label: t.learningTime, color: "text-vs-blue" },
            { icon: CheckCircle, value: "0", label: t.achievements, color: "text-vs-pink" },
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
          {tracks.map((tr, i) => (
            <motion.button key={i} whileHover={{ scale: 1.02 }} className={`vs-card p-5 text-left transition-all ${tr.active ? "ring-2 ring-primary vs-gradient-hero text-primary-foreground" : ""}`}>
              <tr.icon className="mb-2 h-8 w-8" />
              <div className="flex items-center gap-1 text-sm font-bold">{tr.emoji} {tr.title}</div>
              <p className={`mt-1 text-xs ${tr.active ? "text-primary-foreground/80" : "text-muted-foreground"}`}>{tr.desc}</p>
            </motion.button>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        {courses.map((c, i) => {
          const st = statusConfig[c.status];
          return (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className={`vs-card flex items-center justify-between p-6 ${c.status === "locked" ? "opacity-60" : ""}`}>
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-2xl">{st.emoji}</div>
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-primary">{c.title}</h3>
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${st.color}`}>{st.emoji} {st.label}</span>
                  </div>
                  <p className="mt-0.5 text-sm text-muted-foreground">{c.desc}</p>
                  <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {c.hours}h</span>
                    <span className="flex items-center gap-1"><BookOpen className="h-3 w-3" /> {c.lessons} lessons</span>
                    <span className="flex items-center gap-1"><BrainIcon className="h-3 w-3" /> {c.quizzes} quizzes</span>
                    <span className="flex items-center gap-1"><Zap className="h-3 w-3" /> {c.xp} XP</span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {c.tags.map((tag) => <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>)}
                  </div>
                </div>
              </div>
              <Button variant={c.status === "locked" ? "outline" : "default"} className={c.status !== "locked" ? "vs-gradient-hero border-0 text-primary-foreground" : ""} disabled={c.status === "locked"}>
                {c.status === "completed" || c.status === "excellent" ? "Review →" : c.status === "in-progress" ? "Continue →" : "Locked"}
              </Button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
