import { Trophy, Globe, MapPin, Medal, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

export default function Leaderboard() {
  const { t } = useLanguage();
  const { user } = useAuth();

  const { data: profile } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: async () => {
      const { data } = await supabase.from("profiles").select("country").eq("id", user!.id).single();
      return data;
    },
    enabled: !!user,
  });

  const { data: worldwide = [] } = useQuery({
    queryKey: ["leaderboard-worldwide"],
    queryFn: async () => {
      const { data } = await supabase.from("leaderboard_entries").select("*").order("xp", { ascending: false }).limit(50);
      return data ?? [];
    },
  });

  const { data: nationwide = [] } = useQuery({
    queryKey: ["leaderboard-nationwide", profile?.country],
    queryFn: async () => {
      if (!profile?.country) return [];
      const { data } = await supabase.from("leaderboard_entries").select("*").eq("country", profile.country).order("xp", { ascending: false }).limit(50);
      return data ?? [];
    },
    enabled: !!profile?.country,
  });

  const medalColors = ["text-yellow-400", "text-muted-foreground", "text-orange-400"];

  const renderList = (entries: any[]) => (
    entries.length > 0 ? (
      <div className="space-y-2">
        {entries.map((e: any, i: number) => (
          <div key={e.id} className={`vs-card flex items-center gap-4 p-4 ${e.user_id === user?.id ? "ring-1 ring-primary" : ""}`}>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted font-bold text-lg">
              {i < 3 ? <Medal className={`h-5 w-5 ${medalColors[i]}`} /> : i + 1}
            </div>
            <div className="flex-1">
              <div className="font-semibold">{e.display_name}</div>
              <div className="text-xs text-muted-foreground">{e.country || "Unknown"} • Level {e.level} • {e.courses_completed} courses</div>
            </div>
            <div className="flex items-center gap-1 text-primary font-bold">
              <Zap className="h-4 w-4" /> {e.xp} XP
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="vs-card p-8 text-center">
        <Trophy className="mx-auto h-16 w-16 text-muted-foreground/30" />
        <p className="mt-4 text-lg font-medium text-muted-foreground">{t.noLearnersYet}</p>
        <Button className="mt-4 vs-gradient-hero border-0 text-primary-foreground">{t.startLearning}</Button>
      </div>
    )
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold"><span className="vs-gradient-text">{t.leaderboard}</span></h1>
        <p className="text-muted-foreground">{t.seeRank}</p>
      </div>
      <Tabs defaultValue="worldwide">
        <TabsList>
          <TabsTrigger value="worldwide" className="gap-1"><Globe className="h-4 w-4" /> {t.worldwide}</TabsTrigger>
          <TabsTrigger value="nationwide" className="gap-1"><MapPin className="h-4 w-4" /> {t.nationwide}</TabsTrigger>
        </TabsList>
        <TabsContent value="worldwide" className="mt-6">{renderList(worldwide)}</TabsContent>
        <TabsContent value="nationwide" className="mt-6">{renderList(nationwide)}</TabsContent>
      </Tabs>
    </div>
  );
}
