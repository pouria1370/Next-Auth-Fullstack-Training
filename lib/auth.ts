import { auth } from "@/auth";
export const CurrentUser = async () => {
  const currentUser = (await auth())?.user;
  return currentUser;
};
