import { NextRequest, NextResponse } from "next/server";

// middleware.js
export default function middleware(req: NextRequest) {
  const loggedin = req.cookies.get("__session")?.value;
  const isAdmin = req.cookies.get("user_role")?.value === "ADMIN";

  const { pathname } = req.nextUrl;

  // Redirect logged-in users away from login page
  if (loggedin && pathname === "/login" && isAdmin) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }
  if (loggedin && pathname === "/login" && !isAdmin) {
    return NextResponse.redirect(new URL("/dashboard/personal-info", req.url));
  }
  // Redirect not-logged-in users away from admin pages
  if (
    !loggedin &&
    (pathname.startsWith("/admin") || pathname.startsWith("/dashboard"))
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next(); // Continue with the normal flow
}

export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next).*)"],
};
