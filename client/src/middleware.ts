import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { url, cookies } = request;

  const refreshToken = cookies.get("refreshToken")?.value;
  const isAuthPage = url.includes("/auth");
  
  if (isAuthPage && refreshToken) {
    return NextResponse.redirect(new URL("/", url));
  }
  
  if (isAuthPage) {
    return NextResponse.next();
  }

  if (!refreshToken) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/auth"],
};
