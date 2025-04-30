"use client";

import {useEffect, useState} from "react";
import {
 FaCalendarAlt,
 FaTags,
 FaUser,
 FaSearch,
 FaArrowLeft,
} from "react-icons/fa";
import Link from "next/link";
import {
 FadeIn,
 StaggerContainer,
 MotionDiv,
 MotionButton,
} from "@/components/AnimatedComponent";
import {FaArrowRightLong} from "react-icons/fa6";

interface BlogPost {
 id: string;
 title: string;
 excerpt: string;
 content: string;
 category: string;
 createdAt: string | Date;
 author: string;
 tags?: string[];
}

const formatDate = (date: string | Date): string => {
 if (!date) return "";
 const dateObj = typeof date === "string" ? new Date(date) : date;
 return dateObj.toLocaleDateString("id-ID", {
  day: "numeric",
  month: "long",
  year: "numeric",
 });
};

const formatShortDate = (date: string | Date): string => {
 if (!date) return "";
 const dateObj = typeof date === "string" ? new Date(date) : date;
 return dateObj.toLocaleDateString("id-ID", {
  day: "numeric",
  month: "short",
  year: "numeric",
 });
};

export default function BlogUserPage({
 searchParams,
}: {
 searchParams?: {category?: string};
}) {
 const [posts, setPosts] = useState<BlogPost[]>([]);
 const [categories, setCategories] = useState<string[]>([]);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState<string | null>(null);

 const category = searchParams?.category;
 const popularTags = [
  "Retail",
  "F&B",
  "Analytics",
  "Technology",
  "Management",
  "Finance",
 ];

 useEffect(() => {
  const fetchData = async () => {
   try {
    setLoading(true);
    setError(null);

    // Fetch posts
    const postsUrl = category
     ? `/api/blog?category=${encodeURIComponent(category)}`
     : "/api/blog";

    const postsRes = await fetch(postsUrl);
    if (!postsRes.ok) throw new Error("Failed to fetch posts");
    const postsData = await postsRes.json();

    // Fetch categories
    const categoriesRes = await fetch("/api/blog/categories");
    if (!categoriesRes.ok) throw new Error("Failed to fetch categories");
    const categoriesData = await categoriesRes.json();

    setPosts(postsData.data);
    setCategories(categoriesData.data);
   } catch (err) {
    console.error("Fetch error:", err);
    setError(err instanceof Error ? err.message : "Failed to load data");
   } finally {
    setLoading(false);
   }
  };

  fetchData();
 }, [category]);

 if (loading) {
  return (
   <div className="flex justify-center items-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
   </div>
  );
 }

 if (error) {
  return (
   <div className="flex justify-center items-center min-h-screen">
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
     <p>Error: {error}</p>
     <button
      onClick={() => window.location.reload()}
      className="mt-2 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700">
      Try Again
     </button>
    </div>
   </div>
  );
 }

 return (
  <div className="flex flex-col w-full overflow-x-hidden bg-gray-50">
   {/* Hero Section */}
   <section className="relative flex items-center justify-center min-h-[50vh] bg-gradient-to-br from-blue-50 to-white overflow-hidden pt-24">
    <div className="absolute inset-0 overflow-hidden">
     <MotionDiv
      animate={{
       x: [0, 20, 0],
       y: [0, 15, 0],
       transition: {duration: 15, repeat: Infinity, ease: "linear"},
      }}
      className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-blue-100/50 blur-xl"
     />
     <MotionDiv
      animate={{
       x: [0, -30, 0],
       y: [0, -20, 0],
       transition: {duration: 20, repeat: Infinity, ease: "linear"},
      }}
      className="absolute bottom-1/3 right-1/4 w-40 h-40 rounded-full bg-teal-100/50 blur-xl"
     />
    </div>

    <div className="container mx-auto px-6 z-10">
     <StaggerContainer className="flex flex-col justify-center text-center">
      <FadeIn>
       <h1 className="font-raleway font-bold text-4xl md:text-5xl lg:text-6xl text-gray-800 leading-tight mb-6">
        <span className="text-teal-500 bg-clip-text bg-gradient-to-r from-teal-500 to-blue-500">
         Sellaris Blog
        </span>
       </h1>
      </FadeIn>
      <FadeIn>
       <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-2xl mx-auto">
        {category
         ? `Artikel dalam kategori ${category}`
         : "Temukan wawasan bisnis terbaru, tips produktivitas, dan strategi pertumbuhan untuk mengembangkan bisnis Anda."}
       </p>
      </FadeIn>
      {category && (
       <FadeIn>
        <Link
         href="/blog"
         className="inline-flex items-center text-teal-600 hover:text-teal-800 mx-auto">
         <FaArrowLeft className="mr-2" /> Kembali ke semua artikel
        </Link>
       </FadeIn>
      )}
     </StaggerContainer>
    </div>
   </section>

   {/* Main Content Section */}
   <section className="py-16 bg-white">
    <div className="container mx-auto px-6">
     <div className="flex flex-col lg:flex-row gap-12">
      {/* Blog Posts */}
      <div className="lg:w-2/3">
       {category && (
        <div className="mb-8">
         <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Kategori: <span className="text-teal-500">{category}</span>
         </h2>
         <div className="w-20 h-1 bg-teal-500"></div>
        </div>
       )}

       {posts.length === 0 ? (
        <div className="text-center py-12">
         <h3 className="text-xl font-medium text-gray-600 mb-4">
          {category
           ? `Tidak ada artikel ditemukan dalam kategori ${category}`
           : "Belum ada artikel tersedia"}
         </h3>
         {category && (
          <Link
           href="/blog"
           className="inline-flex items-center px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600">
           Lihat semua artikel
          </Link>
         )}
        </div>
       ) : (
        <StaggerContainer className="grid md:grid-cols-2 gap-8">
         {posts.map((post) => (
          <FadeIn key={post.id}>
           <MotionDiv
            whileHover={{y: -5}}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all border border-gray-100">
            <div className="relative h-48 overflow-hidden bg-gray-100">
             {/* Placeholder for image */}
            </div>
            <div className="p-6">
             <div className="flex items-center text-sm text-gray-500 mb-3">
              <FaCalendarAlt className="mr-2" />
              <span>{formatDate(post.createdAt)}</span>
              <span className="mx-2">•</span>
              <FaUser className="mr-2" />
              <span>{post.author}</span>
             </div>
             <h3 className="text-xl font-semibold text-gray-800 mb-3">
              <Link
               href={`/blog/${post.id}`}
               className="hover:text-teal-500 transition-colors">
               {post.title}
              </Link>
             </h3>
             <p className="text-gray-600 mb-4">{post.excerpt}</p>
             <div className="flex justify-between items-center">
              <span className="inline-block bg-teal-100 text-teal-800 text-xs px-3 py-1 rounded-full">
               {post.category}
              </span>
              <MotionButton whileHover={{x: 5}}>
               <Link
                href={`/blog/${post.id}`}
                className="flex items-center gap-1 text-teal-600 font-medium text-sm hover:underline">
                Baca selengkapnya <FaArrowRightLong className="text-xs" />
               </Link>
              </MotionButton>
             </div>
            </div>
           </MotionDiv>
          </FadeIn>
         ))}
        </StaggerContainer>
       )}
      </div>

      {/* Sidebar */}
      <div className="lg:w-1/3">
       <MotionDiv
        initial={{opacity: 0, y: 50}}
        whileInView={{opacity: 1, y: 0}}
        transition={{duration: 0.5}}
        viewport={{once: true}}
        className="sticky top-8 space-y-8">
        {/* Search Widget */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
         <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Cari Artikel
         </h3>
         <div className="relative">
          <input
           type="text"
           placeholder="Kata kunci..."
           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-teal-500">
           <FaSearch />
          </button>
         </div>
        </div>

        {/* Categories Widget */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
         <h3 className="text-xl font-semibold text-gray-800 mb-4">Kategori</h3>
         <ul className="space-y-3">
          <li>
           <Link
            href="/blog"
            className={`flex items-center justify-between text-gray-600 hover:text-teal-500 transition-colors ${
             !category ? "font-medium text-teal-600" : ""
            }`}>
            <span>Semua Kategori</span>
            <span className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded-full">
             {posts.length}
            </span>
           </Link>
          </li>
          {categories.map((cat) => {
           const postCount = posts.filter((p) => p.category === cat).length;
           return (
            <li key={cat}>
             <Link
              href={`/blog?category=${encodeURIComponent(cat)}`}
              className={`flex items-center justify-between text-gray-600 hover:text-teal-500 transition-colors ${
               category === cat ? "font-medium text-teal-600" : ""
              }`}>
              <span>{cat}</span>
              <span className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded-full">
               {postCount}
              </span>
             </Link>
            </li>
           );
          })}
         </ul>
        </div>

        {/* Popular Tags */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
         <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Tag Populer
         </h3>
         <div className="flex flex-wrap gap-2">
          {popularTags.map((tag) => (
           <MotionButton
            key={tag}
            whileHover={{scale: 1.05}}
            whileTap={{scale: 0.95}}
            className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-teal-500 hover:text-white transition-colors">
            {tag}
           </MotionButton>
          ))}
         </div>
        </div>

        {/* Recent Posts */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
         <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Artikel Terbaru
         </h3>
         <div className="space-y-4">
          {posts.slice(0, 3).map((post) => (
           <div
            key={post.id}
            className="flex gap-3">
            <div className="flex-shrink-0 w-16 h-16 relative rounded-lg overflow-hidden bg-gray-100">
             {/* Placeholder for image */}
            </div>
            <div>
             <h4 className="font-medium text-gray-800 text-sm hover:text-teal-500 transition-colors">
              <Link href={`/blog/${post.id}`}>
               {post.title.length > 50
                ? `${post.title.substring(0, 50)}...`
                : post.title}
              </Link>
             </h4>
             <p className="text-xs text-gray-500 mt-1">
              {formatShortDate(post.createdAt)}
             </p>
            </div>
           </div>
          ))}
         </div>
        </div>

        {/* Newsletter */}
        <div className="bg-gradient-to-br from-teal-50 to-white p-6 rounded-xl shadow-sm border border-teal-100">
         <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Newsletter
         </h3>
         <p className="text-gray-600 mb-4 text-sm">
          Dapatkan artikel terbaru langsung ke email Anda.
         </p>
         <div className="space-y-3">
          <input
           type="email"
           placeholder="Alamat email Anda"
           className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
          />
          <MotionButton
           whileHover={{scale: 1.05}}
           whileTap={{scale: 0.95}}
           className="w-full px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 text-sm">
           Berlangganan
          </MotionButton>
         </div>
        </div>
       </MotionDiv>
      </div>
     </div>
    </div>
   </section>

   {/* CTA Section */}
   <section className="py-16 bg-gradient-to-br from-teal-600 to-teal-700 text-white">
    <div className="container mx-auto px-6 text-center">
     <StaggerContainer>
      <FadeIn>
       <h2 className="font-raleway font-bold text-3xl md:text-4xl mb-6">
        Siap Mengambil Bisnis Anda ke Level Berikutnya?
       </h2>
      </FadeIn>
      <FadeIn>
       <p className="text-lg text-teal-100 max-w-2xl mx-auto mb-8 leading-relaxed">
        Dapatkan tips dan strategi bisnis eksklusif langsung ke inbox Anda.
       </p>
      </FadeIn>
      <FadeIn className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
       <input
        type="email"
        placeholder="Masukkan email Anda"
        className="px-6 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-300"
       />
       <MotionButton
        whileHover={{scale: 1.05}}
        whileTap={{scale: 0.95}}
        className="px-6 py-3 bg-amber-400 text-gray-800 font-medium rounded-lg shadow-lg hover:shadow-xl hover:bg-amber-300 transition-all">
        Berlangganan Sekarang
       </MotionButton>
      </FadeIn>
     </StaggerContainer>
    </div>
   </section>
  </div>
 );
}
