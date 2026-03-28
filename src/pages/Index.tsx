import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowRight, Star, Mic, Brain, BarChart3, 
  Globe, Shield, Users, Zap, Layout, Github, Linkedin, Mail 
} from "lucide-react";
import brainLogo from "@/assets/brain-logo.png";
import pragathijaImg from "@/assets/team/pragathija.png";
import balaImg from "@/assets/team/bala.png";
import srideviImg from "@/assets/team/sridevi.png";
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
    { icon: Users, title: t.accessibleDesign, desc: t.accessibleDesc },
    { icon: Zap, title: t.realTimeFeedback, desc: t.realTimeFeedbackDesc },
  ];

  const team = [
    {
      name: "Pragathija S",
      role: "Data Science & ML Professional in Progress | Crafting intelligent solutions | Evolving through research & innovation.",
      tags: ["Backend Architecture", "ML Models", "API Design"],
      image: pragathijaImg,
      github: "https://github.com/Pragathija",
      linkedin: "https://www.linkedin.com/in/pragathija-s-4b3769330/",
      email: "mailto:praga007thija@gmail.com"
    },
    {
      name: "Bala Nithya M",
      role: "Aspiring Software Developer | IT Student | Tech Enthusiast | Building accessible experiences.",
      tags: ["Frontend Development", "UI/UX Design", "Accessibility"],
      image: balaImg,
      github: "https://github.com/balanithyam",
      linkedin: "https://www.linkedin.com/in/bala-nithya-m-89781b309/",
      email: "mailto:balanithyam04@gmail.com"
    },
    {
      name: "Sridevi P",
      role: "Aspiring Cybersecurity Specialist | Passionate About Securing Networks, Applications & Data.",
      tags: ["Database Design", "API Integration", "Testing"],
      image: srideviImg,
      github: "https://github.com/Sridevi-Paramasivan",
      linkedin: "https://www.linkedin.com/in/sridevi-p-713648379/",
      email: "mailto:sridevi90800@gmail.com"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pb-20 pt-24">
        <div className="absolute inset-0 opacity-[0.03]" style={{ background: "var(--gradient-primary)" }} />
        <div className="container text-center px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
              <Star className="h-4 w-4" /> {t.heroBadge}
            </div>
            <h1 className="mx-auto max-w-4xl text-4xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl">
              <span className="vs-gradient-text">{t.heroTitle1}</span><br />
              <span className="vs-gradient-text">{t.heroTitle2}</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              {t.heroDesc}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="vs-gradient-hero border-0 text-primary-foreground gap-2 px-8 text-base w-full sm:w-auto" onClick={() => navigate("/register")}>
                {t.getStarted} <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="text-base w-full sm:w-auto" onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}>
                {t.seeHow}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-border/50 bg-card py-12">
        <div className="container grid grid-cols-2 gap-8 md:grid-cols-4 px-4 text-vs-cyan">
          {stats.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
              <div className="text-3xl font-bold vs-gradient-text">{s.value}</div>
              <div className="mt-1 text-sm text-vs-cyan/80">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why VoraSense Section */}
      <section id="features" className="py-24">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">{t.whyVoraSense}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{t.whyDesc}</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="vs-card p-6 bg-card/50 backdrop-blur-sm border border-border/50">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-vs-cyan/10">
                  <f.icon className="h-6 w-6 text-vs-cyan" />
                </div>
                <h3 className="text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-muted/30">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold vs-gradient-text mb-4">{t.howItWorks}</h2>
            <p className="text-muted-foreground">{t.howDesc}</p>
          </div>
          <div className="grid gap-12 md:grid-cols-3">
            {[
              { step: "1", title: t.signUpStep, desc: t.signUpStepDesc },
              { step: "2", title: t.quizStep, desc: t.quizStepDesc },
              { step: "3", title: t.lessonsStep, desc: t.lessonsStepDesc }
            ].map((step, i) => (
              <motion.div key={i} className="text-center" initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
                <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full vs-gradient-hero text-xl font-bold text-primary-foreground shadow-lg shadow-primary/20">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* More Than Just Lessons Section */}
      <section className="py-24 overflow-hidden">
        <div className="container px-4">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-4xl font-bold mb-6 vs-gradient-text">{t.moreThanLessons}</h2>
              <p className="text-muted-foreground mb-8">{t.moreThanDesc}</p>
              <div className="space-y-6">
                {[
                  { icon: Globe, text: t.voiceTutorFeature },
                  { icon: Layout, text: t.analyticsFeature },
                  { icon: Star, text: t.leaderboardFeature },
                  { icon: Shield, text: t.accessibilityFeature }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 group">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-vs-cyan/10 text-vs-cyan transition-colors group-hover:bg-vs-cyan group-hover:text-primary-foreground">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-medium text-foreground/80">{item.text}</span>
                  </div>
                ))}
              </div>
              <Button size="lg" className="mt-10 vs-gradient-hero border-0 text-primary-foreground" onClick={() => navigate("/register")}>
                {t.getStarted} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
              <div className="rounded-3xl border border-border/50 bg-card p-6 shadow-2xl">
                <div className="flex items-center gap-2 mb-6 border-b border-border/50 pb-4">
                   <div className="flex gap-1.5">
                     <div className="h-3 w-3 rounded-full bg-red-500/20" />
                     <div className="h-3 w-3 rounded-full bg-yellow-500/20" />
                     <div className="h-3 w-3 rounded-full bg-green-500/20" />
                   </div>
                   <div className="ml-4 text-xs font-medium text-muted-foreground">VoraSense Dashboard Preview</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Lesson 1", sub: "Mathematics", p: "82% complete", color: "bg-vs-cyan" },
                    { label: "Lesson 2", sub: "Science", p: "67% complete", color: "bg-vs-purple" },
                    { label: "Lesson 3", sub: "English", p: "91% complete", color: "bg-primary" },
                    { label: "Lesson 4", sub: "History", p: "58% complete", color: "bg-vs-cyan/60" }
                  ].map((lesson, i) => (
                    <div key={i} className="rounded-xl border border-border/50 bg-muted/30 p-4">
                      <div className="text-xs font-bold text-primary mb-1">{lesson.label}</div>
                      <div className="text-[10px] text-muted-foreground mb-3">{lesson.sub}</div>
                      <div className="h-1.5 w-full bg-border rounded-full overflow-hidden">
                        <div className={`h-full ${lesson.color} transition-all duration-1000`} style={{ width: lesson.p.split('%')[0] + '%' }} />
                      </div>
                      <div className="mt-2 text-[10px] font-medium text-muted-foreground">{lesson.p}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Meet the Team Section */}
      <section className="py-24 bg-muted/10">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold vs-gradient-text mb-4">{t.meetTeam}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{t.teamDesc}</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {team.map((member, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="vs-card p-0 overflow-hidden flex flex-col bg-card/80 backdrop-blur-md">
                <div className="h-24 vs-gradient-hero w-full" />
                <div className="px-6 pb-8 -mt-12 text-center flex-1 flex flex-col">
                  <div className="mx-auto h-24 w-24 rounded-full border-4 border-card overflow-hidden bg-primary text-primary-foreground flex items-center justify-center shadow-xl mb-4">
                    {member.image ? (
                      <img src={member.image} alt={member.name} className="h-full w-full object-cover" />
                    ) : (
                      <div className="text-3xl font-bold">{member.name.charAt(0)}</div>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-2">{member.name}</h3>
                  <p className="text-sm text-vs-cyan mb-6 leading-relaxed flex-1">
                    {member.role}
                  </p>
                  <div className="flex flex-wrap justify-center gap-2 mb-6">
                    {member.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 rounded-full bg-primary/5 border border-primary/20 text-[10px] font-semibold text-primary uppercase tracking-wider">{tag}</span>
                    ))}
                  </div>
                  <div className="flex justify-center gap-4 text-muted-foreground pt-4 border-t border-border/50">
                    <a href={member.github} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                      <Github className="h-5 w-5" />
                    </a>
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a href={member.email} className="hover:text-primary transition-colors">
                      <Mail className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 border-t border-border/50 bg-gradient-to-b from-transparent to-primary/5">
        <div className="container text-center">
            <h2 className="text-4xl font-bold mb-6">{t.readyStart}</h2>
            <Button size="lg" className="vs-gradient-hero border-0 text-primary-foreground px-10 text-lg" onClick={() => navigate("/register")}>
              {t.getStarted}
            </Button>
        </div>
      </section>

      <footer className="border-t border-border py-12 bg-card">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="flex items-center gap-3">
             <div className="flex h-8 w-8 items-center justify-center rounded-lg vs-gradient-hero text-primary-foreground font-bold">V</div>
             <span className="text-xl font-bold vs-gradient-text tracking-tighter">VoraSense</span>
           </div>
           <div className="text-sm text-muted-foreground">
             © 2026 VoraSense. Adaptive Voice Learning Platform.
           </div>
           <div className="flex gap-6 text-sm font-medium text-muted-foreground">
             <button className="hover:text-primary transition-colors">{t.privacy}</button>
             <button className="hover:text-primary transition-colors">{t.terms}</button>
             <button className="hover:text-primary transition-colors">{t.contact}</button>
           </div>
        </div>
      </footer>
    </div>
  );
}
