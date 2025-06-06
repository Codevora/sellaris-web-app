import {FaCalendarAlt, FaUser, FaArrowLeft, FaTag} from "react-icons/fa";
import Link from "next/link";
import {notFound} from "next/navigation";
import {FadeIn, StaggerContainer} from "@/components/AnimatedComponent";
import CommentSection from "@/components/CommentSection";

interface BlogPost {
 id: string;
 title: string;
 excerpt: string;
 content: string;
 category: string;
 createdAt: string;
 author: string;
 tags?: string[];
}

const formatDate = (dateString: string) => {
 const date = new Date(dateString);
 return date.toLocaleDateString("id-ID", {
  day: "numeric",
  month: "long",
  year: "numeric",
 });
};

const formatShortDate = (dateString: string) => {
 const date = new Date(dateString);
 return date.toLocaleDateString("id-ID", {
  day: "numeric",
  month: "short",
  year: "numeric",
 });
};

export default async function BlogIdUserPage({params}: {params: {id: string}}) {
 try {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const response = await fetch(`${baseUrl}/api/blog/${params.id}`, {
   next: {revalidate: 60},
  });

  if (!response.ok) return notFound();

  const {data: post} = await response.json();

  if (!post.title || !post.content) {
   return notFound();
  }

  return (
   <div className="bg-gray-50 min-h-screen">
    <div className="container mx-auto px-4 py-12">
     <div className="max-w-4xl mx-auto">
      <Link
       href="/blog"
       className="inline-flex items-center text-teal-600 hover:text-teal-800 mb-6 transition-colors">
       <FaArrowLeft className="mr-2" /> Kembali ke Blog
      </Link>

      <StaggerContainer>
       <article className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* Header image placeholder */}
        <div className="relative h-64 md:h-96 w-full bg-gradient-to-r from-blue-50 to-teal-50 flex items-center justify-center">
         <span className="text-gray-400">Featured Image</span>
        </div>

        <div className="p-6 md:p-8">
         {/* Post metadata */}
         <FadeIn>
          <div className="flex flex-wrap items-center text-sm text-gray-500 mb-4 gap-2">
           <div className="flex items-center">
            <FaCalendarAlt className="mr-2" />
            <span>{formatDate(post.createdAt)}</span>
           </div>
           <div className="flex items-center">
            <FaUser className="mr-2" />
            <span>{post.author}</span>
           </div>
           <div className="flex items-center">
            <span className="inline-block bg-teal-100 text-teal-800 text-xs px-3 py-1 rounded-full">
             {post.category}
            </span>
           </div>
          </div>
         </FadeIn>

         {/* Title */}
         <FadeIn>
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
           {post.title}
          </h1>
         </FadeIn>

         {/* Content */}
         <FadeIn>
          <div
           className="prose max-w-none text-gray-700"
           dangerouslySetInnerHTML={{__html: post.content}}
          />
         </FadeIn>

         {/* Tags */}
         {post.tags && post.tags.length > 0 && (
          <FadeIn className="mt-8">
           <div className="flex items-center gap-2">
            <FaTag className="text-gray-400" />
            <div className="flex flex-wrap gap-2">
             {post.tags.map((tag: string) => (
              <span
               key={tag}
               className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
               {tag}
              </span>
             ))}
            </div>
           </div>
          </FadeIn>
         )}

         {/* Comment section */}
         <CommentSection postId={post.id} />
        </div>
       </article>
      </StaggerContainer>

      {/* Related articles */}
      <FadeIn className="mt-16">
       <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Artikel Terkait
       </h2>
       <div className="grid md:grid-cols-2 gap-6">
        {[1, 2].map((item) => (
         <div
          key={item}
          className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-all">
          <div className="flex">
           <div className="flex-shrink-0 w-24 h-24 bg-gray-100"></div>
           <div className="p-4">
            <h3 className="font-medium text-gray-800 mb-1">
             <Link
              href={`/blog/${post.id}`}
              className="hover:text-teal-500">
              {post.title.length > 60
               ? `${post.title.substring(0, 60)}...`
               : post.title}
             </Link>
            </h3>
            <p className="text-xs text-gray-500">
             {formatShortDate(post.createdAt)}
            </p>
           </div>
          </div>
         </div>
        ))}
       </div>
      </FadeIn>
     </div>
    </div>
   </div>
  );
 } catch (error) {
  console.error("Error in BlogPostPage:", error);
  return notFound();
 }
}
