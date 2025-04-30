import {NextResponse} from "next/server";
import {getDocs, collection, query, orderBy, where} from "firebase/firestore";
import {db} from "@/lib/firebase/init";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

interface SessionUser {
 id: string;
 name?: string | null;
 email?: string | null;
 role: string;
}

export async function GET(request: Request) {
 const session = await getServerSession(authOptions);

 if (!session) {
  return NextResponse.json(
   {success: false, message: "Not authenticated"},
   {status: 401}
  );
 }

 if (!session.user) {
  return NextResponse.json(
   {success: false, message: "User data not found"},
   {status: 401}
  );
 }

 const user = session.user as SessionUser;
 if (user.role !== "admin") {
  return NextResponse.json(
   {success: false, message: "Unauthorized"},
   {status: 403}
  );
 }

 const {searchParams} = new URL(request.url);
 const postId = searchParams.get("postId");

 try {
  const commentsRef = collection(db, "comments");
  let q;

  if (postId) {
   q = query(
    commentsRef,
    where("postId", "==", postId),
    orderBy("createdAt", "desc")
   );
  } else {
   q = query(commentsRef, orderBy("createdAt", "desc"));
  }

  const snapshot = await getDocs(q);
  const comments = snapshot.docs.map((doc) => ({
   id: doc.id,
   ...doc.data(),
   createdAt: doc.data().createdAt.toDate(),
  }));

  return NextResponse.json({success: true, data: comments});
 } catch (error) {
  console.error("Error fetching comments:", error);
  return NextResponse.json(
   {success: false, message: "Failed to fetch comments"},
   {status: 500}
  );
 }
}
