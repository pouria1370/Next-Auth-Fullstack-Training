import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { DefaultSession } from "next-auth";
import authConfig from "./auth.config";
import { getTheTwoFactorAuthenticationFromUser } from "./data/two-factor-authentication-confirmation";
import { getUserById } from "./data/user";
import { db } from "./lib/db";

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      address: string;
      userID: string;
      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       */
    } & DefaultSession["user"];
  }
}

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
      if (token.sub && session.user) {
        session.user.userID = token.userID as string;
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
