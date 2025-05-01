// components/BlogCard.tsx
"use client";

import {MotionDiv} from "@/components/AnimatedComponent";
import Image from "next/image";
import Link from "next/link";
import {FaCalendarAlt, FaUser, FaTags} from "react-icons/fa";
import {formatDate} from "@/lib/utils/formatDate";

interface BlogCardProps {
 blog: {
  id: string;
  title: string;
  excerpt: string;
  imageUrl?: string;
  author: string;
  category: string;
  createdAt: string;
 };
}

const BlogCard = ({blog}: BlogCardProps) => {
 return (
  <MotionDiv
   initial={{opacity: 0, y: 20}}
   animate={{opacity: 1, y: 0}}
   transition={{duration: 0.3}}
   whileHover={{y: -5}}
   className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all">
   {blog.imageUrl && (
    <div className="relative h-48 w-full">
     <Image
      src={blog.imageUrl}
      alt={blog.title}
      fill
      className="object-cover"
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
     />
    </div>
   )}

   <div className="p-6">
    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
     <span className="flex items-center gap-1">
      <FaCalendarAlt className="text-xs" />
      {formatDate(blog.createdAt)}
     </span>
     <span className="flex items-center gap-1">
      <FaUser className="text-xs" />
      {blog.author}
     </span>
    </div>

    <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
     {blog.title}
    </h3>

    <p className="text-gray-600 mb-4 line-clamp-3">{blog.excerpt}</p>

    <div className="flex justify-between items-center">
     <span className="inline-flex items-center gap-1 px-3 py-1 bg-teal-50 text-teal-600 rounded-full text-xs">
      <FaTags className="text-xs" />
      {blog.category}
     </span>

     <Link
      href={`/blog/${blog.id}`}
      className="text-teal-600 font-medium hover:underline flex items-center gap-1">
      Read More
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
        d="M14 5l7 7m0 0l-7 7m7-7H3"
       />
      </svg>
     </Link>
    </div>
   </div>
  </MotionDiv>
 );
};

export default BlogCard;
