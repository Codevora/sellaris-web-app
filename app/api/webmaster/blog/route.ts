import {NextResponse} from "next/server";
import {
 getDocs,
 collection,
 query,
 orderBy,
 doc,
 updateDoc,
 deleteDoc,
 serverTimestamp,
 addDoc,
} from "firebase/firestore";
import {db} from "@/lib/firebase/init";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

interface SessionUser {
 id: string;
 role: string;
}

export async function GET() {
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
  const postsRef = collection(db, "blogPosts");
  const q = query(postsRef, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);

  const posts = snapshot.docs.map((doc) => {
   const data = doc.data();
   return {
    id: doc.id,
    ...data,
    createdAt: data.createdAt?.toDate() || new Date(),
   };
  });

  return NextResponse.json({success: true, data: posts});
 } catch (error) {
  console.error("Error fetching posts:", error);
  return NextResponse.json(
   {success: false, message: "Failed to fetch posts"},
   {status: 500}
  );
 }
}

export async function POST(request: Request) {
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
  const postsRef = collection(db, "blogPosts");

  const newPost = {
   ...body,
   createdAt: serverTimestamp(),
   author: "Admin",
  };

  const docRef = await addDoc(postsRef, newPost);

  return NextResponse.json({
   success: true,
   message: "Post created successfully",
   postId: docRef.id,
  });
 } catch (error) {
  return NextResponse.json(
   {success: false, message: "Failed to create post"},
   {status: 500}
  );
 }
}
