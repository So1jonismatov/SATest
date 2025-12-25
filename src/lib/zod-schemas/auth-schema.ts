import { z } from "zod";

// Schema for the student registration form
export const StudentRegisterSchema = z.object({
  first_name: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." }),
  last_name: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." }),
  student_phone: z
    .string()
    .transform((val) => val.replace(/\s/g, ""))
    .pipe(z.string().min(9, "Phone number is required"))
    .pipe(
      z
        .string()
        .regex(/^\+998\d{9}$/, "Invalid phone format. Must be +998XXXXXXXXX"),
    ),
  parent_phone: z
    .string()
    .transform((val) => val.replace(/\s/g, ""))
    .pipe(z.string().min(9, "Phone number is required"))
    .pipe(
      z
        .string()
        .regex(/^\+998\d{9}$/, "Invalid phone format. Must be +998XXXXXXXXX"),
    ),
  password: z.string(),
  class_id: z.string().min(1, { message: "Please select a class." }),
});

// Schema for the parent registration form
export const ParentRegisterSchema = z.object({
  first_name: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." }),
  last_name: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." }),
  parent_phone: z
    .string()
    .transform((val) => val.replace(/\s/g, ""))
    .pipe(z.string().min(9, "Phone number is required"))
    .pipe(
      z
        .string()
        .regex(/^\+998\d{9}$/, "Invalid phone format. Must be +998XXXXXXXXX"),
    ),
  password: z.string(),
});

export const StudentLoginSchema = z.object({
  phone: z
    .string()
    .regex(/^\+998\s?\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$/, "Invalid phone format"),
  password: z.string(),
});

export const GeneralLoginSchema = z.object({
  phone: z
    .string()
    .transform((val) => val.replace(/\s/g, ""))
    .pipe(z.string().min(9, "Phone number is required"))
    .pipe(
      z
        .string()
        .regex(/^\+998\d{9}$/, "Invalid phone format. Must be +998XXXXXXXXX"),
    ),
  password: z.string(),
});
