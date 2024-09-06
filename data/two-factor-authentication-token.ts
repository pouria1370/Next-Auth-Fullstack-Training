import { db } from "@/lib/db";

export const getTwoFactorAuthenticationTokenByEmail = async (email: string) => {
  try {
    const token = await db.twoAuthenticatinToken.findFirst({
      where: { email },
    });
    return token;
  } catch (error) {
    return null;
  }
};
export const getTwoFactorAuthenticationTokenByToken = async (token: string) => {
  try {
    const fetchedToken = db.twoAuthenticatinToken.findUnique({
      where: { token },
    });
    return fetchedToken;
  } catch (error) {
    return null;
  }
};
