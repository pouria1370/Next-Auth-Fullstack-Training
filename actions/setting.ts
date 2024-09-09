"use server";
import { CurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { SettingSchema } from "@/schema";
import bcrypt from "bcryptjs";
import { z } from "zod";
// we must at first certain if the inputs are  valid or not
// tehn we must certain if the user is from credential or 0auth and based on that we must undefined some parts
// we must then

export const setting = async (values: z.infer<typeof SettingSchema>) => {
  const user = await CurrentUser();

  const existingUser = await db?.user.findUnique({
    where: { id: user.userID },
  });
  const existingInputs = SettingSchema.safeParse(values);

  if (existingInputs?.error) return { error: "invalid field" };
  if (existingInputs?.data) {
    if (user?.is0Auth) {
      await db.user.update({
        where: { id: existingUser.id },
        data: {
          name: values?.name,
          role: values?.role,
        },
      });
    } else {
      const isPsswordTrue = await bcrypt.compare(
        values?.password,
        existingUser?.password ?? ""
      );
      if (values.password === values.newPassword) {
        return { error: "new-password is repetitive" };
      }
      if (!isPsswordTrue) {
        return { error: "your password is not valid" };
      }
      await db.user.update({
        where: { id: existingUser.id },
        data: {
          name: values?.name,
          role: values?.role,
          password: values.newPassword
            ? (await bcrypt.hash(values.newPassword, 10)).toString()
            : existingUser.password,
          email: values?.email,
          isTwoAutenticationEnabled: values?.twoAuthentication,
        },
      });
    }
    return { success: "the update process is succeded" };
  }

  return { error: "data is not valid" };
};
