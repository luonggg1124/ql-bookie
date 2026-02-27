import { NextRequest, NextResponse } from "next/server";
import {
  getTokenFromNextRequest,

} from "@/data/utils/cookie";

const PUBLIC_ROUTES = ["/login", "/api/login"];

const IGNORED_ROUTES = [
  "/_next",
  "/favicon.ico",
  "/api/health", // nếu có
  "/images", // nếu có
  "/api/auth", // Cho phép tất cả auth endpoints
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 🛡️ API Security Check: Prevent direct browser access to API routes
  if (pathname.startsWith("/api")) {
    const referer = request.headers.get("referer");
    const origin = request.nextUrl.origin;
    const isSameOrigin = referer && referer.startsWith(origin);

    // Check Sec-Fetch-Site
    // "none" -> Direct navigation (user typed URL) -> BLOCK
    // "cross-site" -> External site -> BLOCK
    // "same-origin" -> OK
    const fetchSite = request.headers.get("sec-fetch-site");
    const isBrowserNav = fetchSite === "none";
    const isCrossSite = fetchSite === "cross-site";

    // Strict check for API routes
    if ((!isSameOrigin && fetchSite !== "same-origin") || isBrowserNav || isCrossSite) {
      return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
    }
  }

  if (pathname.startsWith("/login")) {
    const tokenData = getTokenFromNextRequest(request);
    if (tokenData?.access?.value) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
  // Allow public routes (e.g., /login)
  if (PUBLIC_ROUTES.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Skip middleware for ignored routes early
  if (IGNORED_ROUTES.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Read TOKEN cookie từ request (Edge runtime compatible)
  const tokenData = getTokenFromNextRequest(request);


  // Kiểm tra xem có access token không
  if (!tokenData?.access?.value) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}


export const config = {
  matcher: ["/((?!auth|_next/static|_next/image|favicon.ico).*)"],
};
