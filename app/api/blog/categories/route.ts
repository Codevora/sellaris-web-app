import {NextResponse} from "next/server";
import {getDocs, collection} from "firebase/firestore";
import {db} from "@/lib/firebase/init";

export async function GET() {
 try {
  const postsRef = collection(db, "blogPosts");
  const snapshot = await getDocs(postsRef);

  const categories = new Set<string>();
  snapshot.forEach((doc) => {
   const category = doc.data().category;
   if (category) categories.add(category);
  });

  return NextResponse.json({
   success: true,
   data: Array.from(categories),
  });
 } catch (error) {
  return NextResponse.json(
   {success: false, message: "Failed to fetch categories"},
   {status: 500}
  );
 }
}
