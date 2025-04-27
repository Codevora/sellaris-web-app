"use client";
import LoginForm from "@/components/core/modal/loginForm";
import {useSearchParams} from "next/navigation";

export default function LoginPage() {
 const params = useSearchParams();
 const callbackUrl = params.get("callbackUrl") || "/dashboard";

 return <LoginForm searchParams={{callbackUrl}} />;
}
