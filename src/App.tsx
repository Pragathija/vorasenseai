import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BrainMic } from "@/components/BrainMic";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { ChatProvider } from "@/contexts/ChatContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardHome from "./pages/DashboardHome";
import Learning from "./pages/Learning";
import VoiceTutor from "./pages/VoiceTutor";
import Analytics from "./pages/Analytics";
import Leaderboard from "./pages/Leaderboard";
import Settings from "./pages/Settings";
import Quiz from "./pages/Quiz";
import Placeholder from "./pages/Placeholder";
import Concepts from "./pages/Concepts";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true
          }}>
            <ChatProvider>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
                  <Route index element={<DashboardHome />} />
                  <Route path="learning" element={<Learning />} />
                  <Route path="voice-tutor" element={<VoiceTutor />} />
                  <Route path="analytics" element={<Analytics />} />
                  <Route path="leaderboard" element={<Leaderboard />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="quiz/:topic" element={<Quiz />} />
                  <Route path="concepts" element={<Concepts />} />
                  <Route path="community" element={<Placeholder title="Community" />} />
                  <Route path="reports" element={<Placeholder title="Reports" />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
              <BrainMic />
            </ChatProvider>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
