import { getResetPasswordTokenByEmail } from "@/data/reset-password-token";
import { v4 as uuid } from "uuid";
import { db } from "./db";

export const generateResetPasswordToken = async (email: string) => {
  const token = uuid();
  const expiryDate = new Date(new Date().getTime() + 1000 * 3600);
  const currentResetPasswordToken = await getResetPasswordTokenByEmail(email);
  if (currentResetPasswordToken) {
    const currentResetPassword = await getResetPasswordTokenByEmail(email);
    await db.resetPasswordToken.delete({
      where: { id: currentResetPassword.id },
    });
  }

  const resetPasswordToken = await db.resetPasswordToken.create({
    data: {
      email,
      token,
      expires: expiryDate,
    },
  });
  return resetPasswordToken;
};
