import { PrismaAdapter } from "@auth/prisma-adapter";
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
    async signIn({ user }) {
      const isUserVerified = await getUserById(user.id);
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
      return true;
    },
    async redirect({ baseUrl }) {
      return baseUrl;
    },
    async session({ session, token }) {
      const userFromDB = await db.user.findUnique({
        where: { id: token.userID as string },
      });
      const accountFromoDb = await db?.account?.findFirst({
        where: {
          id: token.userID as string,
        },
      });
      if (token.sub && session.user) {
        session.user.userID = token.userID as string;
        session.user.IsTwofactoredEnabled =
          userFromDB.isTwoAutenticationEnabled;
        session.user.role = userFromDB.role;
        session.user.address = "Iran,Tehran.FerdowsBlv";
        session.user.is0Auth = !!accountFromoDb?.providerAccountId;
      }
      return session;
    },
    async jwt({ token }) {
      token.userID = token.sub;
      return token;
    },
  },
  session: { strategy: "jwt" },
  adapter: PrismaAdapter(db),
  ...authConfig,
});
