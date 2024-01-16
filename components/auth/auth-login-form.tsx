'use client'
import React, { useState, useTransition } from 'react'
import * as z from 'zod'
import { LoginSchema } from '@/schema'
import Cardwrapper from './auth-card-wrapper'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { FormError } from '../form-errors'
import { FormSuccess } from '../form.success'
import { login } from '@/actions/login'

const LoginForm = () => {
  const[success,setSuccess] = useState<string>()
  const[error,setError] = useState<string>()
  const[isPending,startTransition] = useTransition()
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })
  const submitHandler = (values: z.infer<typeof LoginSchema>) => {
    setError("")
    setSuccess("")
    startTransition(() => {
      login(values).then(data => !data.success ? setError(data.error) : setSuccess(data.success))
    })

  }

  
  return (
    <Cardwrapper
      headerLable='welcome back'
      backButtonHref='/auth/register'
      backButtonLable='Dont have ana account?'
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitHandler)}
          className='space-y-6'
        >
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder='pouriaKalantari@example.com'
                      type='email'
                    ></Input>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                    disabled={isPending}
                      {...field}
                      placeholder='*****'
                    ></Input>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type='submit' disabled={isPending} className='w-full mt-5'>Login</Button>
        </form>
      </Form>
    </Cardwrapper>
  )
}

export default LoginForm