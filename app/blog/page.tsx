import BlogUserPage from "@/components/layouts/BlogUserPage";
import {Suspense} from "react";

export const dynamic = "force-dynamic";

export default function BlogPage({params}: {params: {id: string}}) {
 return (
  <Suspense fallback={<div>Loading...</div>}>
   <BlogUserPage params={params}/>
  </Suspense>
 );
}
