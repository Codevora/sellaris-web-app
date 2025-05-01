"use client";

import {useState} from "react";
import BlogCard from "@/components/BlogCard";
import {usePublicBlog} from "@/hooks/usePublicBlog";
import {
 MotionButton,
 FadeIn,
 StaggerContainer,
 MotionDiv,
} from "@/components/AnimatedComponent";
import {FaSearch, FaSpinner, FaArrowRight} from "react-icons/fa";


const BlogPage = () => {
 const {blogs, isLoading, error, fetchBlogs, hasMore} =
  usePublicBlog();
 const [searchTerm, setSearchTerm] = useState("");
 const [selectedCategory, setSelectedCategory] = useState("");

 const handleSearch = (e: React.FormEvent) => {
  e.preventDefault();
  fetchBlogs(searchTerm, selectedCategory);
 };

 const handleLoadMore = () => {
  fetchBlogs(searchTerm, selectedCategory, true);
 };

 return (
  <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-24 pb-16 px-4 sm:px-6 lg:px-8">
   <div className="max-w-7xl mx-auto relative z-10">
    {/* Hero Section */}
    <StaggerContainer className="text-center mb-16">
     <FadeIn>
      <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4 leading-tight">
       <span className="inline-block bg-clip-text bg-teal-500 text-transparent">
        Blog Kami
       </span>
      </h1>
     </FadeIn>
     <FadeIn>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">
       Temukan wawasan terbaru dan cerita inspiratif dari tim kami
      </p>
     </FadeIn>
    </StaggerContainer>

    {/* Search and Filter */}
    <div className="mb-16">
     <form
      onSubmit={handleSearch}
      className="mb-8 max-w-2xl mx-auto relative">
      <div className="relative">
       <input
        type="text"
        placeholder="Cari artikel..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full pl-14 pr-24 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all bg-white/80 backdrop-blur-sm shadow-sm"
       />
       <FaSearch className="absolute left-5 top-5 text-gray-400" />
      </div>
     </form>
    </div>

    {/* Error Message */}
    {error && (
     <FadeIn className="mb-8">
      <div className="max-w-2xl mx-auto p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 text-center shadow-sm">
       {error}
      </div>
     </FadeIn>
    )}

    {/* Blog List */}
    {isLoading && !blogs.length ? (
     <div className="flex justify-center items-center py-20">
      <FaSpinner className="animate-spin text-4xl text-teal-500" />
     </div>
    ) : blogs.length === 0 ? (
     <FadeIn className="text-center py-12">
      <div className="max-w-md mx-auto">
       <div className="text-gray-400 mb-4 text-6xl">📭</div>
       <h3 className="text-xl font-medium text-gray-700 mb-2">
        Artikel tidak ditemukan
       </h3>
       <p className="text-gray-500">
        Coba gunakan kata kunci lain atau hapus filter untuk melihat lebih
        banyak artikel
       </p>
      </div>
     </FadeIn>
    ) : (
     <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
       {blogs.map((blog, index) => (
        <MotionDiv
         key={blog.id}
         initial={{opacity: 0}}
         animate={{opacity: 1}}
         transition={{delay: index * 0.1}}
         whileHover={{y: -5}}>
         <BlogCard blog={blog} />
        </MotionDiv>
       ))}
      </div>

      {hasMore && (
       <div className="text-center">
        <MotionButton
         onClick={handleLoadMore}
         disabled={isLoading}
         whileHover={{scale: 1.05}}
         whileTap={{scale: 0.95}}
         className={`px-8 py-4 rounded-xl ${
          isLoading
           ? "bg-teal-400"
           : "bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600"
         } text-white font-medium transition-all shadow-lg hover:shadow-xl`}>
         {isLoading ? (
          <span className="flex items-center justify-center gap-2">
           <FaSpinner className="animate-spin" /> Memuat...
          </span>
         ) : (
          <span className="flex items-center justify-center gap-2">
           Muat Lebih Banyak <FaArrowRight />
          </span>
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
