import BlogUserPage from "@/components/layouts/BlogUserPage";
import {Suspense} from "react";

export default function BlogPage() {
 return <Suspense fallback={<div>Loading...</div>}><BlogUserPage /></Suspense>;
}
