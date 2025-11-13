import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LanguageSelector from "@/components/LanguageSelector";
import loginBackground from "@/assets/Screenshot 2025-11-07 231634.png";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please provide a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const { register: registerField, handleSubmit, formState } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });
  const { errors, isSubmitting } = formState;
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { t } = useLanguage();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (values: LoginFormValues) => {
    try {
      await login(values);
      toast({
        title: t("loginSuccessTitle"),
        description: t("loginSuccessMessage"),
      });
      const redirectTo = (location.state as { from?: { pathname?: string } })?.from?.pathname ?? "/";
      navigate(redirectTo, { replace: true });
    } catch (error) {
      const message = error instanceof Error ? error.message : t("loginErrorMessage");
      toast({
        variant: "destructive",
        title: t("loginErrorTitle"),
        description: message,
      });
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat brightness-110"
        style={{ backgroundImage: `url(${loginBackground})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/15 to-black/25" />
      </div>

      {/* Header with Kisan Seva Title */}
      <header className="relative z-10 flex items-center justify-between px-6 py-4">
        <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-2xl">
          Kisan Seva
        </h1>
        <LanguageSelector />
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex flex-1 items-center justify-center px-4 py-8">
        <Card className="w-full max-w-md shadow-2xl bg-background/95 backdrop-blur-sm">
          <CardContent className="pt-6">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="space-y-2">
                <Label htmlFor="email">{t("emailLabel")}</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  {...registerField("email")}
                />
                {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">{t("passwordLabel")}</Label>
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="********"
                  {...registerField("password")}
                />
                {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? t("loginSubmitting") : t("loginAction")}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-3 text-sm text-muted-foreground pb-6">
            <p>
              {t("noAccountPrompt")} {" "}
              <Link to="/register" className="font-medium text-primary hover:underline">
                {t("createAccountLink")}
              </Link>
            </p>
            <p className="text-xs leading-relaxed text-muted-foreground/80">{t("privacyNotice")}</p>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
};

export default Login;

