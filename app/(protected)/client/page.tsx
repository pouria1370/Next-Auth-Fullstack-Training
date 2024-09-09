"use client";

import ShowSession from "@/app/auth/show-session/ShowSession";
import { useSessionUser } from "@/hooks/useSessionUser";

const ClientPage = () => {
  const currentuser = useSessionUser();
  console.log(currentuser);

  return <ShowSession label="Client Component" user={currentuser} />;
};

export default ClientPage;
