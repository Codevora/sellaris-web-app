import {NextResponse} from "next/server";
import {
 getDocs,
 collection,
 query,
 where,
 orderBy,
 serverTimestamp,
 addDoc,
} from "firebase/firestore";
import {db} from "@/lib/firebase/init";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

export async function GET(request: Request) {
 const {searchParams} = new URL(request.url);
 const postId = searchParams.get("postId");

 if (!postId) {
  return NextResponse.json(
   {success: false, message: "Post ID is required"},
   {status: 400}
  );
 }

 try {
  const commentsRef = collection(db, "comments");
  const q = query(
   commentsRef,
   where("postId", "==", postId),
   orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);
  const comments = snapshot.docs.map((doc) => ({
   id: doc.id,
   ...doc.data(),
   createdAt: doc.data().createdAt.toDate(),
  }));

  return NextResponse.json({success: true, data: comments});
 } catch (error) {
  return NextResponse.json(
   {success: false, message: "Failed to fetch comments"},
   {status: 500}
  );
 }
}

export async function POST(request: Request) {
 const session = await getServerSession(authOptions);

 if (!session?.user) {
  return NextResponse.json(
   {success: false, message: "Unauthorized"},
   {status: 401}
  );
 }

 const {postId, content} = await request.json();

 if (!postId || !content) {
  return NextResponse.json(
   {success: false, message: "Post ID and content are required"},
   {status: 400}
  );
 }

 try {
  const commentsRef = collection(db, "comments");

  const newComment = {
   postId,
   content,
   author: session.user.name || "Anonymous",
   authorId: session.user.id,
   createdAt: serverTimestamp(),
  };

  const docRef = await addDoc(commentsRef, newComment);

  return NextResponse.json({
   success: true,
   message: "Comment added successfully",
   commentId: docRef.id,
  });
 } catch (error) {
  return NextResponse.json(
   {success: false, message: "Failed to add comment"},
   {status: 500}
  );
 }
}
