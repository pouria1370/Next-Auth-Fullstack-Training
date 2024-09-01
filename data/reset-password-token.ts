import { db } from "@/lib/db"

export const getResetPasswordTokenByToken = (token:string) => {
    try {
        const restPassword = db.resetPasswordToken.findUnique({where:{token}})
        return restPassword
    } catch (error) {
        return null
    }
}
export const getResetPasswordTokenByEmail = (email:string) => {
    try {
        const restPassword = db.resetPasswordToken.findFirst({where:{email}})
        return restPassword
    } catch (error) {
        return null
    }
}