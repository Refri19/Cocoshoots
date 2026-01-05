import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isLoginPage = req.nextUrl.pathname === "/login";

    // Prevent logged-in users from accessing the login page
    if (token && isLoginPage) {
      return NextResponse.redirect(new URL("/", req.nextUrl));
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { nextUrl } = req;
        // Public routes that MUST bypass the session check
        const isPublic = 
          nextUrl.pathname.startsWith("/api/auth") || 
          nextUrl.pathname.startsWith("/register") ||
          nextUrl.pathname === "/login";

        if (isPublic) return true;
        return !!token; // All other routes require a valid token
      },
    },
  }
);

export const config = {
  // Protect all routes except static files and specific public paths
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};