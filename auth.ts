import NextAuth from "next-auth"
import authConfig from './auth.config'
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "./lib/db"
import { getUserById } from "./data/user"
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  events:{
    async linkAccount({user}){
      await db.user.update({
        where:{id:user.id},
        data:{emailVerified:new Date()}
      })
    }
  },
  pages:{
    signIn:"/auth/login",
    error:"/auth/error"
  },
  callbacks: {
    // async signIn({ user, account, profile, email, credentials }) {
    //   const isUserVerified = await getUserById(user.id);
    //   if (!isUserVerified || !isUserVerified.emailVerified) {
    //     return false
    //   }
    //   return true
    // },
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
    async session({ session,token }) {
     if(token.sub && session.user){
      session.user.userID = token.userID
     }
      return session
    },
    async jwt({ token}) {
     token.userID = token.sub
      return token
    }
  },
    adapter: PrismaAdapter(db),
    session : {strategy:'jwt'},
  ...authConfig,
})