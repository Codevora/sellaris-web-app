import {NextResponse} from "next/server";
import {getDoc, doc} from "firebase/firestore";
import {db} from "@/lib/firebase/init";

export async function GET(request: Request, {params}: {params: {id: string}}) {
 try {
  const docRef = doc(db, "blogPosts", params.id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
   return NextResponse.json(
    {success: false, message: "Post not found"},
    {status: 404}
   );
  }

  const post = {
   id: docSnap.id,
   ...docSnap.data(),
   createdAt: docSnap.data().createdAt.toDate(),
  };

  return NextResponse.json({success: true, data: post});
 } catch (error) {
  return NextResponse.json(
   {success: false, message: "Failed to fetch post"},
   {status: 500}
  );
 }
}
