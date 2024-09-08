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
  const existingUser = await db.user.findUnique({ where: { id: user.id } });
  const existingInputs = SettingSchema.safeParse(values);
  if (existingInputs.error) return { error: "invalid field" };
  if (existingInputs.data) {
    if (user.is0Auth) {
      await db.user.update({
        where: { id: existingUser.id },
        data: {
          name: values?.name,
          role: values?.role,
        },
      });
    } else {
      if (values.password === values.newPassword)
        return { error: "new-password is repetitive" };
      await db.user.update({
        where: { id: existingUser.id },
        data: {
          name: values?.name,
          role: values?.role,
          password: (await bcrypt.hash(values.newPassword, 10)).toString(),
          email: values?.email,
          isTwoAutenticationEnabled: values?.twoAuthentication,
        },
      });
    }
  }
  return { success: "the update process is succeded" };
};
