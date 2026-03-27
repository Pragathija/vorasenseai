import { motion } from "framer-motion";
import { Trophy, Medal, Globe, MapPin, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Leaderboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          <span className="vs-gradient-text">Leaderboard</span>
        </h1>
        <p className="text-muted-foreground">See how you rank against learners worldwide</p>
      </div>

      <Tabs defaultValue="worldwide">
        <TabsList>
          <TabsTrigger value="worldwide" className="gap-1"><Globe className="h-4 w-4" /> Worldwide</TabsTrigger>
          <TabsTrigger value="nationwide" className="gap-1"><MapPin className="h-4 w-4" /> Nationwide</TabsTrigger>
        </TabsList>

        <TabsContent value="worldwide" className="mt-6">
          <div className="vs-card p-8 text-center">
            <Trophy className="mx-auto h-16 w-16 text-muted-foreground/30" />
            <p className="mt-4 text-lg font-medium text-muted-foreground">No learners yet</p>
            <p className="text-sm text-muted-foreground/70">Start learning to appear on the leaderboard!</p>
            <Button className="mt-4 vs-gradient-hero border-0 text-primary-foreground">Start Learning</Button>
          </div>
        </TabsContent>

        <TabsContent value="nationwide" className="mt-6">
          <div className="vs-card p-8 text-center">
            <MapPin className="mx-auto h-16 w-16 text-muted-foreground/30" />
            <p className="mt-4 text-lg font-medium text-muted-foreground">No nationwide data yet</p>
            <p className="text-sm text-muted-foreground/70">Rankings update as learners join from your country</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
