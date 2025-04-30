"use client";

import {useState, useEffect} from "react";
import {useSession} from "next-auth/react";
import {FaUserCircle, FaSignInAlt, FaPaperPlane, FaTrash} from "react-icons/fa";
import {motion} from "framer-motion";
import Link from "next/link";

interface Comment {
 id: string;
 content: string;
 author: string;
 authorId: string;
 createdAt: Date;
}

const CommentSection = ({postId}: {postId: string}) => {
 const {data: session, status} = useSession();
 const [comments, setComments] = useState<Comment[]>([]);
 const [newComment, setNewComment] = useState("");
 const [isLoading, setIsLoading] = useState(false);

 // Fetch comments
 useEffect(() => {
  const fetchComments = async () => {
   setIsLoading(true);
   try {
    const response = await fetch(`/api/blog/comments?postId=${postId}`);
    if (!response.ok) throw new Error("Failed to fetch comments");

    const {data} = await response.json();
    setComments(data);
   } catch (error) {
    console.error("Error fetching comments:", error);
   } finally {
    setIsLoading(false);
   }
  };

  fetchComments();
 }, [postId]);

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!newComment.trim() || !session?.user) return;

  try {
   setIsLoading(true);
   const response = await fetch("/api/blog/comments", {
    method: "POST",
    headers: {
     "Content-Type": "application/json",
    },
    body: JSON.stringify({
     postId,
     content: newComment,
    }),
   });

   if (!response.ok) throw new Error("Failed to add comment");

   const {commentId} = await response.json();

   // Refresh comments
   const commentsResponse = await fetch(`/api/blog/comments?postId=${postId}`);
   if (!commentsResponse.ok) throw new Error("Failed to fetch comments");

   const {data: updatedComments} = await commentsResponse.json();
   setComments(updatedComments);
   setNewComment("");
  } catch (error) {
   console.error("Error adding comment:", error);
  } finally {
   setIsLoading(false);
  }
 };

 const handleDelete = async (commentId: string, authorId: string) => {
  if (!session?.user || session.user.id !== authorId) return;

  if (confirm("Apakah Anda yakin ingin menghapus komentar ini?")) {
   try {
    setIsLoading(true);
    const response = await fetch(`/api/blog/comments/${commentId}`, {
     method: "DELETE",
    });

    if (!response.ok) throw new Error("Failed to delete comment");

    setComments(comments.filter((comment) => comment.id !== commentId));
   } catch (error) {
    console.error("Error deleting comment:", error);
   } finally {
    setIsLoading(false);
   }
  }
 };

 return (
  <div className="mt-12 border-t pt-8">
   <h3 className="text-xl font-semibold mb-6">Komentar</h3>

   {status === "authenticated" ? (
    <form
     onSubmit={handleSubmit}
     className="mb-8">
     <div className="flex items-start gap-3">
      <div className="pt-1">
       <FaUserCircle className="text-3xl text-gray-400" />
      </div>
      <div className="flex-1">
       <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Tulis komentar Anda..."
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        rows={3}
        disabled={isLoading}
       />
       <div className="flex justify-end mt-2">
        <button
         type="submit"
         disabled={!newComment.trim() || isLoading}
         className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 disabled:bg-teal-300 flex items-center gap-2">
         {isLoading ? "Mengirim..." : "Kirim"} <FaPaperPlane />
        </button>
       </div>
      </div>
     </div>
    </form>
   ) : (
    <div className="bg-blue-50 p-4 rounded-lg mb-6">
     <div className="flex items-center gap-3">
      <FaSignInAlt className="text-blue-500 text-xl" />
      <p className="text-blue-800">
       <Link
        href="/login"
        className="font-medium hover:underline">
        Masuk{" "}
       </Link>
       untuk meninggalkan komentar
      </p>
     </div>
    </div>
   )}

   <div className="space-y-6">
    {isLoading && comments.length === 0 ? (
     <div className="flex justify-center py-8">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-teal-500"></div>
     </div>
    ) : comments.length === 0 ? (
     <p className="text-gray-500 text-center py-4">Belum ada komentar</p>
    ) : (
     comments.map((comment) => (
      <motion.div
       key={comment.id}
       initial={{opacity: 0, y: 10}}
       animate={{opacity: 1, y: 0}}
       transition={{duration: 0.3}}
       className="flex gap-3">
       <div className="pt-1">
        <FaUserCircle className="text-2xl text-gray-400" />
       </div>
       <div className="flex-1">
        <div className="bg-gray-50 p-4 rounded-lg">
         <div className="flex justify-between items-start">
          <div>
           <h4 className="font-medium text-gray-800">{comment.author}</h4>
           <p className="text-xs text-gray-500 mt-1">
            {new Date(comment.createdAt).toLocaleDateString("id-ID", {
             day: "numeric",
             month: "long",
             year: "numeric",
             hour: "2-digit",
             minute: "2-digit",
            })}
           </p>
          </div>
          {session?.user?.id === comment.authorId && (
           <button
            onClick={() => handleDelete(comment.id, comment.authorId)}
            className="text-gray-400 hover:text-red-500"
            title="Hapus komentar">
            <FaTrash className="text-sm" />
           </button>
          )}
         </div>
         <p className="mt-2 text-gray-700">{comment.content}</p>
        </div>
       </div>
      </motion.div>
     ))
    )}
   </div>
  </div>
 );
};

export default CommentSection;
