"use client";
import { Button } from "@/components/ui/button";
import { useSessionUser } from "@/hooks/useSessionUser";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaUser } from "react-icons/fa";
import LogoutButton from "./LoginButton";
const Navbar = () => {
  const pathName = usePathname();
  const client = useSessionUser();
  return (
    <div className="flex min-w-[600px] mx-auto bg-slate-100 p-4 rounded-lg items-center flex-row justify-between">
      <div className="flex flex-row gap-4 justify-between">
        <Button
          asChild
          variant={pathName === "/setting" ? "default" : "outline"}
        >
          <Link href={"/setting"}>setting</Link>
        </Button>
        <Button
          asChild
          variant={pathName === "/server" ? "default" : "outline"}
        >
          <Link href={"/server"}>server</Link>
        </Button>
        <Button asChild variant={pathName === "/admin" ? "default" : "outline"}>
          <Link href={"/admin"}>admin</Link>
        </Button>
        <Button
          asChild
          variant={pathName === "/client" ? "default" : "outline"}
        >
          <Link href={"/client"}>client</Link>
        </Button>
      </div>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage
                className="size-10 rounded-full"
                src={client?.image}
              />
              <AvatarFallback className="bg-sky-600 rounded-full">
                <FaUser />
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-white rounded mt-2 shadow-lg p-2"
          >
            <DropdownMenuLabel className="text-display-md">
              user panel
            </DropdownMenuLabel>
            <DropdownMenuItem>
              <LogoutButton />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Navbar;
