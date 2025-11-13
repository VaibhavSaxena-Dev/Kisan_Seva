import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import LanguageSelector from "./LanguageSelector";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/Farming Logo.ico"
              alt="Kisan Seva Logo"
              className="w-8 h-8 object-contain"
            />
            <span className="text-2xl font-bold text-primary">{t('title')}</span>
          </Link>
          
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive('/') ? "text-primary" : "text-muted-foreground"
              )}
            >
              {t('home')}
            </Link>
            <Link
              to="/awareness"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive('/awareness') ? "text-primary" : "text-muted-foreground"
              )}
            >
              {t('awareness')}
            </Link>
            <Link
              to="/hygiene-test"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive('/hygiene-test') ? "text-primary" : "text-muted-foreground"
              )}
            >
              {t('hygieneTest')}
            </Link>
            <Link
              to="/todo-list"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive('/todo-list') ? "text-primary" : "text-muted-foreground"
              )}
            >
              {t('todoList')}
            </Link>
            <Link
              to="/about"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive('/about') ? "text-primary" : "text-muted-foreground"
              )}
            >
              {t('aboutTitle')}
            </Link>
            <LanguageSelector />
            {user && (
              <div className="flex items-center gap-3 pl-3 border-l border-border/50">
                <span className="text-sm font-medium text-muted-foreground">
                  {t('welcomeBack')} {user.name.split(' ')[0] || user.email}
                </span>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  {t('logout')}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
