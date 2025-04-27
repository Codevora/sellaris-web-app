import {register} from "@/lib/firebase/service";
import {NextResponse} from "next/server";

export async function POST(request: Request) {
 const req = await request.json();
 const res = await register(req);

 return NextResponse.json(
  {
   status: res.status,
   message: res.message,
   tempUserId: res.tempUserId,
  },
  {
   status: res.statusCode,
  }
 );
}
