import { UserRole } from "@prisma/client";
import * as z from "zod";
export const LoginSchema = z.object({
  email: z.string().email({
    message: "this email is invalid",
  }),
  password: z.string().min(2, {
    message: "the password must atleast be 2 chars",
  }),
  twoAuthentication: z.optional(z.string().min(6).max(6)),
});

export const SettingSchema = z
  .object({
    password: z.optional(z.string()),
    newPassword: z.optional(z.string()),
    name: z.string(),
    role: z.enum([UserRole.Admin, UserRole.User]),
    twoAuthentication: z.boolean(),
    email: z.optional(z.string()),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) return false;
      return true;
    },
    { message: "new password is required", path: ["newPassword"] }
  );

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "this email is invalid",
  }),
  password: z.string().min(6, {
    message: "the pasword must atleast be 6 chars",
  }),
  name: z.string().min(2, {
    message: "two characters are compulsary",
  }),
});
export const ResetPasswordSchema = z.object({
  email: z.string().email({
    message: "this email is invalid",
  }),
});
export const NewResetPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "the pasword must atleast be 6 chars",
  }),
});
