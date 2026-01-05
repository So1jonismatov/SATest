import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { api } from "@/api/real";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { StudentRegisterSchema } from "@/lib/zod-schemas/auth-schema";
import { Link, useNavigate } from "react-router-dom";
import { Home } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { mapApiUserToAppUser } from "@/function/Authentication/user-mapper";
import getRedirectPath from "@/function/Authentication/login-functions";

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();
  const [isSuccess] = useState(false);
  const form = useForm<z.infer<typeof StudentRegisterSchema>>({
    resolver: zodResolver(StudentRegisterSchema),
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof StudentRegisterSchema>) => {
    try {
      const { user: apiUser, token } = await api.auth.register(values);
      const appUser = mapApiUserToAppUser(apiUser);
      authLogin(appUser, token);
      const redirectPath = getRedirectPath(appUser);
      navigate(redirectPath);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred.";
      form.setError("root", { message: errorMessage });
    }
  };

  const { theme } = useTheme();

  if (isSuccess) {
    return (
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl text-green-600">Success!</CardTitle>
            <CardDescription>
              Your account has been created successfully. Redirecting you to the
              dashboard...
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

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
          <CardTitle className="text-xl">Create a Student Account</CardTitle>
          <CardDescription>
            Enter your details below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
            <div className="grid gap-4">
              {form.formState.errors.root && (
                <div
                  className="bg-destructive/10 text-destructive border-destructive/20 rounded-md border p-3 text-sm"
                  role="alert"
                >
                  {form.formState.errors.root.message}
                </div>
              )}
              <div className="grid gap-2">
                <Label htmlFor="full_name">Full Name</Label>
                <Input
                  id="full_name"
                  placeholder="John Doe"
                  {...form.register("full_name")}
                />
                {form.formState.errors.full_name && (
                  <p className="text-destructive text-sm">
                    {form.formState.errors.full_name.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="student@example.com"
                  {...form.register("email")}
                />
                {form.formState.errors.email && (
                  <p className="text-destructive text-sm">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  {...form.register("password")}
                />
                {form.formState.errors.password && (
                  <p className="text-destructive text-sm">
                    {form.formState.errors.password.message}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting
                  ? "Creating Account..."
                  : "Sign up"}
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="underline">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
