import {Metadata} from "next";
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
 createdAt: string; // Diubah menjadi string karena menerima ISO string
 author: string;
 tags?: string[];
}

export async function generateMetadata({
 params,
}: {
 params: {id: string};
}): Promise<Metadata> {
 try {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const response = await fetch(`${baseUrl}/api/blog/${params.id}`);

  if (!response.ok) return {title: "Post not found"};

  const {data: post} = await response.json();

  return {
   title: `${post.title} | Sellaris Blog`,
   description: post.excerpt,
   openGraph: {
    title: post.title,
    description: post.excerpt,
   },
  };
 } catch (error) {
  return {
   title: "Post not found",
  };
 }
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
 console.log("Blog ID:", params.id); // Check if ID is received

 try {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const apiUrl = `${baseUrl}/api/blog/${params.id}`;
  console.log("Fetching from:", apiUrl); // Log the URL being fetched

  const response = await fetch(apiUrl, {
   next: {revalidate: 60},
  });

  console.log("Response status:", response.status); // Log response status

  if (!response.ok) {
   console.error("Fetch failed with status:", response.status);
   return notFound();
  }

  const result = await response.json();
  console.log("API Response:", result); // Log the full response

  const {data: post} = await response.json();

  // Validasi data yang diperlukan
  if (!post.title || !post.content) {
   return notFound();
  } 

  return (
   <div className="bg-gray-50 min-h-screen">
    <div className="container mx-auto px-4 py-12">
     <div className="max-w-4xl mx-auto">
      <Link
       href="/blog"
       className="inline-flex items-center text-teal-600 hover:text-teal-800 mb-6">
       <FaArrowLeft className="mr-2" /> Kembali ke Blog
      </Link>

      <StaggerContainer>
       <article className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* Header dengan gambar */}
        <div className="relative h-64 md:h-96 w-full bg-gray-100">
         {/* Placeholder untuk gambar */}
        </div>

        <div className="p-6 md:p-8">
         {/* Metadata post */}
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

         {/* Judul */}
         <FadeIn>
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
           {post.title}
          </h1>
         </FadeIn>

         {/* Konten */}
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

         {/* Komentar */}
         <CommentSection postId={post.id} />
        </div>
       </article>
      </StaggerContainer>

      {/* Artikel Terkait */}
      <FadeIn className="mt-16">
       <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Artikel Terkait
       </h2>
       <div className="grid md:grid-cols-2 gap-6">
        {/* Contoh artikel terkait - bisa diganti dengan fetch data */}
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
