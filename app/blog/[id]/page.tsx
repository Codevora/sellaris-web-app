import BlogIdUserPage from "@/components/layouts/BlogIdUserPage";
import { Suspense } from "react";

export default function BlogPage({params}: {params: {id: string}}) {
 return (
  <Suspense fallback={<div>Loading...</div>}>
   <BlogIdUserPage params={params} />
  </Suspense>
 );
}
