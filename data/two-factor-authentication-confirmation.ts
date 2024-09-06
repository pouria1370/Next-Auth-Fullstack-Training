import { db } from "@/lib/db";

export const getTheTwoFactorAuthenticationFromUser = async (userId: string) => {
  try {
    const twoFactorAuthentication =
      await db.twoAuthenticationConfirmation.findUnique({ where: { userId } });
    return twoFactorAuthentication;
  } catch (error) {
    return null;
  }
};
