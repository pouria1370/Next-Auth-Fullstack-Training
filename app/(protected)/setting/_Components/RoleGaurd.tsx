"use client";
import { FormError } from "@/components/form-errors";
import { Card, CardContent } from "@/components/ui/card";
import { useSessionUser } from "@/hooks/useSessionUser";
import React from "react";

const RoleGaurd = ({ children }: { children: React.ReactNode }) => {
  const user = useSessionUser();
  return (
    <Card className="w-[600px] mt-3">
      <CardContent className="flex flex-col items-center justify-center mt-5">
        {user?.role === "Admin" ? (
          children
        ) : (
          <FormError message="you dont have permission to enter to this page" />
        )}
      </CardContent>
    </Card>
  );
};

export default RoleGaurd;
