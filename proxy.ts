import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  // Protéger les routes admin
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // Exclure la page de login et les assets
    if (
      request.nextUrl.pathname === "/login" ||
      request.nextUrl.pathname.startsWith("/admin/_next") ||
      request.nextUrl.pathname.startsWith("/admin/api")
    ) {
      return NextResponse.next();
    }

    // Vérifier la session better-auth
    const sessionCookie = request.cookies.get("better-auth.session_token");

    if (!sessionCookie) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
