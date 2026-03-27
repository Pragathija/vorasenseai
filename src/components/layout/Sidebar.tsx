import { Link, useLocation } from "react-router-dom";
import {
  Home, BookOpen, Brain, TrendingUp, BarChart3,
  Trophy, Users, Settings, FileText, ChevronRight
} from "lucide-react";
import brainLogo from "@/assets/brain-logo.png";
import { useState } from "react";

const navItems = [
  { icon: Home, label: "Home", path: "/dashboard" },
  { icon: BookOpen, label: "Learning", path: "/dashboard/learning" },
  { icon: Brain, label: "AI Concepts", path: "/dashboard/concepts" },
  { icon: TrendingUp, label: "Voice Tutor", path: "/dashboard/voice-tutor" },
  { icon: BarChart3, label: "Analytics", path: "/dashboard/analytics" },
  { icon: Trophy, label: "Leaderboard", path: "/dashboard/leaderboard" },
  { icon: Users, label: "Community", path: "/dashboard/community" },
  { icon: Settings, label: "Settings", path: "/dashboard/settings" },
  { icon: FileText, label: "Reports", path: "/dashboard/reports" },
];

export function Sidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-sidebar-border bg-sidebar transition-all duration-300 ${
        collapsed ? "w-[70px]" : "w-[240px]"
      }`}
    >
      <div className="flex h-16 items-center justify-between px-4">
        <Link to="/dashboard" className="flex items-center gap-2 overflow-hidden">
          <img src={brainLogo} alt="VoraSense" className="h-9 w-9 rounded-lg object-contain" />
          {!collapsed && (
            <span className="whitespace-nowrap font-display text-lg font-bold text-sidebar-foreground">
              VoraSense
            </span>
          )}
        </Link>
      </div>

      <nav className="mt-4 flex-1 space-y-1 px-2">
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                active
                  ? "vs-sidebar-active text-vs-cyan"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-border/30 hover:text-sidebar-foreground"
              }`}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex h-12 items-center justify-center border-t border-sidebar-border text-sidebar-foreground/50 hover:text-sidebar-foreground transition-colors"
      >
        <ChevronRight className={`h-4 w-4 transition-transform ${collapsed ? "" : "rotate-180"}`} />
      </button>
    </aside>
  );
}
