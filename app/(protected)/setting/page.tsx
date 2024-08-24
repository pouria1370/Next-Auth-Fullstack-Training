import { auth, signOut } from '@/auth'
import React from 'react'
import * as z from "zod"
const SettingPage  = async () => {
  const educations = z.enum(["bachelor","master","diploma","doctorin"])
 const schema = z.object({
  name:z.string({invalid_type_error:"invalid input",required_error:"required"}).max(12,{message:"your input must be smaller than 12"}).ip({version:"v4",message:"please enter the valid input"}),
  family:z.string({invalid_type_error:"the type must eb string"}).startsWith("hello",{message:"hello must not be started for this"});
  age:z.number({required_error:"this is required",invalid_type_error:"please enter the number"}).nonnegative({message:"please enter the positive value"}).min(14,{message:"the min value is 15"}),
  educations:educations.exclude(["bachelor","master"])
}).extend({agee:z.boolean()}).required({agee:true})
type TSchema = z.infer<typeof schema>



  return ( 
    <div>d
    </div>
  )
}

export default SettingPage