import {collection, getDocs, query, where} from "firebase/firestore";
import {firestore} from "@/lib/firebase/init";
import {NextResponse} from "next/server";

export async function POST(request: Request) {
 const {email} = await request.json();

 try {
  const q = query(
   collection(firestore, "temp_users"),
   where("email", "==", email)
  );
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
   return NextResponse.json(
    {status: false, message: "User not found"},
    {status: 404}
   );
  }

  const userData = snapshot.docs[0].data();
  return NextResponse.json({
   status: true,
   password: userData.password,
  });
 } catch (error) {
  return NextResponse.json(
   {status: false, message: "Failed to retrieve user data"},
   {status: 500}
  );
 }
}
