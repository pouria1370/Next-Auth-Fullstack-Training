"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

interface AuthLoginType {
  mode?: "redirect" | "modal";
  asChild?: boolean;
  children: React.ReactNode;
}
const AuthLogin = ({ mode = "modal", children }: AuthLoginType) => {
  const searchParams = useSearchParams();
  const urlCallback = searchParams.get("callbackUrl");
  console.log(urlCallback);

  const router = useRouter();
  const clickHandler = () => {
    if (mode === "redirect") {
      router.replace("auth/login");
    }
    if (mode === "modal") {
      router.replace(urlCallback || "setting");
    }
  };

  useEffect(() => {}, []);

  return <span onClick={clickHandler}>{children}</span>;
};

export default AuthLogin;
