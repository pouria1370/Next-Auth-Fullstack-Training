'use client'
import { useSearchParams } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'
import Cardwrapper from './auth-card-wrapper'
import {BeatLoader} from 'react-spinners'
import { FormError } from '../form-errors'
import { FormSuccess } from '../form.success'
import verficationToken from '@/actions/verfication-token'
const AuthVerificationTokenForm = () => {
    const [error, setError] = useState<string|undefined>()
    const [success, setSuccess] = useState<string|undefined>()
    const searchParams = useSearchParams()
    const Token = searchParams.get("token")
    const verificationHandler = useCallback(() =>{
        verficationToken(Token)
          .then((data) => {
            setSuccess(data.success);
            setError(data.error);
          })
          .catch((error) => setError(error));
    },[Token])
    
    

    useEffect(() => {
        verificationHandler()
    }, [verificationHandler])
    
  return (
    <Cardwrapper
    headerLable='verification Token'
    backButtonLable='back to Login'
    backButtonHref='./auth/login'
    >
        <div className='flex flex-col justify-center items-center'>
        {!error && !success && <BeatLoader/>}
     <FormError message={error}/>
        <FormSuccess message={success as string}/>
        </div>

    </Cardwrapper>
  )
}

export default AuthVerificationTokenForm