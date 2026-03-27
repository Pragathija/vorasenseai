import { Outlet, useNavigate } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { BrainMic } from "@/components/BrainMic";
import { Search, Bell, Zap, Flame, User, LogOut } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export function DashboardLayout() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <div className="ml-[240px] transition-all duration-300">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border/50 bg-card/80 px-6 backdrop-blur-xl">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search lessons..." className="pl-10 bg-muted/50 border-0" />
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 rounded-full border px-3 py-1.5 text-sm">
              <Zap className="h-4 w-4 text-vs-cyan" />
              <span className="font-medium">0</span>
            </div>
            <div className="flex items-center gap-1 rounded-full border px-3 py-1.5 text-sm">
              <Flame className="h-4 w-4 text-destructive" />
              <span className="font-medium">0</span>
            </div>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] text-destructive-foreground">
                0
              </span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2">
                  <User className="h-4 w-4" />
                  <span className="text-sm font-medium">User</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => navigate("/dashboard/settings")}>
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/")} className="text-destructive">
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
