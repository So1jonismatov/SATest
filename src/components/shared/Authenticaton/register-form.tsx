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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatUzbekPhoneNumber } from "@/function/format-phone-number";
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
      first_name: "",
      last_name: "",
      student_phone: "+998 ",
      parent_phone: "+998 ",
      password: "",
      class_id: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof StudentRegisterSchema>) => {
    try {
      await api.auth.student.register({
        ...values,
        class_id: parseInt(values.class_id, 10),
      });

      const loginResult = await api.auth.student.login({
        phone_number: values.student_phone,
        password: values.password,
      });

      if (loginResult) {
        const appUser = mapApiUserToAppUser(loginResult.user);
        authLogin(appUser, loginResult.token);
        const redirectPath = getRedirectPath(appUser);
        navigate(redirectPath);
      }
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
              login page...
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
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="first_name">First Name</Label>
                  <Input
                    id="first_name"
                    placeholder="John"
                    {...form.register("first_name")}
                  />
                  {form.formState.errors.first_name && (
                    <p className="text-destructive text-sm">
                      {form.formState.errors.first_name.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="last_name">Last Name</Label>
                  <Input
                    id="last_name"
                    placeholder="Doe"
                    {...form.register("last_name")}
                  />
                  {form.formState.errors.last_name && (
                    <p className="text-destructive text-sm">
                      {form.formState.errors.last_name.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="student_phone">Student Phone</Label>
                <Input
                  id="student_phone"
                  type="tel"
                  {...form.register("student_phone")}
                  onChange={(e) =>
                    form.setValue(
                      "student_phone",
                      formatUzbekPhoneNumber(e.target.value),
                    )
                  }
                />
                {form.formState.errors.student_phone && (
                  <p className="text-destructive text-sm">
                    {form.formState.errors.student_phone.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="parent_phone">Parent Phone</Label>
                <Input
                  id="parent_phone"
                  type="tel"
                  {...form.register("parent_phone")}
                  onChange={(e) =>
                    form.setValue(
                      "parent_phone",
                      formatUzbekPhoneNumber(e.target.value),
                    )
                  }
                />
                {form.formState.errors.parent_phone && (
                  <p className="text-destructive text-sm">
                    {form.formState.errors.parent_phone.message}
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
              <div className="grid gap-2">
                <Label htmlFor="class_id">Class</Label>
                <Select onValueChange={(val) => form.setValue("class_id", val)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your class" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 10 }, (_, i) => (
                      <SelectItem key={i + 1} value={`${i + 1}`}>
                        {`${i + 1}-sinf`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.formState.errors.class_id && (
                  <p className="text-destructive text-sm">
                    {form.formState.errors.class_id.message}
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
