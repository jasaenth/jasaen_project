import { z } from "zod";

export const adminRegisterSchema = z.object({
  fullName: z
    .string()
    .min(3, "Full name must be at least 3 characters"),

  email: z
    .string()
    .email("Invalid email address"),

  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),

  role: z.enum(["ADMIN", "STAFF"]),
});

export const adminLoginSchema = z.object({
  email: z
    .string()
    .email("Invalid email address"),

  password: z
    .string()
    .min(
      6,
      "Password must be at least 6 characters"
    ),
});