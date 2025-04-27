import {login} from "@/lib/firebase/service";
import {signIn} from "next-auth/react";
import {NextResponse} from "next/server";

export async function POST(request: Request) {
 const {email, callbackUrl} = await request.json();

 try {
  // Dapatkan user data dari Firestore
  const user = await login({email});

  if (!user) {
   return NextResponse.json(
    {status: false, message: "User not found"},
    {status: 404}
   );
  }

  // Lakukan sign in dengan NextAuth
  await signIn("credentials", {
   email,
   callbackUrl: callbackUrl || "/",
   redirect: false,
  });

  return NextResponse.json({
   status: true,
   message: "Login successful",
  });
 } catch (error: any) {
  return NextResponse.json(
   {status: false, message: error.message},
   {status: 500}
  );
 }
}
