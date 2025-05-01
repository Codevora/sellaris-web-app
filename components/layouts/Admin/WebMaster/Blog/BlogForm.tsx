"use client";

import {useState, useEffect} from "react";
import {useRouter} from "next/navigation";
import {
 FaSpinner,
 FaTrash,
 FaEdit,
 FaPlus,
 FaSave,
 FaComments,
} from "react-icons/fa";
import Link from "next/link";

interface BlogPost {
 id?: string;
 title: string;
 excerpt: string;
 content: string;
 category: string;
 createdAt: Date;
 author: string;
 imageUrl?: string;
}

interface PostWithComments {
 id: string;
 title: string;
 commentCount: number;
}

const BlogForm = () => {
 const [posts, setPosts] = useState<BlogPost[]>([]);
 const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
 const [isLoading, setIsLoading] = useState(false);
 const [error, setError] = useState<string | null>(null);
 const router = useRouter();
 const [postsWithComments, setPostsWithComments] = useState<PostWithComments[]>(
  []
 );

 // Form state
 const [formData, setFormData] = useState<Omit<BlogPost, "id">>({
  title: "",
  excerpt: "",
  content: "",
  category: "",
  createdAt: new Date(),
  author: "Admin",
  imageUrl: "",
 });

 useEffect(() => {
  fetchPosts();
 }, []);

 const fetchPosts = async () => {
  setIsLoading(true);
  setError(null);
  try {
   const response = await fetch("/api/blog", {
    headers: {
     "Content-Type": "application/json",
    },
   });

   if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(
     errorData?.message ||
      `HTTP error! status: ${response.status} ${response.statusText}`
    );
   }

   const data = await response.json();
   setPosts(data);

   // Optional: Fetch comment counts
   try {
    const postsWithCommentCounts = await Promise.all(
     data.map(async (post: BlogPost) => {
      try {
       const commentsResponse = await fetch(
        `/api/blog/comments?postId=${post.id}`,
        {
         headers: {
          "Content-Type": "application/json",
         },
        }
       );

       if (!commentsResponse.ok) {
        return {...post, commentCount: 0};
       }

       const commentsData = await commentsResponse.json();
       return {
        id: post.id!,
        title: post.title,
        commentCount: commentsData.length || 0,
       };
      } catch {
       return {
        id: post.id!,
        title: post.title,
        commentCount: 0,
       };
      }
     })
    );
    setPostsWithComments(postsWithCommentCounts);
   } catch (commentsError) {
    console.error("Error fetching comments:", commentsError);
    // Continue even if comments fail
   }
  } catch (error) {
   console.error("Error fetching posts:", error);
   setError(error instanceof Error ? error.message : "Failed to fetch posts");
  } finally {
   setIsLoading(false);
  }
 };

 const handleInputChange = (
  e: React.ChangeEvent<
   HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >
 ) => {
  const {name, value} = e.target;
  setFormData((prev) => ({...prev, [name]: value}));
 };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);
  setError(null);

  try {
   const postData = {
    ...formData,
    createdAt: new Date(),
   };

   const url = editingPost ? `/api/blog/${editingPost.id}` : "/api/blog";
   const method = editingPost ? "PUT" : "POST";

   const response = await fetch(url, {
    method,
    headers: {
     "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
   });

   if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(
     errorData?.message ||
      `HTTP error! status: ${response.status} ${response.statusText}`
    );
   }

   resetForm();
   fetchPosts();
  } catch (error) {
   console.error("Error saving post:", error);
   setError(error instanceof Error ? error.message : "Failed to save post");
  } finally {
   setIsLoading(false);
  }
 };

 const handleDelete = async (id: string) => {
  if (!confirm("Are you sure you want to delete this post?")) return;

  setIsLoading(true);
  setError(null);
  try {
   const response = await fetch(`/api/blog/${id}`, {
    method: "DELETE",
    headers: {
     "Content-Type": "application/json",
    },
   });

   if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(
     errorData?.message ||
      `HTTP error! status: ${response.status} ${response.statusText}`
    );
   }

   fetchPosts();
  } catch (error) {
   console.error("Error deleting post:", error);
   setError(error instanceof Error ? error.message : "Failed to delete post");
  } finally {
   setIsLoading(false);
  }
 };

 const resetForm = () => {
  setFormData({
   title: "",
   excerpt: "",
   content: "",
   category: "",
   createdAt: new Date(),
   author: "Admin",
   imageUrl: "",
  });
  setEditingPost(null);
  setError(null);
 };

 return (
  <div className="container mx-auto px-4 py-8">
   <h1 className="text-3xl font-bold mb-8">Blog Management</h1>

   {error && (
    <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
     {error}
    </div>
   )}

   <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
    {/* Form Section */}
    <div className="bg-white rounded-lg shadow-md p-6">
     <h2 className="text-xl font-semibold mb-4">
      {editingPost ? "Edit Post" : "Add New Post"}
     </h2>

     <form
      onSubmit={handleSubmit}
      className="space-y-4">
      <div>
       <label className="block text-sm font-medium text-gray-700 mb-1">
        Title
       </label>
       <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleInputChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
        required
        disabled={isLoading}
       />
      </div>

      <div>
       <label className="block text-sm font-medium text-gray-700 mb-1">
        Excerpt
       </label>
       <textarea
        name="excerpt"
        value={formData.excerpt}
        onChange={handleInputChange}
        rows={3}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
        required
        disabled={isLoading}
       />
      </div>

      <div>
       <label className="block text-sm font-medium text-gray-700 mb-1">
        Content
       </label>
       <textarea
        name="content"
        value={formData.content}
        onChange={handleInputChange}
        rows={6}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
        required
        disabled={isLoading}
       />
      </div>

      <div>
       <label className="block text-sm font-medium text-gray-700 mb-1">
        Category
       </label>
       <select
        name="category"
        value={formData.category}
        onChange={handleInputChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
        required
        disabled={isLoading}>
        <option value="">Select a category</option>
        <option value="Retail">Retail</option>
        <option value="F&B">F&B</option>
        <option value="Analytics">Analytics</option>
        <option value="Technology">Technology</option>
       </select>
      </div>

      <div>
       <label className="block text-sm font-medium text-gray-700 mb-1">
        Image URL
       </label>
       <input
        type="text"
        name="imageUrl"
        value={formData.imageUrl}
        onChange={handleInputChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
        disabled={isLoading}
       />
      </div>

      <div className="flex justify-end space-x-3 pt-4">
       {editingPost && (
        <button
         type="button"
         onClick={resetForm}
         className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
         disabled={isLoading}>
         Cancel
        </button>
       )}
       <button
        type="submit"
        disabled={isLoading}
        className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 flex items-center justify-center disabled:opacity-50">
        {isLoading ? (
         <FaSpinner className="animate-spin mr-2" />
        ) : editingPost ? (
         <>
          <FaSave className="mr-2" /> Update
         </>
        ) : (
         <>
          <FaPlus className="mr-2" /> Add Post
         </>
        )}
       </button>
      </div>
     </form>
    </div>

    {/* Posts List */}
    <div className="bg-white rounded-lg shadow-md p-6">
     <h2 className="text-xl font-semibold mb-4">Blog Posts</h2>

     {isLoading && posts.length === 0 ? (
      <div className="flex justify-center py-8">
       <FaSpinner className="animate-spin text-2xl text-teal-600" />
      </div>
     ) : posts.length === 0 ? (
      <p className="text-gray-500">No blog posts found.</p>
     ) : (
      <div className="space-y-4">
       {posts.map((post) => {
        const postWithComments = postsWithComments.find(
         (p) => p.id === post.id
        ) || {
         id: post.id!,
         title: post.title,
         commentCount: 0,
        };
        return (
         <div
          key={post.id}
          className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
          <div className="flex justify-between items-start">
           <div>
            <h3 className="font-medium">{post.title}</h3>
            <p className="text-sm text-gray-500 mt-1">
             {post.category} • {new Date(post.createdAt).toLocaleDateString()}
             {postWithComments?.commentCount > 0 && (
              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800">
               {postWithComments.commentCount} komentar
              </span>
             )}
            </p>
           </div>
           <div className="flex space-x-2">
            <button
             onClick={() => handleEdit(post)}
             className="p-2 text-teal-600 hover:bg-teal-50 rounded-full"
             title="Edit"
             disabled={isLoading}>
             <FaEdit />
            </button>
            <button
             onClick={() => post.id && handleDelete(post.id)}
             className="p-2 text-red-600 hover:bg-red-50 rounded-full"
             title="Delete"
             disabled={isLoading}>
             <FaTrash />
            </button>
            {postWithComments?.commentCount > 0 && (
             <Link
              href={`/admin/blog/comments?postId=${post.id}`}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
              title="Lihat Komentar">
              <FaComments />
             </Link>
            )}
           </div>
          </div>
         </div>
        );
       })}
      </div>
     )}
    </div>
   </div>
  </div>
 );
};

export default BlogForm;
