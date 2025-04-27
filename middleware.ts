import {NextResponse} from "next/server";
import type {NextRequest} from "next/server";
import withAuth from "./middlewares/withAuth";

function mainMiddleware(request: NextRequest) {
 const res = NextResponse.next();
 return res;
}

const protectedRoutes = ["/dashboard", "/admin/:path*", "/member/:path*"];

export default withAuth(mainMiddleware, protectedRoutes);
