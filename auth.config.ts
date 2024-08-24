import Credentials from 'next-auth/providers/credentials'
import Github from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import type { NextAuthConfig } from "next-auth"
import { LoginSchema } from './schema'
import { getUserByEmail } from './data/user'
import bcrypt from 'bcryptjs'
export default {
  providers: [
   Credentials({
    async authorize(credentials){
      const validateFields = LoginSchema.safeParse(credentials)
      if(validateFields.success){
        const{email,password} = validateFields.data
        const user = await getUserByEmail(email)
        if (!user || !user.password) {
          return null
        }
        const passwordMatch = await bcrypt.compare(password,user.password)
        if(passwordMatch) return user
      }
      return null
    }
   }),
   Github({
clientId:process.env.GITHUB_CLIENT_ID,
clientSecret:process.env.GITHUB_SECRET_ID,
   }),
   Google({
    clientId:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_SECRET_ID,
   })
  ],
} satisfies NextAuthConfig