'use server'

import { getUserByEmail } from "@/data/user"
import { NewResetPasswordSchema } from "@/schema"
import * as z from "zod"
import bcrypt from "bcryptjs"
import { getResetPasswordTokenByToken } from "@/data/reset-password-token"
import { db } from "@/lib/db"

export const setNewPassword = async (values: z.infer<typeof NewResetPasswordSchema>,token:string) => {
    const resetPasswordField = NewResetPasswordSchema.safeParse(values);
    if (!resetPasswordField.success) {
        return { error: "Invalid fields" }
    }
    const { password } = resetPasswordField.data
    const NewResetPasswordSchemaPasswordToken = await getResetPasswordTokenByToken(token)
    const existingUser = await getUserByEmail(NewResetPasswordSchemaPasswordToken.email)
    if (!existingUser) {
       return {error:"the user does not exist"} 
    }
    if (existingUser.password) {
       await db.user.update({
            where:{email:existingUser.email},
            data:{
                password: await bcrypt.hash(password, 10)
            }
        })
        await db.resetPasswordToken.delete({where:{token}})
        return {success:"The password is successfully got reset"}
    }
}
