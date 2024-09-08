import { UserRole } from "@prisma/client";
import { DefaultSession } from "next-auth";

export type TExtendedUser = DefaultSession["user"] & {
  IsTwofactoredEnabled?: boolean;
  userID?: string;
  address?: string;
  role?: UserRole;
  is0Auth?: boolean;
};

declare module "next-auth" {
  interface Session {
    user: TExtendedUser;
  }
}
