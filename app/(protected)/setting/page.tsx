import { auth, signOut } from '@/auth'
import React from 'react'

const SettingPage  = async () => {
  const session = await auth()
  return ( 
    <div>
   {JSON.stringify(session)}
   <form action={async() =>{
    'use server'
    console.log("i have signout");
    await signOut()
    
   }}>
    <button type='submit'>sign out</button>
   </form>
    </div>
  )
}

export default SettingPage