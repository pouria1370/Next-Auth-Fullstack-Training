"use server";

import { getUserByEmail } from "@/data/user";
import { ResetPasswordSchema } from "@/schema";
import * as z from "zod";
import { sendResetPasswordEmail } from "@/lib/mail";
import { generateResetPasswordToken } from "@/lib/generateResetPasswordToken";

export const resetPassword = async (
  values: z.infer<typeof ResetPasswordSchema>
) => {
  const resetPasswordField = ResetPasswordSchema.safeParse(values);
  if (!resetPasswordField.success) {
    return { error: "Invalid fields" };
  }
  const { email } = resetPasswordField.data;
  const existingUser = await getUserByEmail(email);
  if (!existingUser || existingUser.email !== email) {
    return { error: "the Information does not exist" };
  }
  if (existingUser.emailVerified) {
    const verificationToken = await generateResetPasswordToken(
      existingUser.email
    );
    sendResetPasswordEmail(existingUser.email, verificationToken.token);
    return { success: "The reset-email is sent" };
  }
};
