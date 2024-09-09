"use client";
import { login } from "@/actions/login";
import { LoginSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { FormError } from "../form-errors";
import { FormSuccess } from "../form.success";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import Cardwrapper from "./auth-card-wrapper";

const LoginForm = () => {
  const [success, setSuccess] = useState<string | undefined>();
  const [isTwoAuthenticatedEnabled, setIsTwoAuthenticatedEnabled] =
    useState(false);
  const [error, setError] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const submitHandler = (
    values: z.infer<typeof LoginSchema>,
    callbackUrl?: string
  ) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      login(values, callbackUrl).then((data) => {
        if (data?.error) {
          setError(data.error);
        }
        if (data?.success) {
          setSuccess(data?.success);
        }
        if (data?.twoAuthentication) {
          setIsTwoAuthenticatedEnabled(true);
        }
      });
    });
  };
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const authError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "The Email is gotten please try with different Email"
      : "";

  return (
    <Cardwrapper
      headerLable="welcome back"
      backButtonHref="/auth/register"
      backButtonLable="Dont have an account?"
      showSocial
    >
      <Form {...form}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitHandler(form.getValues(), callbackUrl);
          }}
          className="space-y-6"
        >
          <div className="space-y-4">
            {isTwoAuthenticatedEnabled ? (
              <>
                <FormField
                  control={form.control}
                  name="twoAuthentication"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Two Factor</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="your 2af code been sent to your email"
                        ></Input>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            ) : (
              <>
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
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          {...field}
                          placeholder="*****"
                        ></Input>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Link href={"/auth/reset"}>
                  <Button className="px-0 " size="sm" variant="link">
                    Forgot your password?
                  </Button>
                </Link>
              </>
            )}
          </div>
          <FormError message={error || authError} />
          <FormSuccess message={success} />
          <Button type="submit" disabled={isPending} className="w-full mt-5">
            {isTwoAuthenticatedEnabled ? "Confirm" : "Login"}
          </Button>
        </form>
      </Form>
    </Cardwrapper>
  );
};

export default LoginForm;
