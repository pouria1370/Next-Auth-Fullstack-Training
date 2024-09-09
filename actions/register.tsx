"use server";

import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { generateVerificationToken } from "@/lib/generateVerificationToken";
import { sendVerificationEmail } from "@/lib/mail";
import { RegisterSchema } from "@/schema";
import bcrypt from "bcrypt";
import * as z from "zod";
export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validateSchema = RegisterSchema.safeParse(values);
  if (!validateSchema.success) {
    return { error: "The inputs are invalid" };
  }
  const { email, password, name } = validateSchema.data;
  const hashPassword = await bcrypt.hash(password, 10);
  const uniqueEmail = await getUserByEmail(email);

  if (uniqueEmail) {
    return { error: "the email is registered" };
  } else {
    await db.user.create({
      data: {
        name,
        email,
        password: hashPassword,
      },
    });

    const verificationToken = await generateVerificationToken(email);
    sendVerificationEmail(verificationToken.email, verificationToken.token);
    return { success: "Confirmation Email is sent" };
  }
};
