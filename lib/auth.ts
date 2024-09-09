"use server";
import { auth } from "@/auth";
export const CurrentUser = async () => {
  const currentUser = await auth();
  return currentUser?.user ?? undefined;
};
