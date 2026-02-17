// proxy.ts
import { auth } from "@/lib/auth"; // ton instance Better Auth
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protéger uniquement les routes /admin
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  try {
    // Récupérer la session depuis les cookies
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    // Si pas de session → redirection vers login
    if (!session) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Optionnel : vérifier le rôle admin
    if (session.user.role !== "admin") {
      return NextResponse.redirect(new URL("/profile", request.url));
    }

    // Session valide → accès autorisé
    return NextResponse.next();
  } catch (error) {
    console.error("Auth proxy error:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
