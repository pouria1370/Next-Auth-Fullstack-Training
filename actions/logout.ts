"use server";
import { signOut } from "@/auth";

const customLogout = async () => {
  await signOut();
};
export default customLogout;
