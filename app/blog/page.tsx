// app/blog/page.tsx
"use client";

import {useState} from "react";
import BlogCard from "@/components/BlogCard";
import {usePublicBlog} from "@/hooks/usePublicBlog";
import {MotionButton} from "@/components/AnimatedComponent";
import {FaSearch, FaSpinner} from "react-icons/fa";

const BlogPage = () => {
 const {blogs, categories, isLoading, error, fetchBlogs, hasMore} =
  usePublicBlog();
 const [searchTerm, setSearchTerm] = useState("");
 const [selectedCategory, setSelectedCategory] = useState("");

 const handleSearch = (e: React.FormEvent) => {
  e.preventDefault();
  fetchBlogs(searchTerm, selectedCategory);
 };

 const handleCategoryFilter = (category: string) => {
  setSelectedCategory(category);
  fetchBlogs(searchTerm, category);
 };

 const handleLoadMore = () => {
  fetchBlogs(searchTerm, selectedCategory, true);
 };

 return (
  <div className="min-h-screen bg-gray-50 pt-28 pb-12 px-4 sm:px-6 lg:px-8">
   <div className="max-w-7xl mx-auto">
    {/* Hero Section */}
    <div className="text-center mb-16">
     <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
      Our <span className="text-teal-500">Blog</span>
     </h1>
     <p className="text-lg text-gray-600 max-w-2xl mx-auto">
      Discover the latest articles, news, and stories from our team
     </p>
    </div>

    {/* Search and Filter */}
    <div className="mb-12">
     <form
      onSubmit={handleSearch}
      className="mb-8">
      <div className="relative max-w-xl mx-auto">
       <input
        type="text"
        placeholder="Search articles..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
       />
       <FaSearch className="absolute left-4 top-4 text-gray-400" />
      </div>
     </form>

     <div className="flex flex-wrap justify-center gap-3">
      <button
       onClick={() => handleCategoryFilter("")}
       className={`px-4 py-2 rounded-full ${
        selectedCategory === ""
         ? "bg-teal-500 text-white"
         : "bg-white text-gray-700 hover:bg-gray-100"
       } transition-all shadow-sm`}>
       All
      </button>
      {categories.map((category) => (
       <button
        key={category}
        onClick={() => handleCategoryFilter(category)}
        className={`px-4 py-2 rounded-full ${
         selectedCategory === category
          ? "bg-teal-500 text-white"
          : "bg-white text-gray-700 hover:bg-gray-100"
        } transition-all shadow-sm`}>
        {category}
       </button>
      ))}
     </div>
    </div>

    {/* Error Message */}
    {error && (
     <div className="mb-8 p-4 bg-red-50 text-red-600 rounded-lg border border-red-100 text-center">
      {error}
     </div>
    )}

    {/* Blog List */}
    {isLoading && !blogs.length ? (
     <div className="flex justify-center items-center py-20">
      <FaSpinner className="animate-spin text-4xl text-teal-500" />
     </div>
    ) : blogs.length === 0 ? (
     <div className="text-center py-12 text-gray-500">
      No articles found. Please try a different search.
     </div>
    ) : (
     <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
       {blogs.map((blog) => (
        <BlogCard
         key={blog.id}
         blog={blog}
        />
       ))}
      </div>

      {hasMore && (
       <div className="text-center">
        <MotionButton
         onClick={handleLoadMore}
         disabled={isLoading}
         whileHover={{scale: 1.05}}
         whileTap={{scale: 0.95}}
         className={`px-8 py-3 rounded-lg ${
          isLoading ? "bg-teal-400" : "bg-teal-500 hover:bg-teal-600"
         } text-white font-medium transition-all shadow-lg`}>
         {isLoading ? (
          <span className="flex items-center gap-2">
           <FaSpinner className="animate-spin" /> Loading...
          </span>
         ) : (
          "Load More Articles"
         )}
        </MotionButton>
       </div>
      )}
     </>
    )}
   </div>
  </div>
 );
};

export default BlogPage;
