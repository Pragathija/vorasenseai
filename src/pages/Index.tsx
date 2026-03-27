import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Star, Mic, Brain, BarChart3, Globe, Shield, Users } from "lucide-react";
import brainLogo from "@/assets/brain-logo.png";

const stats = [
  { value: "10K+", label: "Active Learners" },
  { value: "98%", label: "Accessibility Score" },
  { value: "50+", label: "Voice Commands" },
  { value: "4.9★", label: "User Rating" },
];

const features = [
  { icon: Mic, title: "Voice-First Learning", desc: "Learn through natural voice interactions with AI-powered tutoring." },
  { icon: Brain, title: "Adaptive AI Engine", desc: "ML models detect confusion and adapt content difficulty in real-time." },
  { icon: BarChart3, title: "Smart Analytics", desc: "Track progress with cognitive scoring and personalized insights." },
  { icon: Globe, title: "Multilingual Support", desc: "Learn in 8+ languages with real-time voice translation." },
  { icon: Shield, title: "Accessible by Design", desc: "Built for visually impaired and differently-abled students." },
  { icon: Users, title: "Global Leaderboard", desc: "Compete nationwide and worldwide with fellow learners." },
];

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden pb-20 pt-24">
        <div className="absolute inset-0 opacity-[0.03]" style={{ background: "var(--gradient-primary)" }} />

        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
              <Star className="h-4 w-4" /> AI-Powered Inclusive Learning
            </div>

            <h1 className="mx-auto max-w-4xl text-5xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl">
              <span className="vs-gradient-text">Adaptive Voice</span>
              <br />
              <span className="vs-gradient-text">Learning Platform</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              An AI-powered educational platform designed for inclusive learning — leveraging advanced voice recognition and adaptive algorithms to create personalized experiences for visually impaired and differently-abled students.
            </p>

            <div className="mt-10 flex items-center justify-center gap-4">
              <Button
                size="lg"
                className="vs-gradient-hero border-0 text-primary-foreground gap-2 px-8 text-base"
                onClick={() => navigate("/register")}
              >
                Get Started Free <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="text-base" onClick={() => {
                document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
              }}>
                See How It Works
              </Button>
            </div>
          </motion.div>

          {/* Brain illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mx-auto mt-16 max-w-md"
          >
            <img src={brainLogo} alt="VoraSense AI Brain" className="w-full animate-brain-glow" />
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border/50 bg-card py-12">
        <div className="container grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl font-bold vs-gradient-text">{s.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Why <span className="vs-gradient-text">VoraSense</span>?</h2>
            <p className="mt-3 text-muted-foreground">Built with cutting-edge ML and accessibility at the core.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="vs-card p-6 hover:shadow-lg transition-shadow"
              >
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

      {/* Footer */}
      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        © 2026 VoraSense. Adaptive Voice Learning Platform. All rights reserved.
      </footer>
    </div>
  );
}
