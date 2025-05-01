import {db} from "@/lib/firebase/init";
import {getDocs, collection, addDoc} from "firebase/firestore";
import {NextResponse} from "next/server";

export async function GET() {
 try {
  const querySnapshot = await getDocs(collection(db, "blogPosts"));
  const posts = querySnapshot.docs.map((doc) => ({
   id: doc.id,
   ...doc.data(),
   createdAt: doc.data().createdAt.toDate().toISOString(),
  }));

  return NextResponse.json(posts, {status: 200});
 } catch (error) {
  return NextResponse.json(
   {error: "Failed to fetch blog posts"},
   {status: 500}
  );
 }
}

export async function POST(request: Request) {
 try {
  const body = await request.json();
  const docRef = await addDoc(collection(db, "blogPosts"), {
   ...body,
   createdAt: new Date(),
  });

  return NextResponse.json(
   {id: docRef.id, message: "Blog post created successfully"},
   {status: 201}
  );
 } catch (error) {
  return NextResponse.json(
   {error: "Failed to create blog post"},
   {status: 500}
  );
 }
}
