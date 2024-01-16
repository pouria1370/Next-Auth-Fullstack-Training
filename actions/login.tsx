'use server'

import { LoginSchema } from "@/schema"
import * as z from "zod"

export const login = async(values: z.infer<typeof LoginSchema>) => {
const revalidatePhase = LoginSchema.safeParse(values)

if (!revalidatePhase.success) {
 return {error:"Invalid fields"};
 }
 return {success:"valid inputs"}   
}