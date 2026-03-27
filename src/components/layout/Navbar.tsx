import { Link, useNavigate } from "react-router-dom";
import { Globe, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/contexts/LanguageContext";
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

export function Navbar() {
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();
  const currentLang = languages.find((l) => l.code === language) || languages[0];

  return (
    <nav className="sticky top-0 z-50 border-b border-border/50 bg-card/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl vs-gradient-hero">
            <span className="text-lg font-bold text-primary-foreground">V</span>
          </div>
          <span className="text-xl font-display font-bold text-primary">VoraSense</span>
        </Link>

        <div className="flex items-center gap-3">
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

          <Button variant="outline" onClick={() => navigate("/login")}>{t.login}</Button>
          <Button className="vs-gradient-hero border-0 text-primary-foreground" onClick={() => navigate("/register")}>
            {t.signUp}
          </Button>
        </div>
      </div>
    </nav>
  );
}
