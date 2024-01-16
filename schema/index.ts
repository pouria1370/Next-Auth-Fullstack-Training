import * as z from 'zod'
export const LoginSchema = z.object({
    email: z.string().email({
        message: "this email is invalid"
    }),
    password: z.string().min(2,{
        message:"the password must atleast be 2 chars"
    })
})
export const RegisterSchema = z.object({
    email: z.string().email({
        message: "this email is invalid"
    }),
    password: z.string().min(6,{
        message:"the pasword must atleast be 6 chars"
    }),
    name: z.string().min(2 ,{
        message:"two characters are compulsary"
    })
})
