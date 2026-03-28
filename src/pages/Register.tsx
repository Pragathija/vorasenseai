import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Mail, Lock, ArrowRight, Eye, EyeOff, Star, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const steps = ["Basic Info", "Personal Details", "Accessibility"];

export default function Register() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [step, setStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    fullName: "", email: "", password: "", confirmPassword: "",
    age: "", gender: "", country: "", learningGoal: "",
    visualImpairment: "none", voicePreference: "default", language: "en",
  });

  const update = (key: string, val: string) => setForm({ ...form, [key]: val });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 2) { setStep(step + 1); return; }

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    const { data, error } = await signUp(form.email, form.password, form.fullName);
    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    // Update profile with additional info
    if (data.user) {
      await supabase.from("profiles").update({
        age: form.age ? parseInt(form.age) : null,
        gender: form.gender || null,
        country: form.country || null,
        learning_goal: form.learningGoal || null,
        visual_impairment: form.visualImpairment,
        voice_preference: form.voicePreference,
        preferred_language: form.language,
      }).eq("id", data.user.id);

      // Create leaderboard entry
      await supabase.from("leaderboard_entries").insert({
        user_id: data.user.id,
        display_name: form.fullName || "Learner",
        country: form.country || "",
      });
    }

    setLoading(false);
    toast.success("Account created successfully!");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex min-h-[calc(100vh-64px)] items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-lg">
          <div className="vs-card-elevated rounded-2xl border border-border/50 p-8">
            <div className="mb-6 text-center">
              <div className="mx-auto mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
                <Star className="h-3 w-3" /> Join the future of learning
              </div>
              <h1 className="text-2xl font-bold vs-gradient-text">Create Account</h1>
              <p className="mt-1 text-sm text-muted-foreground">Start your personalized learning journey</p>
            </div>

            <div className="mb-8 flex items-center justify-center gap-0">
              {steps.map((s, i) => (
                <div key={i} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ${
                      i <= step ? "vs-gradient-hero text-primary-foreground" : "border-2 border-border text-muted-foreground"
                    }`}>
                      {i < step ? <Check className="h-4 w-4" /> : i + 1}
                    </div>
                    <span className={`mt-1 text-xs ${i <= step ? "text-primary font-medium" : "text-muted-foreground"}`}>{s}</span>
                  </div>
                  {i < 2 && <div className={`mx-2 mb-5 h-0.5 w-12 ${i < step ? "bg-primary" : "bg-border"}`} />}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {step === 0 && (
                <>
                  <div className="space-y-2"><Label className="flex items-center gap-2"><User className="h-4 w-4 text-muted-foreground" /> Full Name</Label><Input placeholder="Enter your full name" value={form.fullName} onChange={(e) => update("fullName", e.target.value)} required className="bg-muted/50 border-border" /></div>
                  <div className="space-y-2"><Label className="flex items-center gap-2"><Mail className="h-4 w-4 text-muted-foreground" /> Email</Label><Input type="email" placeholder="you@example.com" value={form.email} onChange={(e) => update("email", e.target.value)} required className="bg-muted/50 border-border" /></div>
                  <div className="space-y-2"><Label className="flex items-center gap-2"><Lock className="h-4 w-4 text-muted-foreground" /> Password</Label>
                    <div className="relative"><Input type={showPassword ? "text" : "password"} placeholder="Create a strong password" value={form.password} onChange={(e) => update("password", e.target.value)} required className="bg-muted/50 border-border" /><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button></div>
                  </div>
                  <div className="space-y-2"><Label className="flex items-center gap-2"><Lock className="h-4 w-4 text-muted-foreground" /> Confirm Password</Label><Input type={showPassword ? "text" : "password"} placeholder="Repeat password" value={form.confirmPassword} onChange={(e) => update("confirmPassword", e.target.value)} required className="bg-muted/50 border-border" /></div>
                </>
              )}
              {step === 1 && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2"><Label>Age</Label><Input type="number" placeholder="Age" value={form.age} onChange={(e) => update("age", e.target.value)} className="bg-muted/50 border-border" /></div>
                    <div className="space-y-2"><Label>Gender</Label><Select value={form.gender} onValueChange={(v) => update("gender", v)}><SelectTrigger className="bg-muted/50 border-border"><SelectValue placeholder="Select" /></SelectTrigger><SelectContent><SelectItem value="male">Male</SelectItem><SelectItem value="female">Female</SelectItem><SelectItem value="other">Other</SelectItem></SelectContent></Select></div>
                  </div>
                  <div className="space-y-2"><Label>Country</Label><Input placeholder="Your country" value={form.country} onChange={(e) => update("country", e.target.value)} className="bg-muted/50 border-border" /></div>
                  <div className="space-y-2"><Label>Learning Goal</Label><Select value={form.learningGoal} onValueChange={(v) => update("learningGoal", v)}><SelectTrigger className="bg-muted/50 border-border"><SelectValue placeholder="What do you want to learn?" /></SelectTrigger><SelectContent><SelectItem value="programming">Programming</SelectItem><SelectItem value="dsa">Data Structures & Algorithms</SelectItem><SelectItem value="ai-ml">AI & Machine Learning</SelectItem><SelectItem value="web-dev">Web Development</SelectItem></SelectContent></Select></div>
                </>
              )}
              {step === 2 && (
                <>
                  <div className="space-y-2"><Label>Visual Impairment Level</Label><Select value={form.visualImpairment} onValueChange={(v) => update("visualImpairment", v)}><SelectTrigger className="bg-muted/50 border-border"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="none">None</SelectItem><SelectItem value="low-vision">Low Vision</SelectItem><SelectItem value="blind">Blind</SelectItem><SelectItem value="color-blind">Color Blind</SelectItem></SelectContent></Select></div>
                  <div className="space-y-2"><Label>Voice Preference</Label><Select value={form.voicePreference} onValueChange={(v) => update("voicePreference", v)}><SelectTrigger className="bg-muted/50 border-border"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="default">Default</SelectItem><SelectItem value="male">Male Voice</SelectItem><SelectItem value="female">Female Voice</SelectItem><SelectItem value="slow">Slow Pace</SelectItem></SelectContent></Select></div>
                  <div className="space-y-2"><Label>Preferred Language</Label><Select value={form.language} onValueChange={(v) => update("language", v)}><SelectTrigger className="bg-muted/50 border-border"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="en">English</SelectItem><SelectItem value="hi">Hindi</SelectItem><SelectItem value="ta">Tamil</SelectItem><SelectItem value="es">Spanish</SelectItem><SelectItem value="fr">French</SelectItem><SelectItem value="de">German</SelectItem></SelectContent></Select></div>
                </>
              )}
              <div className="flex gap-3 pt-2">
                {step > 0 && <Button type="button" variant="outline" className="flex-1" onClick={() => setStep(step - 1)}>Back</Button>}
                <Button type="submit" className="flex-1 vs-gradient-hero border-0 text-primary-foreground gap-2" disabled={loading}>
                  {loading ? "Creating..." : step < 2 ? "Continue" : "Create Account"} <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
