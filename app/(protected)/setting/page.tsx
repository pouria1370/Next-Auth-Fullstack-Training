"use client";
import { setting } from "@/actions/setting";
import { FormError } from "@/components/form-errors";
import { FormSuccess } from "@/components/form.success";
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
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useSessionUser } from "@/hooks/useSessionUser";
import { SettingSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserRole } from "@prisma/client";
import { Select } from "@radix-ui/react-select";
import { useSession } from "next-auth/react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
const SettingPage = () => {
  const user = useSessionUser();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { update } = useSession();
  useSession();
  const form = useForm<z.infer<typeof SettingSchema>>({
    resolver: zodResolver(SettingSchema),
  });
  const submitHandler = async (values: z.infer<typeof SettingSchema>) => {
    setSuccess("");
    setError("");
    startTransition(() => {
      setting(values)
        .then((data) => {
          if (data.error) {
            setError(() => data.error);
          }
          if (data.success) {
            setSuccess(() => data.success);
          }
        })
        .then(() => update());
    });
  };

  return (
    <Card className="w-[600px] flex flex-col py-4 space-y-3 mt-5 gap-6">
      <CardContent>
        {!user ? (
          <div>loading...</div>
        ) : (
          <Form {...form}>
            <form
              className="flex flex-col py-4 space-y-3 mt-5 gap-1"
              onSubmit={form.handleSubmit(submitHandler)}
            >
              {!user?.is0Auth && (
                <>
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
                            value={field.value}
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
                        <div className="flex flex-row justify-between items-end">
                          <div>
                            <FormLabel>2AF</FormLabel>
                            <FormDescription>
                              Here you can descide if the 2AF authentiucation be
                              enabled or disabled
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              disabled={isPending}
                              checked={user?.IsTwofactoredEnabled}
                              onCheckedChange={field.onChange}
                              className="bg-red-300"
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
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
                          <SelectValue>{field.value}</SelectValue>
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
              <Button disabled={isPending} type="submit">
                Confirm
              </Button>
            </form>
          </Form>
        )}
        <FormError message={error} />
        <FormSuccess message={success} />
      </CardContent>
    </Card>
  );
};

export default SettingPage;
