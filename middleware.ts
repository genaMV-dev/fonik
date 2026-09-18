import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  
  const sessionToken =
    request.cookies.get("sessionId")?.value ||
    request.cookies.get("accessToken")?.value

  const isAuthenticated = Boolean(sessionToken)

 
  if (isAuthenticated && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  
  if (!isAuthenticated && (pathname.startsWith("/ads") || pathname.startsWith("/basket"))) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/ads",
    "/ads/:path*",
    "/basket",
    "/basket/:path*",
    "/login",
    "/register",
  ],
}