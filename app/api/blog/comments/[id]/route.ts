import {NextResponse} from "next/server";
import {doc, deleteDoc} from "firebase/firestore";
import {db} from "@/lib/firebase/init";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

export async function DELETE(
 request: Request,
 {params}: {params: {id: string}}
) {
 const session = await getServerSession(authOptions);

 if (!session?.user) {
  return NextResponse.json(
   {success: false, message: "Unauthorized"},
   {status: 401}
  );
 }

 try {
  const commentRef = doc(db, "comments", params.id);
  await deleteDoc(commentRef);

  return NextResponse.json({
   success: true,
   message: "Comment deleted successfully",
  });
 } catch (error) {
  return NextResponse.json(
   {success: false, message: "Failed to delete comment"},
   {status: 500}
  );
 }
}
