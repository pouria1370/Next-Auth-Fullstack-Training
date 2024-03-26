import NextAuth from "next-auth"
import authConfig from './auth.config'
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "./lib/db"
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true
    },
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
    async session({ session, user, token }) {
     if(token.sub && session.user){
      session.user.userID = token.userID
     }
      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {
     token.userID = token.sub
      return token
    }
  },
    adapter: PrismaAdapter(db),
    session : {strategy:'jwt'},
  ...authConfig,
})