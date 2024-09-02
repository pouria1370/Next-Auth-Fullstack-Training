"use client";
import React, { useState, useTransition } from "react";
import * as z from "zod";
import { NewResetPasswordSchema } from "@/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { setNewPassword } from "@/actions/setNewPassword";
import { useSearchParams } from "next/navigation";

const NewResetPasswordForm = () => {
  const [success, setSuccess] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const searchedParams = useSearchParams();
  const token = searchedParams.get("token");
  const form = useForm<z.infer<typeof NewResetPasswordSchema>>({
    resolver: zodResolver(NewResetPasswordSchema),
    defaultValues: {
      password: "",
    },
  });
  const submitHandler = (values: z.infer<typeof NewResetPasswordSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      setNewPassword(values, token).then((data) =>
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="******"
                      type="password"
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
            reset Password
          </Button>
        </form>
      </Form>
    </Cardwrapper>
  );
};

export default NewResetPasswordForm;
