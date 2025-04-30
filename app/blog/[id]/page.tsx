import {Metadata} from "next";
import BlogIdUserPage from "@/components/layouts/BlogIdUserPage";
import {Suspense} from "react";

export const dynamic = "force-dynamic";

export async function generateMetadata({
 params,
}: {
 params: {id: string};
}): Promise<Metadata> {
 try {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const response = await fetch(`${baseUrl}/api/blog/${params.id}`);

  if (!response.ok) {
   return {
    title: "Post not found | Sellaris Blog",
    description: "The requested blog post was not found",
   };
  }

  const {data: post} = await response.json();

  return {
   title: `${post.title} | Sellaris Blog`,
   description: post.excerpt,
   openGraph: {
    title: post.title,
    description: post.excerpt,
    type: "article",
    publishedTime: post.createdAt,
    authors: [post.author],
   },
   twitter: {
    card: "summary_large_image",
    title: post.title,
    description: post.excerpt,
   },
  };
 } catch (error) {
  return {
   title: "Blog Post | Sellaris Blog",
   description: "Discover insightful articles on our blog",
  };
 }
}

export default function BlogPage({params}: {params: {id: string}}) {
 return (
  <Suspense
   fallback={
    <div className="min-h-screen flex items-center justify-center">
     Loading blog post...
    </div>
   }>
   <BlogIdUserPage params={params} />
  </Suspense>
 );
}
