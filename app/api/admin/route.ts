import { CurrentUser } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const user = await CurrentUser();
  if (user.role === "Admin") return new NextResponse(null, { status: 203 });
  else return new NextResponse(null, { status: 403 });
}
