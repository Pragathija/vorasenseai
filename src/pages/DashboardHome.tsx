import { motion } from "framer-motion";
import { Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

export default function DashboardHome() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="vs-card p-6">
          <h1 className="text-2xl font-bold">{t.welcomeBackDash} 👋</h1>
          <p className="text-muted-foreground">{t.continueJourney}</p>
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <div className="rounded-2xl p-8 vs-gradient-hero">
          <div className="flex items-start gap-3">
            <Rocket className="h-7 w-7 text-primary-foreground" />
            <div>
              <h2 className="text-xl font-bold text-primary-foreground">{t.startLearning}</h2>
              <p className="mt-1 text-primary-foreground/80">{t.aiGenerate}</p>
            </div>
          </div>
          <Button variant="outline" className="mt-6 bg-card/90 hover:bg-card border-0 text-primary font-semibold" onClick={() => navigate("/dashboard/learning")}>
            {t.startLearning}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
