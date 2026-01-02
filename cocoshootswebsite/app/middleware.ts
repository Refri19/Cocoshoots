import { auth } from "./auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const isLoggedIn = !!req.auth; // Check if session exists
  const { nextUrl } = req;

  // 1. Define your public and auth routes
  const isLoginPage = nextUrl.pathname === "/login";
  const isPublicRoute = ["/register", "/api/auth"].some(path => 
    nextUrl.pathname.startsWith(path)
  );

  // 2. If the user is NOT logged in and tries to access a protected page
  if (!isLoggedIn && !isLoginPage && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  // 3. If the user IS logged in and tries to access the login page, send them home
  if (isLoggedIn && isLoginPage) {
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  return NextResponse.next();
})

// Specify which routes this middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}