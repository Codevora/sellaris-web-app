// app/blog/[id]/page.tsx
import Image from "next/image";
import {formatDate} from "@/lib/utils/formatDate";
import {getBlogById} from "@/lib/firebase/blog";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";

interface BlogPageProps {
 params: {
  id: string;
 };
}

const BlogDetailPage = async ({params}: BlogPageProps) => {
 let blog;
 try {
  blog = await getBlogById(params.id);
 } catch (error) {
  return (
   <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
     <h1 className="text-4xl font-bold text-gray-800 mb-4">Error</h1>
     <p className="text-xl text-gray-600">Failed to load blog post</p>
    </div>
   </div>
  );
 }

 if (!blog) {
  return (
   <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
     <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
     <p className="text-xl text-gray-600">Blog post not found</p>
    </div>
   </div>
  );
 }

 return (
  <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
   <div className="max-w-4xl mx-auto">
    <div className="">
     <Link
      href="/blog"
      className="inline-flex gap-2 hover:underline items-center px-6 py-3 text-base font-medium text-teal-600 transition-colors">
      <FaArrowLeftLong /> Kembali ke halaman blog
     </Link>
    </div>
    <article className="bg-white rounded-xl shadow-md overflow-hidden">
     {blog.imageUrl && (
      <div className="relative h-64 md:h-80 w-full">
       <Image
        src={blog.imageUrl}
        alt={blog.title}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
       />
      </div>
     )}

     <div className="p-6 md:p-8">
      {/* Metadata section */}
      <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
       <span className="flex items-center gap-1">
        <svg
         xmlns="http://www.w3.org/2000/svg"
         className="h-4 w-4"
         fill="none"
         viewBox="0 0 24 24"
         stroke="currentColor">
         <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
         />
        </svg>
        {formatDate(blog.createdAt)}
       </span>
       <span className="flex items-center gap-1">
        <svg
         xmlns="http://www.w3.org/2000/svg"
         className="h-4 w-4"
         fill="none"
         viewBox="0 0 24 24"
         stroke="currentColor">
         <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
         />
        </svg>
        {blog.author}
       </span>
       <span className="flex items-center gap-1 px-3 py-1 bg-teal-50 text-teal-600 rounded-full">
        <svg
         xmlns="http://www.w3.org/2000/svg"
         className="h-4 w-4"
         fill="none"
         viewBox="0 0 24 24"
         stroke="currentColor">
         <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
         />
        </svg>
        {blog.category}
       </span>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
       {blog.title}
      </h1>

      <div
       className="prose max-w-none text-gray-700"
       dangerouslySetInnerHTML={{__html: blog.content}}
      />
     </div>
    </article>
   </div>
  </div>
 );
};

export default BlogDetailPage;
