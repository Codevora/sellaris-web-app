// app/admin/webmaster/blog/components/BlogList.tsx
"use client";

import {useState} from "react";
import {useBlog} from "@/hooks/useBlog";
import {MotionButton, MotionDiv} from "@/components/AnimatedComponent";
import {
 FaSearch,
 FaTrash,
 FaEdit,
 FaChevronDown,
 FaChevronUp,
 FaSpinner,
} from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

const BlogList = () => {
 const {blogs, isLoading, error, fetchBlogs, deleteBlog, hasMore} = useBlog();
 const [searchTerm, setSearchTerm] = useState("");
 const [selectedCategory, setSelectedCategory] = useState("");
 const [expandedBlogId, setExpandedBlogId] = useState<string | null>(null);
 const [isDeleting, setIsDeleting] = useState<string | null>(null);

 const categories = [
  {value: "", label: "All Categories"},
  {value: "Business", label: "Business"},
  {value: "Technology", label: "Technology"},
  {value: "Marketing", label: "Marketing"},
  {value: "Productivity", label: "Productivity"},
 ];

 const handleSearch = (e: React.FormEvent) => {
  e.preventDefault();
  fetchBlogs(searchTerm, selectedCategory);
 };

 const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  const category = e.target.value;
  setSelectedCategory(category);
  fetchBlogs(searchTerm, category);
 };

 const handleLoadMore = () => {
  fetchBlogs(searchTerm, selectedCategory, true);
 };

 const toggleExpand = (blogId: string) => {
  setExpandedBlogId(expandedBlogId === blogId ? null : blogId);
 };

 const handleDelete = async (blogId: string, imageUrl?: string) => {
  setIsDeleting(blogId);
  await deleteBlog(blogId, imageUrl);
  setIsDeleting(null);
 };

 return (
  <div className="w-full max-w-6xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 p-6">
   <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
    <h2 className="text-2xl font-bold text-gray-800">Blog Posts</h2>

    <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
     <form
      onSubmit={handleSearch}
      className="relative">
      <input
       type="text"
       placeholder="Search blogs..."
       value={searchTerm}
       onChange={(e) => setSearchTerm(e.target.value)}
       className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all w-full"
      />
      <FaSearch className="absolute left-3 top-3 text-gray-400" />
     </form>

     <select
      value={selectedCategory}
      onChange={handleCategoryChange}
      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all">
      {categories.map((category) => (
       <option
        key={category.value}
        value={category.value}>
        {category.label}
       </option>
      ))}
     </select>
    </div>
   </div>

   {error && (
    <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg border border-red-100">
     {error}
    </div>
   )}

   {isLoading && !blogs.length ? (
    <div className="flex justify-center items-center py-12">
     <FaSpinner className="animate-spin text-3xl text-teal-500" />
    </div>
   ) : blogs.length === 0 ? (
    <div className="text-center py-12 text-gray-500">
     No blog posts found. Create one to get started!
    </div>
   ) : (
    <div className="space-y-4">
     {blogs.map((blog) => (
      <MotionDiv
       key={blog.id}
       initial={{opacity: 0, y: 20}}
       animate={{opacity: 1, y: 0}}
       transition={{duration: 0.3}}
       className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
       <div className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
         {blog.imageUrl && (
          <div className="w-full md:w-1/4 h-40 relative rounded-lg overflow-hidden">
           <Image
            src={blog.imageUrl}
            alt={blog.title}
            fill
            className="object-cover"
           />
          </div>
         )}

         <div className={`flex-1 ${blog.imageUrl ? "md:w-3/4" : "w-full"}`}>
          <div className="flex justify-between items-start">
           <div>
            <h3 className="text-xl font-semibold text-gray-800">
             {blog.title}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
             {blog.category} • {new Date(blog.createdAt).toLocaleDateString()} •{" "}
             {blog.author}
            </p>
           </div>
           <div className="flex gap-2">
            <Link href={`/admin/webmaster/blog/edit/${blog.id}`}>
             <MotionButton
              whileHover={{scale: 1.05}}
              whileTap={{scale: 0.95}}
              className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all">
              <FaEdit />
             </MotionButton>
            </Link>
            <MotionButton
             whileHover={{scale: 1.05}}
             whileTap={{scale: 0.95}}
             onClick={() => handleDelete(blog.id, blog.imageUrl)}
             disabled={isDeleting === blog.id}
             className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all">
             {isDeleting === blog.id ? (
              <FaSpinner className="animate-spin" />
             ) : (
              <FaTrash />
             )}
            </MotionButton>
           </div>
          </div>

          <p className="text-gray-600 mt-2">{blog.excerpt}</p>

          <button
           onClick={() => toggleExpand(blog.id)}
           className="mt-3 text-teal-600 font-medium flex items-center gap-1 hover:underline">
           {expandedBlogId === blog.id ? (
            <>
             Show Less <FaChevronUp className="text-xs" />
            </>
           ) : (
            <>
             Read More <FaChevronDown className="text-xs" />
            </>
           )}
          </button>
         </div>
        </div>

        {expandedBlogId === blog.id && (
         <div className="mt-4 pt-4 border-t border-gray-100">
          <div
           className="prose max-w-none text-gray-700"
           dangerouslySetInnerHTML={{__html: blog.content}}
          />
         </div>
        )}
       </div>
      </MotionDiv>
     ))}

     {hasMore && (
      <div className="pt-4 flex justify-center">
       <MotionButton
        onClick={handleLoadMore}
        disabled={isLoading}
        whileHover={{scale: 1.02}}
        whileTap={{scale: 0.98}}
        className={`px-6 py-2 rounded-lg ${
         isLoading ? "bg-teal-400" : "bg-teal-500 hover:bg-teal-600"
        } text-white font-medium transition-all`}>
        {isLoading ? (
         <span className="flex items-center gap-2">
          <FaSpinner className="animate-spin" /> Loading...
         </span>
        ) : (
         "Load More"
        )}
       </MotionButton>
      </div>
     )}
    </div>
   )}
  </div>
 );
};

export default BlogList;
