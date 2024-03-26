'use server'

import * as z from 'zod'
import { RegisterSchema } from "@/schema"
import { db } from '@/lib/db';
import bcrypt from 'bcrypt'
import { getUserByEmail } from '@/data/user';
export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validateSchema = RegisterSchema.safeParse(values);
    if (!validateSchema.success) {
        return { error: "The inputs are invalid" }
    }
    const { email, password, name } = validateSchema.data;
    const hashPassword = await bcrypt.hash(password, 10)
    const uniqueEmail = await getUserByEmail(email)
    
    if (uniqueEmail) {
        return { error: "the email is registered" }
    }
    else {
        await db.user.create({
            data: {
                name,
                email,
                password: hashPassword
            }
        })
        return { success: "User is created" }
    }

}