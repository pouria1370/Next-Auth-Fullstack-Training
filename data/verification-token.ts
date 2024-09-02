import { db } from "@/lib/db";

export const getVerificatinTokenByToken = (token: string) => {
  try {
    const verificatinToken = db.confirmationToken.findUnique({
      where: { token },
    });
    return verificatinToken;
  } catch (error) {
    return null;
  }
};
export const getVerificatinTokenByEmail = (email: string) => {
  try {
    const verificatinToken = db.confirmationToken.findFirst({
      where: { email },
    });
    return verificatinToken;
  } catch (error) {
    return null;
  }
};
