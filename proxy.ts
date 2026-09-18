import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

const publicRoutes = ["/login", "/sign-up"];
const SECRET_KEY = process.env.JWT_SECRET;
if (!SECRET_KEY) throw new Error("JWT_SECRET is not defined");
const encodedKey = new TextEncoder().encode(SECRET_KEY);

export async function proxy(req: NextRequest): Promise<NextResponse<unknown>> {
  const { pathname } = req.nextUrl;
  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  if (isPublicRoute) {
    const session = req.cookies.get("session")?.value;
    if (!session) return NextResponse.next();

    try {
      await jwtVerify(session, encodedKey, {
        algorithms: ["HS256"],
      });
      return NextResponse.redirect(new URL("/", req.url));
    } catch {
      const res = NextResponse.next();
      res.cookies.delete("session");
      return res;
    }
  }

  return NextResponse.next();
}
