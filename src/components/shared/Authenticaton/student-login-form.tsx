import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { api } from "@/api/simulation/v2";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { StudentLoginSchema } from "@/lib/zod-schemas/auth-schema";
import { Link, useNavigate } from "react-router-dom";
import { Home } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { useFullscreen } from "@/context/FullscreenContext";
import getRedirectPath from "@/function/Authentication/login-functions";

export function StudentLoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();
  const { theme } = useTheme();
  const { enterFullscreen } = useFullscreen();

  const form = useForm<z.infer<typeof StudentLoginSchema>>({
    resolver: zodResolver(StudentLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof StudentLoginSchema>) => {
    try {
      enterFullscreen();
      // For now, just accept any credentials since we're focusing on the app structure
      // In a real implementation, we'd call the actual API
      console.log("Login data:", values);

      // Simulate a successful login response
      const mockUser = {
        id: "1",
        name: "John Doe",
        email: values.email,
        role: "student"
      };

      const mockToken = "mock-jwt-token";

      authLogin(mockUser, mockToken);
      const redirectPath = getRedirectPath(mockUser);
      navigate(redirectPath);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred.";
      form.setError("root", { message: errorMessage });
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="relative text-center">
          <Link to="/" className="absolute left-5" aria-label="Go to home page">
            <motion.div
              whileHover={{ rotate: [0, -10, 10, -5, 5, 0] }}
              transition={{ duration: 0.6 }}
            >
              <Button
                className={cn(
                  "rounded-full transition-colors",
                  theme === "light"
                    ? "bg-black text-white hover:bg-gray-800"
                    : "bg-white text-black hover:bg-gray-200",
                )}
              >
                <Home className="h-5 w-5" />
              </Button>
            </motion.div>
          </Link>
          <CardTitle className="text-xl">Student Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
            <div className="grid gap-4">
              {/* General Form Error */}
              {form.formState.errors.root && (
                <div
                  className="bg-destructive/10 text-destructive border-destructive/20 rounded-md border p-3 text-sm"
                  role="alert"
                >
                  {form.formState.errors.root.message}
                </div>
              )}
              {/* Email */}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  placeholder="student@example.com"
                  {...form.register("email")}
                />
                {form.formState.errors.email && (
                  <p className="text-destructive text-sm">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>
              {/* Password */}
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  {...form.register("password")}
                />
                {form.formState.errors.password && (
                  <p className="text-destructive text-sm">
                    {form.formState.errors.password.message}
                  </p>
                )}
              </div>
              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Logging in..." : "Login"}
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="underline">
              Register
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
