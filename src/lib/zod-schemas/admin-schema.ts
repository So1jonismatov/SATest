import { z } from "zod";

export const AdminUserSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }).optional(),
  phone: z.string().min(1, { message: "Phone number is required." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." })
    .optional(),
  role: z.enum(["student", "teacher"]),
});
