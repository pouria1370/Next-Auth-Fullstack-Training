"use client";
import React, { useState, useTransition } from "react";
import * as z from "zod";
import { ResetPasswordSchema } from "@/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPassword } from "@/actions/reset-password";
import { FormError } from "@/components/form-errors";
import { FormSuccess } from "@/components/form.success";
import { Input } from "@/components/ui/input";
import Cardwrapper from "@/components/auth/auth-card-wrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

const ResetPasswordForm = () => {
  const [success, setSuccess] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });
  const submitHandler = (values: z.infer<typeof ResetPasswordSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      resetPassword(values).then((data) =>
        data?.error ? setError(data.error) : setSuccess(data?.success)
      );
    });
  };
  return (
    <Cardwrapper
      headerLable="Reset Password"
      backButtonHref="/auth/login"
      backButtonLable="back to login"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="pouriaKalantari@example.com"
                      type="email"
                    ></Input>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit" disabled={isPending} className="w-full mt-5">
            send reset email
          </Button>
        </form>
      </Form>
    </Cardwrapper>
  );
};

export default ResetPasswordForm;
