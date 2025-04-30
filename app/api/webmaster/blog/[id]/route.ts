import {NextResponse} from "next/server";
import {doc, getDoc, updateDoc, deleteDoc} from "firebase/firestore";
import {db} from "@/lib/firebase/init";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {serverTimestamp} from "firebase/firestore";

interface SessionUser {
 id: string;
 role: string;
}

export async function GET(request: Request, {params}: {params: {id: string}}) {
 const session = await getServerSession(authOptions);

 if (!session?.user?.role) {
  return NextResponse.json(
   {success: false, message: "Unauthorized"},
   {status: 401}
  );
 }

 const user = session.user as SessionUser;
 if (user.role !== "admin") {
  return NextResponse.json(
   {success: false, message: "Forbidden: Admin access required"},
   {status: 403}
  );
 }

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

export async function PUT(request: Request, {params}: {params: {id: string}}) {
 const session = await getServerSession(authOptions);

 if (!session?.user?.role) {
  return NextResponse.json(
   {success: false, message: "Unauthorized"},
   {status: 401}
  );
 }

 const user = session.user as SessionUser;
 if (user.role !== "admin") {
  return NextResponse.json(
   {success: false, message: "Forbidden: Admin access required"},
   {status: 403}
  );
 }

 try {
  const body = await request.json();
  const docRef = doc(db, "blogPosts", params.id);

  await updateDoc(docRef, {
   ...body,
   updatedAt: serverTimestamp(),
  });

  return NextResponse.json({
   success: true,
   message: "Post updated successfully",
  });
 } catch (error) {
  return NextResponse.json(
   {success: false, message: "Failed to update post"},
   {status: 500}
  );
 }
}

export async function DELETE(
 request: Request,
 {params}: {params: {id: string}}
) {
 const session = await getServerSession(authOptions);

 if (!session?.user?.role) {
  return NextResponse.json(
   {success: false, message: "Unauthorized"},
   {status: 401}
  );
 }

 const user = session.user as SessionUser;
 if (user.role !== "admin") {
  return NextResponse.json(
   {success: false, message: "Forbidden: Admin access required"},
   {status: 403}
  );
 }

 try {
  const docRef = doc(db, "blogPosts", params.id);
  await deleteDoc(docRef);

  return NextResponse.json({
   success: true,
   message: "Post deleted successfully",
  });
 } catch (error) {
  return NextResponse.json(
   {success: false, message: "Failed to delete post"},
   {status: 500}
  );
 }
}
