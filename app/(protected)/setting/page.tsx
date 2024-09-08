"use client";
import { setting } from "@/actions/setting";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { SettingSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserRole } from "@prisma/client";
import { SelectTrigger } from "@radix-ui/react-select";
import { startTransition, useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
const SettingPage = () => {
  const [isPending] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const toast = useToast();
  const form = useForm<z.infer<typeof SettingSchema>>({
    resolver: zodResolver(SettingSchema),
    defaultValues: {
      email: undefined,
      name: undefined,
      newPassword: undefined,
      password: undefined,
      role: UserRole.User,
      twoAuthentication: false,
    },
  });
  const submitHandler = (values: z.infer<typeof SettingSchema>) => {
    console.log("Sdfdsf");

    startTransition(() => {
      setting(values).then((data) => {
        if (data?.error) setError(data?.error);
        if (data?.success) setSuccess(data?.success);
      });
    });
  };

  useEffect(() => {
    if (error) toast.toast({ description: error });
    if (success) toast.toast({ description: success });
  }, [error, success, toast]);

  return (
    <Card className="w-[600px] flex flex-col py-4 space-y-3 mt-5 gap-6">
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submitHandler(form.getValues());
            }}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl {...field}>
                    <Input
                      type="text"
                      placeholder="example@yahoo.com"
                      disabled={isPending}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl {...field}>
                    <Input
                      type="text"
                      placeholder="name"
                      onChange={field.onChange}
                      disabled={isPending}
                    />
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
                  <FormControl {...field}>
                    <Input
                      type="password"
                      placeholder="******"
                      disabled={isPending}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl {...field}>
                    <Input
                      type="password"
                      placeholder="******"
                      disabled={isPending}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="twoAuthentication"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>2AF</FormLabel>
                  <FormDescription>
                    Here you can descide if the 2AF authentiucation be enabled
                    or disabled
                  </FormDescription>
                  <FormControl {...field}>
                    <Switch
                      disabled={isPending}
                      onChange={field.onChange}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    disabled={isPending}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl {...field}>
                      <SelectTrigger>
                        <SelectValue>please select a value</SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={UserRole.Admin}>Admin</SelectItem>
                      <SelectItem value={UserRole.User}>User</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
          <Button type="submit">Confirm</Button>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SettingPage;
