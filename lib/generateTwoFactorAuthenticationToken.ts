import { getTwoFactorAuthenticationTokenByEmail } from "@/data/two-factor-authentication-token";
import crypto from "crypto";
import { db } from "./db";
export const generateTwoFactorAuthenticationToken = async (email: string) => {
  const expires = new Date(new Date().getTime() + 1000 * 3600);
  const generatedToken = crypto.randomInt(100_000, 1_000_000).toString();
  const existingUser = getTwoFactorAuthenticationTokenByEmail(email);
  if (!existingUser) {
    await db.twoAuthenticatinToken.delete({
      where: { id: (await existingUser).id },
    });
  } else {
    const generatedSessionToken = await db.twoAuthenticatinToken.create({
      data: {
        token: generatedToken,
        email,
        expires,
      },
    });
    return generatedSessionToken;
  }
};
