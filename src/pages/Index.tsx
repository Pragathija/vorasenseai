import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Star, Mic, Brain, BarChart3, Globe, Shield, Users } from "lucide-react";
import brainLogo from "@/assets/brain-logo.png";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Index() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const stats = [
    { value: "10K+", label: t.activeLearners },
    { value: "98%", label: t.accessibilityScore },
    { value: "50+", label: t.voiceCommands },
    { value: "4.9★", label: t.userRating },
  ];

  const features = [
    { icon: Mic, title: t.voiceFirst, desc: t.voiceFirstDesc },
    { icon: Brain, title: t.adaptiveAI, desc: t.adaptiveAIDesc },
    { icon: BarChart3, title: t.smartAnalytics, desc: t.smartAnalyticsDesc },
    { icon: Globe, title: t.multilingualSupport, desc: t.multilingualDesc },
    { icon: Shield, title: t.accessibleDesign, desc: t.accessibleDesc },
    { icon: Users, title: t.globalLeaderboard, desc: t.globalLeaderboardDesc },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="relative overflow-hidden pb-20 pt-24">
        <div className="absolute inset-0 opacity-[0.03]" style={{ background: "var(--gradient-primary)" }} />
        <div className="container text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
              <Star className="h-4 w-4" /> {t.heroBadge}
            </div>
            <h1 className="mx-auto max-w-4xl text-5xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl">
              <span className="vs-gradient-text">{t.heroTitle1}</span><br />
              <span className="vs-gradient-text">{t.heroTitle2}</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">{t.heroDesc}</p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Button size="lg" className="vs-gradient-hero border-0 text-primary-foreground gap-2 px-8 text-base" onClick={() => navigate("/register")}>
                {t.getStarted} <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="text-base" onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}>
                {t.seeHow}
              </Button>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.3 }} className="mx-auto mt-16 max-w-md">
            <img src={brainLogo} alt="VoraSense AI Brain" className="w-full animate-brain-glow" />
          </motion.div>
        </div>
      </section>
      <section className="border-y border-border/50 bg-card py-12">
        <div className="container grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
              <div className="text-3xl font-bold vs-gradient-text">{s.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>
      <section id="features" className="py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">{t.whyVoraSense}</h2>
            <p className="mt-3 text-muted-foreground">{t.whyDesc}</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="vs-card p-6 hover:shadow-lg transition-shadow">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <f.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        © 2026 VoraSense. Adaptive Voice Learning Platform.
      </footer>
    </div>
  );
}
