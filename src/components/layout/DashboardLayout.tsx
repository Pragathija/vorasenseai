import { Outlet, useNavigate } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { BrainMic } from "@/components/BrainMic";
import { Search, Bell, Zap, Flame, User, LogOut, Globe, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import type { LanguageCode } from "@/i18n/translations";

const languages: { code: LanguageCode; label: string; name: string }[] = [
  { code: "en", label: "EN", name: "English" },
  { code: "hi", label: "HI", name: "Hindi" },
  { code: "ta", label: "TA", name: "Tamil" },
  { code: "es", label: "ES", name: "Spanish" },
  { code: "fr", label: "FR", name: "French" },
  { code: "de", label: "DE", name: "German" },
  { code: "ja", label: "JA", name: "Japanese" },
  { code: "zh", label: "ZH", name: "Chinese" },
];

export function DashboardLayout() {
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();
  const { user, signOut } = useAuth();
  const currentLang = languages.find((l) => l.code === language) || languages[0];

  const { data: profile } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data } = await supabase.from("profiles").select("*").eq("id", user.id).single();
      return data;
    },
    enabled: !!user,
  });

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <div className="ml-[240px] transition-all duration-300">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border/50 bg-card/80 px-6 backdrop-blur-xl">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder={t.searchLessons} className="pl-10 bg-muted/50 border-0" />
          </div>

          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1.5">
                  <Globe className="h-4 w-4" />
                  {currentLang.label}
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {languages.map((l) => (
                  <DropdownMenuItem key={l.code} onClick={() => setLanguage(l.code)}>
                    {l.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-sm">
              <Zap className="h-4 w-4 text-primary" />
              <span className="font-medium">{profile?.xp ?? 0}</span>
            </div>
            <div className="flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-sm">
              <Flame className="h-4 w-4 text-destructive" />
              <span className="font-medium">{profile?.streak_days ?? 0}</span>
            </div>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2">
                  <User className="h-4 w-4" />
                  <span className="text-sm font-medium">{profile?.full_name || "User"}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => navigate("/dashboard/settings")}>{t.settings}</DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="p-6">
          <Outlet />
        </main>
      </div>

      <BrainMic />
    </div>
  );
}
