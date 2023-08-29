import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  //console.log("middle ware -> ", request);
  console.log("verify email middle ware" , request);
  //console.log("verify email md 2 " , props);
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value || "";
  //console.log("path -> ", path);
  const isPublicPath = path === "/login" || path === "/signup";
  const isPrivatePath = path === "/profile" ;
  //console.log("isPrivatePath -> ", isPrivatePath);
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  //   return NextResponse.redirect(new URL('/home', request.url))
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [ "/profile/:path*", "/login", "/signup" ]
};
