import CommentViews from "@/components/layouts/Admin/WebMaster/Blog/CommentViews";
import { Suspense } from "react";

export default function AdminCommentsPage() {
 return <Suspense fallback={<div>Loading...</div>}><CommentViews /></Suspense>;
}