import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { User, Mic, Eye, BookOpen, Bell, Shield, Palette } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Settings() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState(0);

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
              <h2 className="text-xl font-semibold">{t.profile} {t.settings}</h2>
              <div className="grid gap-4">
                <div className="space-y-2"><Label>Display Name</Label><Input placeholder="Your name" /></div>
                <div className="space-y-2"><Label>{t.emailAddress}</Label><Input type="email" placeholder="your@email.com" /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2"><Label>{t.age}</Label><Input type="number" /></div>
                  <div className="space-y-2"><Label>{t.gender}</Label>
                    <Select><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent><SelectItem value="male">Male</SelectItem><SelectItem value="female">Female</SelectItem><SelectItem value="other">Other</SelectItem></SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2"><Label>{t.country}</Label><Input /></div>
                <div className="space-y-2"><Label>Bio</Label><Textarea placeholder="Tell us about yourself..." /></div>
              </div>
              <Button className="vs-gradient-hero border-0 text-primary-foreground">{t.saveChanges}</Button>
            </div>
          )}
          {activeTab === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">{t.voiceSpeech}</h2>
              <div className="space-y-4">
                <div className="space-y-2"><Label>Voice Speed</Label>
                  <Select><SelectTrigger><SelectValue placeholder="Normal" /></SelectTrigger>
                    <SelectContent><SelectItem value="slow">Slow</SelectItem><SelectItem value="normal">Normal</SelectItem><SelectItem value="fast">Fast</SelectItem></SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between"><Label>Auto-listen on page load</Label><Switch defaultChecked /></div>
              </div>
            </div>
          )}
          {activeTab === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">{t.accessibilitySettings}</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between"><Label>Screen Reader Mode</Label><Switch /></div>
                <div className="flex items-center justify-between"><Label>High Contrast</Label><Switch /></div>
                <div className="flex items-center justify-between"><Label>Large Text</Label><Switch /></div>
                <div className="flex items-center justify-between"><Label>Voice Navigation</Label><Switch defaultChecked /></div>
              </div>
            </div>
          )}
          {activeTab >= 3 && (
            <div className="flex h-48 items-center justify-center text-muted-foreground">
              {tabs[activeTab].label} settings coming soon
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
