import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { User, Mic, Eye, BookOpen, Bell, Shield, Palette } from "lucide-react";

const tabs = [
  { icon: User, label: "Profile" },
  { icon: Mic, label: "Voice & Speech" },
  { icon: Eye, label: "Accessibility" },
  { icon: BookOpen, label: "Learning Preferences" },
  { icon: Bell, label: "Notifications" },
  { icon: Shield, label: "Data & Privacy" },
  { icon: Palette, label: "Appearance" },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold vs-gradient-text">Settings</h1>
        <p className="text-muted-foreground">Customize your learning experience</p>
      </div>

      <div className="flex gap-6">
        {/* Settings nav */}
        <div className="w-64 shrink-0 space-y-1">
          {tabs.map((t, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                i === activeTab ? "vs-gradient-hero text-primary-foreground" : "hover:bg-muted"
              }`}
            >
              <t.icon className="h-4 w-4" /> {t.label}
            </button>
          ))}
        </div>

        {/* Settings content */}
        <div className="flex-1 vs-card p-6">
          {activeTab === 0 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Profile Settings</h2>
              <div className="grid gap-4">
                <div className="space-y-2"><Label>Display Name</Label><Input placeholder="Your name" /></div>
                <div className="space-y-2"><Label>Username</Label><Input placeholder="username" /></div>
                <div className="space-y-2"><Label>Email</Label><Input type="email" placeholder="your@email.com" /></div>
                <div className="space-y-2"><Label>Phone</Label><Input placeholder="+1 (555) 000-0000" /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2"><Label>Age</Label><Input type="number" /></div>
                  <div className="space-y-2">
                    <Label>Gender</Label>
                    <Select><SelectTrigger><SelectValue placeholder="Select Gender" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2"><Label>Country</Label><Input placeholder="Country" /></div>
                  <div className="space-y-2"><Label>State/Region</Label><Input placeholder="State" /></div>
                </div>
                <div className="space-y-2"><Label>Bio</Label><Textarea placeholder="Tell us about yourself..." /></div>
              </div>
              <Button className="vs-gradient-hero border-0 text-primary-foreground">Save Changes</Button>
            </div>
          )}
          {activeTab === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Voice & Speech Settings</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Voice Speed</Label>
                  <Select><SelectTrigger><SelectValue placeholder="Normal" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="slow">Slow</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="fast">Fast</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>AI Voice Type</Label>
                  <Select><SelectTrigger><SelectValue placeholder="Default" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Default</SelectItem>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <Label>Auto-listen on page load</Label>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>
          )}
          {activeTab === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Accessibility Settings</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between"><Label>Screen Reader Mode</Label><Switch /></div>
                <div className="flex items-center justify-between"><Label>High Contrast</Label><Switch /></div>
                <div className="flex items-center justify-between"><Label>Large Text</Label><Switch /></div>
                <div className="flex items-center justify-between"><Label>Voice Navigation</Label><Switch defaultChecked /></div>
                <div className="flex items-center justify-between"><Label>Reduce Animations</Label><Switch /></div>
              </div>
            </div>
          )}
          {activeTab >= 3 && (
            <div className="flex h-48 items-center justify-center text-muted-foreground">
              {tabs[activeTab].label} settings will be available here
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
