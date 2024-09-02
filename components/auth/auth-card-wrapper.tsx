"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardDescription,
  CardTitle,
} from "../ui/card";
import Header from "./auth-header";
import Social from "./auth-social";
import { BackButton } from "./auth-backButton";

interface CardwrapperProps {
  children: React.ReactNode;
  headerLable: string;
  backButtonLable: string;
  backButtonHref: string;
  showSocial?: boolean;
}

const Cardwrapper = ({
  children,
  headerLable,
  backButtonHref,
  backButtonLable,
  showSocial,
}: CardwrapperProps) => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header lable={headerLable} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter>
        <BackButton lable={backButtonLable} href={backButtonHref} />
      </CardFooter>
    </Card>
  );
};

export default Cardwrapper;
