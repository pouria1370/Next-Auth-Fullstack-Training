import { PrismaAdapter } from "@auth/prisma-adapter";
import { UserRole } from "@prisma/client";
import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { getTheTwoFactorAuthenticationFromUser } from "./data/two-factor-authentication-confirmation";
import { getUserById } from "./data/user";
import { db } from "./lib/db";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  callbacks: {
    async signIn({ user, credentials }) {
      if (credentials) {
        const isUserVerified = await getUserById(user.id);
        if (!isUserVerified) return false;
        if (isUserVerified.isTwoAutenticationEnabled) {
          const haveToken = await getTheTwoFactorAuthenticationFromUser(
            isUserVerified.id
          );

          if (!haveToken) {
            return false;
          }
          // await db.confirmationToken.delete({ where: { id: isUserVerified.id } });
        }
        if (!isUserVerified || !isUserVerified.emailVerified) {
          return false;
        }
      }
      return true;
    },
    async redirect({ baseUrl }) {
      return baseUrl;
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.userID = token.userID as string;
        session.user.IsTwofactoredEnabled =
          token.isTwoAutenticationEnabled as boolean;
        session.user.role = token.role as UserRole;
        session.user.address = "Iran,Tehran.FerdowsBlv";
        session.user.is0Auth = token?.is0Auth as boolean;
        session.user.name = token.name;
      }
      return session;
    },
    async jwt({ token }) {
      const userFromDB = await db.user.findUnique({
        where: { id: token.sub as string },
      });
      const accountFromoDb = await db?.account?.findFirst({
        where: {
          userId: token.sub as string,
        },
      });
      token.userID = userFromDB.id;
      token.is0Auth = !!accountFromoDb?.providerAccountId;
      token.isTwoAutenticationEnabled = userFromDB.isTwoAutenticationEnabled;
      token.role = userFromDB.role as UserRole;
      token.name = userFromDB.name;

      return token;
    },
  },
  session: { strategy: "jwt" },
  adapter: PrismaAdapter(db),
  ...authConfig,
});
