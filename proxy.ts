import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/auth/session";

const publicRoutes = ["/login", "/sign-up"];

export async function proxy(req: NextRequest): Promise<NextResponse<unknown>> {
  const { pathname } = req.nextUrl;
  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  if (isPublicRoute) {
    const session = await getSession();
    if (session) return NextResponse.rewrite(new URL("/_not-found/", req.url));
  }

  return NextResponse.next();
}
