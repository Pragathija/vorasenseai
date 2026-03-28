import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { User, Mic, Eye, BookOpen, Bell, Shield, Palette } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function Settings() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState(0);

  const { data: profile } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: async () => {
      const { data } = await supabase.from("profiles").select("*").eq("id", user!.id).single();
      return data;
    },
    enabled: !!user,
  });

  const [form, setForm] = useState({
    full_name: "", email: "", age: "", gender: "", country: "",
    learning_goal: "", visual_impairment: "none", voice_preference: "default",
    preferred_language: "en",
  });

  useEffect(() => {
    if (profile) {
      setForm({
        full_name: profile.full_name || "",
        email: profile.email || "",
        age: profile.age?.toString() || "",
        gender: profile.gender || "",
        country: profile.country || "",
        learning_goal: profile.learning_goal || "",
        visual_impairment: profile.visual_impairment || "none",
        voice_preference: profile.voice_preference || "default",
        preferred_language: profile.preferred_language || "en",
      });
    }
  }, [profile]);

  const updateProfile = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("profiles").update({
        full_name: form.full_name,
        age: form.age ? parseInt(form.age) : null,
        gender: form.gender || null,
        country: form.country || null,
        learning_goal: form.learning_goal || null,
        visual_impairment: form.visual_impairment,
        voice_preference: form.voice_preference,
        preferred_language: form.preferred_language,
        updated_at: new Date().toISOString(),
      }).eq("id", user!.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Settings saved!");
    },
    onError: (e) => toast.error(e.message),
  });

  const tabs = [
    { icon: User, label: t.profile },
    { icon: Mic, label: t.voiceSpeech },
    { icon: Eye, label: t.accessibilitySettings },
    { icon: BookOpen, label: t.learningPreferences },
    { icon: Bell, label: t.notifications },
    { icon: Shield, label: t.dataPrivacy },
    { icon: Palette, label: t.appearance },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold vs-gradient-text">{t.settings}</h1>
        <p className="text-muted-foreground">{t.customizeExperience}</p>
      </div>
      <div className="flex gap-6">
        <div className="w-64 shrink-0 space-y-1">
          {tabs.map((tb, i) => (
            <button key={i} onClick={() => setActiveTab(i)} className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${i === activeTab ? "vs-gradient-hero text-primary-foreground" : "hover:bg-muted"}`}>
              <tb.icon className="h-4 w-4" /> {tb.label}
            </button>
          ))}
        </div>
        <div className="flex-1 vs-card p-6">
          {activeTab === 0 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">{t.profile}</h2>
              <div className="grid gap-4">
                <div className="space-y-2"><Label>Display Name</Label><Input value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} className="bg-muted/50 border-border" /></div>
                <div className="space-y-2"><Label>{t.emailAddress}</Label><Input value={form.email} disabled className="bg-muted/50 border-border opacity-60" /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2"><Label>{t.age}</Label><Input type="number" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} className="bg-muted/50 border-border" /></div>
                  <div className="space-y-2"><Label>{t.gender}</Label>
                    <Select value={form.gender} onValueChange={(v) => setForm({ ...form, gender: v })}><SelectTrigger className="bg-muted/50 border-border"><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent><SelectItem value="male">Male</SelectItem><SelectItem value="female">Female</SelectItem><SelectItem value="other">Other</SelectItem></SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2"><Label>{t.country}</Label><Input value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} className="bg-muted/50 border-border" /></div>
              </div>
              <Button className="vs-gradient-hero border-0 text-primary-foreground" onClick={() => updateProfile.mutate()} disabled={updateProfile.isPending}>
                {updateProfile.isPending ? "Saving..." : t.saveChanges}
              </Button>
            </div>
          )}
          {activeTab === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">{t.voiceSpeech}</h2>
              <div className="space-y-4">
                <div className="space-y-2"><Label>Voice Preference</Label>
                  <Select value={form.voice_preference} onValueChange={(v) => setForm({ ...form, voice_preference: v })}>
                    <SelectTrigger className="bg-muted/50 border-border"><SelectValue /></SelectTrigger>
                    <SelectContent><SelectItem value="default">Default</SelectItem><SelectItem value="male">Male Voice</SelectItem><SelectItem value="female">Female Voice</SelectItem><SelectItem value="slow">Slow Pace</SelectItem></SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between"><Label>Auto-listen on page load</Label><Switch defaultChecked /></div>
              </div>
              <Button className="vs-gradient-hero border-0 text-primary-foreground" onClick={() => updateProfile.mutate()} disabled={updateProfile.isPending}>{t.saveChanges}</Button>
            </div>
          )}
          {activeTab === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">{t.accessibilitySettings}</h2>
              <div className="space-y-4">
                <div className="space-y-2"><Label>Visual Impairment Level</Label>
                  <Select value={form.visual_impairment} onValueChange={(v) => setForm({ ...form, visual_impairment: v })}>
                    <SelectTrigger className="bg-muted/50 border-border"><SelectValue /></SelectTrigger>
                    <SelectContent><SelectItem value="none">None</SelectItem><SelectItem value="low-vision">Low Vision</SelectItem><SelectItem value="blind">Blind</SelectItem><SelectItem value="color-blind">Color Blind</SelectItem></SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between"><Label>Screen Reader Mode</Label><Switch /></div>
                <div className="flex items-center justify-between"><Label>High Contrast</Label><Switch /></div>
                <div className="flex items-center justify-between"><Label>Voice Navigation</Label><Switch defaultChecked /></div>
              </div>
              <Button className="vs-gradient-hero border-0 text-primary-foreground" onClick={() => updateProfile.mutate()} disabled={updateProfile.isPending}>{t.saveChanges}</Button>
            </div>
          )}
          {activeTab === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">{t.learningPreferences}</h2>
              <div className="space-y-4">
                <div className="space-y-2"><Label>Learning Goal</Label>
                  <Select value={form.learning_goal} onValueChange={(v) => setForm({ ...form, learning_goal: v })}>
                    <SelectTrigger className="bg-muted/50 border-border"><SelectValue placeholder="Select goal" /></SelectTrigger>
                    <SelectContent><SelectItem value="programming">Programming</SelectItem><SelectItem value="dsa">Data Structures & Algorithms</SelectItem><SelectItem value="ai-ml">AI & Machine Learning</SelectItem><SelectItem value="web-dev">Web Development</SelectItem></SelectContent>
                  </Select>
                </div>
                <div className="space-y-2"><Label>Preferred Language</Label>
                  <Select value={form.preferred_language} onValueChange={(v) => setForm({ ...form, preferred_language: v })}>
                    <SelectTrigger className="bg-muted/50 border-border"><SelectValue /></SelectTrigger>
                    <SelectContent><SelectItem value="en">English</SelectItem><SelectItem value="hi">Hindi</SelectItem><SelectItem value="ta">Tamil</SelectItem><SelectItem value="es">Spanish</SelectItem></SelectContent>
                  </Select>
                </div>
              </div>
              <Button className="vs-gradient-hero border-0 text-primary-foreground" onClick={() => updateProfile.mutate()} disabled={updateProfile.isPending}>{t.saveChanges}</Button>
            </div>
          )}
          {activeTab === 4 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">{t.notifications}</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between"><Label>Email Notifications</Label><Switch defaultChecked /></div>
                <div className="flex items-center justify-between"><Label>Push Notifications</Label><Switch /></div>
                <div className="flex items-center justify-between"><Label>Weekly Progress Report</Label><Switch defaultChecked /></div>
                <div className="flex items-center justify-between"><Label>New Course Alerts</Label><Switch defaultChecked /></div>
              </div>
            </div>
          )}
          {activeTab === 5 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">{t.dataPrivacy}</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between"><Label>Share Learning Progress</Label><Switch /></div>
                <div className="flex items-center justify-between"><Label>Show on Leaderboard</Label><Switch defaultChecked /></div>
                <div className="flex items-center justify-between"><Label>Allow Analytics Collection</Label><Switch defaultChecked /></div>
              </div>
            </div>
          )}
          {activeTab === 6 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">{t.appearance}</h2>
              <p className="text-muted-foreground">VoraSense uses a dark theme optimized for reduced eye strain and accessibility.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
