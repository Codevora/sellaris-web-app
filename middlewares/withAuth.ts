import {getToken} from "next-auth/jwt";
import {
 NextFetchEvent,
 NextMiddleware,
 NextRequest,
 NextResponse,
} from "next/server";

export default function withAuth(
 middleware: NextMiddleware,
 requireAuth: string[] = []
) {
 return async (req: NextRequest, next: NextFetchEvent) => {
  const pathname = req.nextUrl.pathname;
  const token = await getToken({
   req,
   secret: process.env.NEXTAUTH_SECRET,
  });

  const isAuthPage = ["/login", "/register"].includes(pathname);

  if (isAuthPage && token) {
   return NextResponse.redirect(new URL("/", req.url));
  }

  if (pathname === "/dashboard") {
   if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
   }

   const redirectPath =
    token.role === "admin" ? "/admin/dashboard" : "/member/dashboard";

   return NextResponse.redirect(new URL(redirectPath, req.url));
  }

  if (pathname.startsWith("/admin") && token?.role !== "admin") {
   return NextResponse.redirect(new URL("/login", req.url));
  }

  if (pathname.startsWith("/member") && token?.role !== "member") {
   return NextResponse.redirect(new URL("/login", req.url));
  }

  const isProtectedRoute = requireAuth.some(
   (route) =>
    pathname.startsWith(route) || pathname === route.replace(/\/\*$/, "")
  );

  if (isProtectedRoute) {
   if (!token) {
    const url = new URL("/login", req.url);
    url.searchParams.set("callbackUrl", encodeURI(pathname));
    return NextResponse.redirect(url);
   }
  }

  return middleware(req, next);
 };
}
