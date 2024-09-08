"use server";

import { signIn } from "@/auth";
import { getTheTwoFactorAuthenticationFromUser } from "@/data/two-factor-authentication-confirmation";
import { getTwoFactorAuthenticationTokenByEmail } from "@/data/two-factor-authentication-token";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { generateTwoFactorAuthenticationToken } from "@/lib/generateTwoFactorAuthenticationToken";
import { generateVerificationToken } from "@/lib/generateVerificationToken";
import { sendTwoAuthenticationCode, sendVerificationEmail } from "@/lib/mail";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schema";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import * as z from "zod";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validateFields = LoginSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "Invalid fields" };
  }
  const { email, password, twoAuthentication } = validateFields.data;
  const existingUser = await getUserByEmail(email);
  const isPassWordTrue = await bcrypt.compare(
    password,
    existingUser?.password ?? ""
  );

  if (!existingUser || existingUser.email !== email || !isPassWordTrue) {
    return { error: "the login informatin does not exist" };
  }
  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );
    sendVerificationEmail(existingUser.email, verificationToken.token);
    return { success: "The verification-email is sent" };
  }

  if (existingUser.isTwoAutenticationEnabled && existingUser.email) {
    if (twoAuthentication) {
      const temporarycCheck = await getTwoFactorAuthenticationTokenByEmail(
        existingUser.email
      );
      if (twoAuthentication !== temporarycCheck?.token)
        return { error: "2af code is not valid" };
      if (
        new Date(temporarycCheck.expires).getTime() >
        new Date().getTime() + 1000 * 3600
      )
        return { error: "2af code is expired" };
      await db.twoAuthenticatinToken.delete({
        where: { id: temporarycCheck.id },
      });
      const checkTwofactorAuthConfirmation =
        await getTheTwoFactorAuthenticationFromUser(existingUser.id);
      if (checkTwofactorAuthConfirmation)
        await db.twoAuthenticationConfirmation.delete({
          where: { id: checkTwofactorAuthConfirmation.id },
        });
      await db.twoAuthenticationConfirmation.create({
        data: { userId: existingUser.id },
      });
    } else {
      const temporarycCheck = await getTwoFactorAuthenticationTokenByEmail(
        existingUser.email
      );
      if (temporarycCheck)
        await db.twoAuthenticatinToken.delete({
          where: { id: temporarycCheck.id },
        });
      const token = await generateTwoFactorAuthenticationToken(
        existingUser.email
      );
      await sendTwoAuthenticationCode(existingUser.email, token.token);
      return { twoAuthentication: "code is sent" };
    }
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
