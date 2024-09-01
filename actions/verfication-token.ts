'use server'
import { getUserByEmail } from '@/data/user'
import { getVerificatinTokenByToken } from '@/data/verification-token'
import { db } from '@/lib/db'

const verficationToken = async (token:string) => {
    const currentVerificationTokenBearer = await getVerificatinTokenByToken(token)   
    const existingUser = await getUserByEmail(currentVerificationTokenBearer?.email)
    if(!existingUser || !existingUser.email) return {error:"the user does not exist"}
    if(new Date(currentVerificationTokenBearer.expires) > new Date()) return {error:"the token is expired"}
    if(new Date(currentVerificationTokenBearer.expires) <= new Date()) {
        await db.confirmationToken.delete({where:{token,id:currentVerificationTokenBearer?.id}})
        await db.user.update({
            where:{id:existingUser.id},
            data:{
                emailVerified: new Date(),
                email: existingUser.email

            }
        })

        return {success:"the verificatin is completed"}
    }
    
    /**
     * 1: first get the existing user from db from the token
     * 2: then if we have not the targeted users we must return error : sue does not exist
     * 3: if existing user has not email or password we must retrun error
     * 4: if current user exist but the token is expired we must retrun error
     * 5: otherwise we must retrun success and delete the verification token
     */
}

export default verficationToken