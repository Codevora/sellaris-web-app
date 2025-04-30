"use client";

import {useEffect, useState} from "react";
import {useSearchParams} from "next/navigation";
import {FaArrowLeft, FaUserCircle, FaTrash} from "react-icons/fa";
import Link from "next/link";

interface Comment {
 id: string;
 content: string;
 author: string;
 authorId: string;
 createdAt: Date;
 postId: string;
}

interface Post {
 id: string;
 title: string;
}

const CommentViews = () => {
 const searchParams = useSearchParams();
 const postId = searchParams.get("postId");
 const [comments, setComments] = useState<Comment[]>([]);
 const [post, setPost] = useState<Post | null>(null);
 const [isLoading, setIsLoading] = useState(true);

 useEffect(() => {
  const fetchData = async () => {
   if (!postId) return;

   setIsLoading(true);
   try {
    // Fetch post
    const postResponse = await fetch(`/api/blog/${postId}`);
    if (!postResponse.ok) throw new Error("Failed to fetch post");
    const {data: postData} = await postResponse.json();
    setPost(postData);

    // Fetch comments
    const commentsResponse = await fetch(`/api/blog/comments?postId=${postId}`);
    if (!commentsResponse.ok) throw new Error("Failed to fetch comments");
    const {data: commentsData} = await commentsResponse.json();
    setComments(commentsData);
   } catch (error) {
    console.error("Error fetching data:", error);
   } finally {
    setIsLoading(false);
   }
  };

  fetchData();
 }, [postId]);

 const handleDeleteComment = async (commentId: string) => {
  if (confirm("Apakah Anda yakin ingin menghapus komentar ini?")) {
   try {
    const response = await fetch(`/api/blog/comments/${commentId}`, {
     method: "DELETE",
    });

    if (!response.ok) throw new Error("Failed to delete comment");

    setComments(comments.filter((comment) => comment.id !== commentId));
   } catch (error) {
    console.error("Error deleting comment:", error);
   }
  }
 };

 if (isLoading) {
  return (
   <div className="flex justify-center items-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
   </div>
  );
 }

 if (!post) {
  return (
   <div className="flex justify-center items-center min-h-screen">
    <p className="text-gray-500">Post tidak ditemukan</p>
   </div>
  );
 }

 return (
  <div className="container mx-auto px-4 py-8">
   <div className="flex items-center mb-6">
    <Link
     href="/admin/webmaster/blog"
     className="mr-4 text-teal-600 hover:text-teal-800">
     <FaArrowLeft className="text-xl" />
    </Link>
    <h1 className="text-2xl font-bold">
     Komentar untuk: <span className="text-teal-600">{post.title}</span>
    </h1>
   </div>

   <div className="bg-white rounded-lg shadow-md p-6">
    {comments.length === 0 ? (
     <p className="text-gray-500 text-center py-8">
      Belum ada komentar untuk post ini
     </p>
    ) : (
     <div className="space-y-4">
      {comments.map((comment) => (
       <div
        key={comment.id}
        className="border-b border-gray-200 pb-4 last:border-0">
        <div className="flex justify-between items-start mb-2">
         <div className="flex items-center">
          <FaUserCircle className="text-gray-400 text-2xl mr-3" />
          <div>
           <h3 className="font-medium">{comment.author}</h3>
           <p className="text-xs text-gray-500">
            {new Date(comment.createdAt).toLocaleDateString("id-ID", {
             day: "numeric",
             month: "long",
             year: "numeric",
             hour: "2-digit",
             minute: "2-digit",
            })}
           </p>
          </div>
         </div>
         <button
          onClick={() => handleDeleteComment(comment.id)}
          className="text-gray-400 hover:text-red-500 p-1"
          title="Hapus Komentar">
          <FaTrash />
         </button>
        </div>
        <p className="text-gray-700 pl-11">{comment.content}</p>
       </div>
      ))}
     </div>
    )}
   </div>
  </div>
 );
};

export default CommentViews;
