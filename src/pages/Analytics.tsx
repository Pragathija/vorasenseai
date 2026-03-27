import { motion } from "framer-motion";
import { Users, BookOpen, TrendingDown, Target, TrendingUp, Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Analytics() {
  const { t } = useLanguage();

  const statCards = [
    { icon: Users, label: "Enrolled Students", value: "0", change: "+0%", up: true, bgClass: "from-vs-cyan/20 to-vs-blue/20" },
    { icon: BookOpen, label: "Average Mark", value: "0", change: "+0%", up: true, bgClass: "from-vs-blue/20 to-vs-purple/20" },
    { icon: TrendingDown, label: "Underperforming", value: "0", change: "0%", up: false, bgClass: "from-vs-purple/20 to-vs-pink/20" },
    { icon: Target, label: "Avg Quiz Score", value: "0", change: "+0%", up: true, bgClass: "from-vs-cyan/20 to-vs-cyan/10" },
  ];

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-4">
        {statCards.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="vs-card overflow-hidden">
            <div className={`bg-gradient-to-br ${s.bgClass} p-5`}>
              <div className="flex items-start justify-between">
                <div className="rounded-xl bg-card/50 p-2"><s.icon className="h-5 w-5 text-foreground/70" /></div>
                <Badge variant="outline" className={`text-xs ${s.up ? "text-green-600" : "text-destructive"}`}>
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
            {[{ label: "Module Completion", value: 0 }, { label: "Quiz Scores", value: 0 }].map((p) => (
              <div key={p.label}><div className="flex items-center justify-between text-sm mb-1.5"><span>{p.label}</span><span className="font-medium">{p.value}%</span></div><Progress value={p.value} className="h-2" /></div>
            ))}
          </div>
        </div>
        <div className="vs-card p-6">
          <div className="flex items-center gap-2 mb-4"><Clock className="h-5 w-5 text-vs-purple" /><h3 className="font-semibold">{t.monthlyTargets}</h3></div>
          <div className="space-y-5">
            {[{ label: "Course Progress", value: 0 }, { label: "Assignment Completion", value: 0 }].map((p) => (
              <div key={p.label}><div className="flex items-center justify-between text-sm mb-1.5"><span>{p.label}</span><span className="font-medium">{p.value}%</span></div><Progress value={p.value} className="h-2" /></div>
            ))}
          </div>
        </div>
      </div>
      <div className="vs-card p-6">
        <div className="flex items-center gap-2 mb-4"><TrendingUp className="h-5 w-5 text-primary" /><h3 className="font-semibold">{t.dailyPerformance}</h3></div>
        <div className="flex h-48 items-center justify-center rounded-lg bg-muted/30 text-muted-foreground">{t.startLearning}</div>
      </div>
    </div>
  );
}
