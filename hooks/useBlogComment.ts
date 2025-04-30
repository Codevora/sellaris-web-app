import { db } from "@/lib/firebase/init";
import { Post } from "@/types/blogPost";
import { Comment } from "@/types/comment";
import { collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, where } from "firebase/firestore";

export async function getCommentsCount(postId: string): Promise<number> {
 const commentsRef = collection(db, "comments");
 const q = query(commentsRef, where("postId", "==", postId));
 const snapshot = await getDocs(q);
 return snapshot.size;
}

export async function getCommentsForPost(postId: string): Promise<Comment[]> {
 const commentsRef = collection(db, "comments");
 const q = query(
  commentsRef,
  where("postId", "==", postId),
  orderBy("createdAt", "desc")
 );

 const snapshot = await getDocs(q);

 return snapshot.docs.map((doc) => {
  const data = doc.data();
  return {
   id: doc.id,
   postId: data.postId,
   content: data.content,
   author: data.author,
   authorId: data.authorId,
   createdAt: data.createdAt.toDate(),
  } as Comment; 
 });
}

export async function getPostById(postId: string): Promise<Post | null> {
  const docRef = doc(db, 'blogPosts', postId);
  const docSnap = await getDoc(docRef);
  
  if (!docSnap.exists()) return null;

  const data = docSnap.data();
  return {
    id: docSnap.id,
    title: data.title || 'No title',
    excerpt: data.excerpt,
    content: data.content,
    category: data.category,
    imageUrl: data.imageUrl,
    createdAt: data.createdAt?.toDate(),
    author: data.author
  };
}

export async function deleteComment(commentId: string) {
 try {
  await deleteDoc(doc(db, "comments", commentId));
  return {status: true, message: "Comment deleted successfully"};
 } catch (error) {
  console.error("Error deleting comment:", error);
  return {status: false, message: "Failed to delete comment"};
 }
}