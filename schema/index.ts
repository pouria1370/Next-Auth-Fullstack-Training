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
    password: z.optional(
      z.string().min(6, { message: "minimum 6 characters must be input" })
    ),
    newPassword: z.optional(z.string()),
    name: z.optional(z.string()),
    role: z.optional(z.enum([UserRole.Admin, UserRole.User])),
    twoAuthentication: z.optional(z.boolean()),
    email: z.optional(z.string()),
  })
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }
      return true;
    },
    {
      message:
        "password must be entered(new-password is just for changing the current password)",
      path: ["password"],
    }
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
