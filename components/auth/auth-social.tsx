"use client";

import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { FaGithub, FaGitlab, FaGoogle } from "react-icons/fa";
import { Button } from "../ui/button";
const Social = () => {
  const searchParams = useSearchParams();
  const urlCallback = searchParams.get("callbackUrl");
  const signInHandler = (provider: "github" | "google" | "gitlab") => {
    signIn(provider, {
      callbackUrl: urlCallback || DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="flex w-full items-center gap-x-2">
      <Button
        size="lg"
        variant="outline"
        onClick={() => signInHandler("google")}
        className="w-full"
      >
        <FaGoogle className="h-5 w-5" />
      </Button>
      <Button
        size="lg"
        variant="outline"
        onClick={() => signInHandler("github")}
        className="w-full"
      >
        <FaGithub className="h-5 w-5" />
      </Button>
      <Button
        size="lg"
        variant="outline"
        onClick={() => signInHandler("gitlab")}
        className="w-full"
      >
        <FaGitlab className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default Social;
