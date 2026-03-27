import { Trophy, Globe, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Leaderboard() {
  const { t } = useLanguage();

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
        <TabsContent value="worldwide" className="mt-6">
          <div className="vs-card p-8 text-center">
            <Trophy className="mx-auto h-16 w-16 text-muted-foreground/30" />
            <p className="mt-4 text-lg font-medium text-muted-foreground">{t.noLearnersYet}</p>
            <Button className="mt-4 vs-gradient-hero border-0 text-primary-foreground">{t.startLearning}</Button>
          </div>
        </TabsContent>
        <TabsContent value="nationwide" className="mt-6">
          <div className="vs-card p-8 text-center">
            <MapPin className="mx-auto h-16 w-16 text-muted-foreground/30" />
            <p className="mt-4 text-lg font-medium text-muted-foreground">{t.noLearnersYet}</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
