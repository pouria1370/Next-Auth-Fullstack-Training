import { getVerificatinTokenByEmail } from "@/data/verification-token";
import {v4 as uuid} from "uuid"
import { db } from "./db";

export const generateVerificationToken = async (email:string) => {
    const token = uuid();
    const expires = new Date(new Date().getTime() + 3600 + 1000)
    const exsistingToken = await getVerificatinTokenByEmail(email)

    if (exsistingToken) {
        await db.confirmationToken.delete({
            where:{
                id:exsistingToken.id
            }
        })
    }

    const verificationToken = await db.confirmationToken.create({
        data:{
            email,
            token,
            expires
        }
    })
    return verificationToken
}