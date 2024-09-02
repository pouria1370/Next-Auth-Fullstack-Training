"use server";

import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/generateVerificationToken";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schema";
import { AuthError } from "next-auth";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/lib/mail";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validateFields = LoginSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "Invalid fields" };
  }
  const { email, password } = validateFields.data;
  const existingUser = await getUserByEmail(email);
  if (
    !existingUser ||
    existingUser.email !== email ||
    !bcrypt.compare(existingUser.password, password)
  ) {
    return { error: "the login informatin does not exist" };
  }
  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );
    sendVerificationEmail(existingUser.email, verificationToken.token);
    return { success: "The verification-email is sent" };
  }
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "sign in  failed" };

        default:
          return { error: "someThing went wrong" };
      }
    }
    throw error;
  }
};
