import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const sessionToken =
    request.cookies.get("sessionId")?.value ||
    request.cookies.get("refreshToken")?.value

  const isAuthenticated = Boolean(sessionToken)

  if (!isAuthenticated && pathname.startsWith("/ads")) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  if (isAuthenticated && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/ads/:path*", "/basket/:path*", "/login", "/register"],
}
