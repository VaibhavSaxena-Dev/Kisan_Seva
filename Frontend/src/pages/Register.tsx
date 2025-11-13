import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LanguageSelector from "@/components/LanguageSelector";
import registerBackground from "@/assets/Screenshot 2025-11-07 231634.png";

const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please provide a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d).{8,}$/,
        "Password must include at least one letter and one number"
      ),
    confirmPassword: z.string().min(8, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

const Register = () => {
  const { register: registerField, handleSubmit, formState, reset } =
    useForm<RegisterFormValues>({
      resolver: zodResolver(registerSchema),
      defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
    });
  const { errors, isSubmitting } = formState;
  const { register: registerUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      await registerUser(values);
      reset();
      toast({
        title: t("registerSuccessTitle"),
        description: t("registerSuccessMessage"),
      });
      navigate("/", { replace: true });
    } catch (error) {
      const message = error instanceof Error ? error.message : t("registerErrorMessage");
      toast({
        variant: "destructive",
        title: t("registerErrorTitle"),
        description: message,
      });
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat brightness-110"
        style={{ backgroundImage: `url(${registerBackground})` }}
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
          <CardHeader className="space-y-3">
            <CardTitle className="text-2xl font-bold">{t("registerTitle")}</CardTitle>
            <CardDescription>{t("registerSubtitle")}</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="space-y-2">
                <Label htmlFor="name">{t("nameLabel")}</Label>
                <Input
                  id="name"
                  autoComplete="name"
                  placeholder={t("namePlaceholder")}
                  {...registerField("name")}
                />
                {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
              </div>
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
                  autoComplete="new-password"
                  placeholder="********"
                  {...registerField("password")}
                />
                {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">{t("confirmPasswordLabel")}</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="********"
                  {...registerField("confirmPassword")}
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
                )}
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? t("registerSubmitting") : t("registerAction")}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-3 text-sm text-muted-foreground">
            <p>
              {t("haveAccountPrompt")} {" "}
              <Link to="/login" className="font-medium text-primary hover:underline">
                {t("signInLink")}
              </Link>
            </p>
            <p className="text-xs leading-relaxed text-muted-foreground/80">{t("privacyNotice")}</p>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
};

export default Register;

