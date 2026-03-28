import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, ArrowRight, Eye, EyeOff, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

export default function Login() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { signIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex min-h-[calc(100vh-64px)] items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <div className="vs-card-elevated rounded-2xl border border-border/50 p-8">
            <div className="mb-6 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                <Shield className="h-7 w-7 text-primary" />
              </div>
              <h1 className="text-2xl font-bold vs-gradient-text">{t.welcomeBack}</h1>
              <p className="mt-1 text-sm text-muted-foreground">{t.signInDesc}</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm font-medium"><Mail className="h-4 w-4 text-muted-foreground" /> {t.emailAddress}</Label>
                <Input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="bg-muted/50 border-border" />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm font-medium"><Lock className="h-4 w-4 text-muted-foreground" /> {t.password}</Label>
                <div className="relative">
                  <Input type={showPassword ? "text" : "password"} placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required className="bg-muted/50 border-border" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <Button type="submit" className="w-full vs-gradient-hero border-0 text-primary-foreground gap-2" disabled={loading}>
                {loading ? "Signing in..." : t.signIn} <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
            <div className="mt-6">
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
                <span className="relative bg-card px-3 text-xs text-muted-foreground">or</span>
              </div>
              <div className="mt-4 rounded-xl border border-border bg-muted/30 p-4 text-center">
                <p className="text-sm">
                  <span className="font-medium text-primary">{t.newToVoraSense}</span>{" "}
                  <span className="text-muted-foreground">{t.newDesc}</span>
                </p>
                <Button variant="outline" className="mt-3" onClick={() => navigate("/register")}>{t.createAccount}</Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
