import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { api } from "@/api/real";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { GeneralLoginSchema } from "@/lib/zod-schemas/auth-schema";
import { Link, useNavigate } from "react-router-dom";
import { mapApiUserToAppUser } from "@/function/Authentication/user-mapper";
import { Home } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { useEffect } from "react";
import { formatUzbekPhoneNumber } from "@/function/format-phone-number";
import getRedirectPath from "@/function/Authentication/login-functions";

interface GeneralLoginFormProps extends React.ComponentProps<"div"> {
  role: "teacher" | "admin" | "parent";
}

export function GeneralLoginForm({
  className,
  role,
  ...props
}: GeneralLoginFormProps) {
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();
  const { theme } = useTheme();

  const form = useForm<z.infer<typeof GeneralLoginSchema>>({
    resolver: zodResolver(GeneralLoginSchema),
    defaultValues: {
      phone: "+998 ", // 👈 initial value
      password: "",
    },
  });

  // auto-format phone number on change
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "phone" && value.phone !== undefined) {
        const formatted = formatUzbekPhoneNumber(value.phone);
        if (formatted !== value.phone) {
          form.setValue("phone", formatted, { shouldValidate: true });
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const onSubmit = async (values: z.infer<typeof GeneralLoginSchema>) => {
    try {
      let result;
      const cleanedPhoneNumber = values.phone.replace(/\s/g, "");

      if (role === "parent") {
        result = await api.auth.parent.login({
          parent_phone: cleanedPhoneNumber,
          password: values.password,
        });
      } else {
        result = await api.auth[role].login({
          phone_number: cleanedPhoneNumber,
          password: values.password,
        });
      }

      if (result) {
        const appUser = mapApiUserToAppUser(result.user);
        authLogin(appUser, result.token);
        const redirectPath = getRedirectPath(appUser);
        navigate(redirectPath);
      } else {
        form.setError("root", {
          message: "Invalid credentials. Please try again.",
        });
      }
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
          <CardTitle className="text-xl">
            {role
              ? `${role.charAt(0).toUpperCase() + role.slice(1)} Login`
              : "Login"}
          </CardTitle>
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
              {/* Phone */}
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+998 99 123 45 67"
                  required
                  {...form.register("phone")}
                />
                {form.formState.errors.phone && (
                  <p className="text-destructive text-sm">
                    {form.formState.errors.phone.message}
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
        </CardContent>
      </Card>
    </div>
  );
}
