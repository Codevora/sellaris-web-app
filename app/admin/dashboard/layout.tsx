import type {Metadata} from "next";
import ClientDashboardLayout from "@/components/layouts/Admin/AdminDashboardLayout";
import { routeMetadata } from "@/types/route-types";

export async function generateMetadata({
 params,
}: {
 params: {slug: string};
}): Promise<Metadata> {
 const pathname = params.slug
  ? `/admin/dashboard/${params.slug}`
  : "/admin/dashboard";
 const metadata = routeMetadata[pathname] || routeMetadata["/admin/dashboard"];

 return {
  ...metadata,
  icons: {
   icon: "/favicon-admin.ico",
  },
 };
}

export default function DashboardLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 return <ClientDashboardLayout>{children}</ClientDashboardLayout>;
}
