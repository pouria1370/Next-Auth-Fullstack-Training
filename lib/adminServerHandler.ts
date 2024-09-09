"use server";

import { CurrentUser } from "./auth";

export const adminServerHandler = async () => {
  const user = CurrentUser();
  if ((await user).role === "Admin") return { success: "you have permission" };
  else return { error: "you dont have permission" };
};
