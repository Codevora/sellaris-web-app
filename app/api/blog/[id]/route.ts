import {db} from "@/lib/firebase/init";
import {deleteDoc, doc, updateDoc} from "firebase/firestore";
import {NextResponse} from "next/server";

export async function PUT(request: Request, {params}: {params: {id: string}}) {
 try {
  const body = await request.json();
  const postRef = doc(db, "blogPosts", params.id);
  await updateDoc(postRef, body);

  return NextResponse.json(
   {message: "Blog post updated successfully"},
   {status: 200}
  );
 } catch (error) {
  return NextResponse.json(
   {error: "Failed to update blog post"},
   {status: 500}
  );
 }
}

export async function DELETE(
 request: Request,
 {params}: {params: {id: string}}
) {
 try {
  await deleteDoc(doc(db, "blogPosts", params.id));

  return NextResponse.json(
   {message: "Blog post deleted successfully"},
   {status: 200}
  );
 } catch (error) {
  return NextResponse.json(
   {error: "Failed to delete blog post"},
   {status: 500}
  );
 }
}