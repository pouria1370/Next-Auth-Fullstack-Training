"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { FaSignOutAlt } from "react-icons/fa";

const LogoutButton = () => {
  return (
    <Button
      variant="ghost"
      className="gap-2 flex flex-row justify-between  text-red-600"
      onClick={() => signOut()}
    >
      sign out
      <FaSignOutAlt />
    </Button>
  );
};

export default LogoutButton;
