'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

interface AuthLoginType  {
mode?:"redirect" | "modal",
asChild?: boolean,
children: React.ReactNode
}
const AuthLogin = ({mode="modal",children,asChild}:AuthLoginType) => {
    const router = useRouter()
    const clickHandler = ( ) => {
    if (mode === "redirect") {
        router.replace('auth/login')
    }
    }

    useEffect(() => {
   
    }, [])
    
  return (
    <span onClick={clickHandler}>
        {children}
    </span>
  )
}

export default AuthLogin