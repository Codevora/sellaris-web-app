import {NextResponse} from "next/server";
import {getDocs, collection, query, orderBy, where} from "firebase/firestore";
import {db} from "@/lib/firebase/init";

export const dynamic = "force-dynamic"; // Tambahkan ini

export async function GET(request: Request) {
 try {
  const {searchParams} = new URL(request.url);
  const category = searchParams.get("category");

  const postsRef = collection(db, "blogPosts");
  let q;

  if (category) {
   q = query(
    postsRef,
    where("category", "==", category),
    orderBy("createdAt", "desc")
   );
  } else {
   q = query(postsRef, orderBy("createdAt", "desc"));
  }

  const snapshot = await getDocs(q);
  const posts = snapshot.docs.map((doc) => ({
   id: doc.id,
   ...doc.data(),
   createdAt: doc.data().createdAt?.toDate().toISOString(), // Konversi ke string
  }));

  return NextResponse.json({success: true, data: posts});
 } catch (error) {
  return NextResponse.json(
   {success: false, message: "Failed to fetch posts"},
   {status: 500}
  );
 }
}
