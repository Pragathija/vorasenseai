import { motion } from "framer-motion";
import { Users, BookOpen, TrendingDown, Target, TrendingUp, Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const statCards = [
  { icon: Users, label: "Enrolled Students", value: "0", change: "+0%", up: true, bgClass: "from-vs-cyan/20 to-vs-blue/20", yesterday: 0, today: 0 },
  { icon: BookOpen, label: "Average Mark", value: "0", change: "+0%", up: true, bgClass: "from-vs-blue/20 to-vs-purple/20", yesterday: 0, today: 0 },
  { icon: TrendingDown, label: "Underperforming", value: "0", change: "0%", up: false, bgClass: "from-vs-purple/20 to-vs-pink/20", yesterday: 0, today: 0 },
  { icon: Target, label: "Avg Quiz Score", value: "0", change: "+0%", up: true, bgClass: "from-vs-cyan/20 to-vs-cyan/10", yesterday: 0, today: 0 },
];

const weeklyProgress = [
  { label: "Module Completion", value: 0 },
  { label: "Quiz Scores", value: 0 },
  { label: "Practice Hours", value: 0 },
];

const monthlyTargets = [
  { label: "Course Progress", value: 0 },
  { label: "Assignment Completion", value: 0 },
  { label: "Voice Sessions", value: 0 },
];

export default function Analytics() {
  return (
    <div className="space-y-8">
      {/* Stat cards */}
      <div className="grid gap-4 md:grid-cols-4">
        {statCards.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`vs-card overflow-hidden`}
          >
            <div className={`bg-gradient-to-br ${s.bgClass} p-5`}>
              <div className="flex items-start justify-between">
                <div className="rounded-xl bg-card/50 p-2">
                  <s.icon className="h-5 w-5 text-foreground/70" />
                </div>
                <Badge variant="outline" className={`text-xs ${s.up ? "text-green-600" : "text-destructive"}`}>
                  {s.up ? <TrendingUp className="mr-1 h-3 w-3" /> : <TrendingDown className="mr-1 h-3 w-3" />}
                  {s.change}
                </Badge>
              </div>
              <div className="mt-4">
                <div className="text-3xl font-bold">{s.value}</div>
                <div className="text-sm text-muted-foreground">{s.label}</div>
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                <span>Yesterday: {s.yesterday}</span>
                <span>Today: {s.today}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Course Info */}
      <div className="vs-card p-6">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold">Learning Overview</h2>
          <Badge variant="outline">New User</Badge>
        </div>
      </div>

      {/* Progress sections */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="vs-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Weekly Progress</h3>
          </div>
          <div className="space-y-5">
            {weeklyProgress.map((p) => (
              <div key={p.label}>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <span>{p.label}</span>
                  <span className="font-medium">{p.value}%</span>
                </div>
                <Progress value={p.value} className="h-2" />
              </div>
            ))}
          </div>
        </div>

        <div className="vs-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="h-5 w-5 text-vs-purple" />
            <h3 className="font-semibold">Monthly Targets</h3>
          </div>
          <div className="space-y-5">
            {monthlyTargets.map((p) => (
              <div key={p.label}>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <span>{p.label}</span>
                  <span className="font-medium">{p.value}%</span>
                </div>
                <Progress value={p.value} className="h-2" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance chart placeholder */}
      <div className="vs-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Daily Performance Trend</h3>
        </div>
        <div className="flex h-48 items-center justify-center rounded-lg bg-muted/30 text-muted-foreground">
          Start learning to see your performance trends here
        </div>
      </div>
    </div>
  );
}
