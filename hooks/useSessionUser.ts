import { useSession } from "next-auth/react";

export const useSessionUser = () => {
  const data = useSession();
  return data?.data?.user;
};
