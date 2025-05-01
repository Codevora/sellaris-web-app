"use client";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layouts/Navbar";
import {usePathname} from "next/navigation";
import {SessionProvider} from "next-auth/react";
import Footer from "@/components/layouts/Footer";

const geistSans = Geist({
 variable: "--font-geist-sans",
 subsets: ["latin"],
});

const geistMono = Geist_Mono({
 variable: "--font-geist-mono",
 subsets: ["latin"],
});

export default function RootLayout({
 children,
}: Readonly<{
 children: React.ReactNode;
}>) {
 const pathname = usePathname();
 const disableNavbar = [
  "/login",
  "/register",
  "/admin",
  "/pricing/checkout",
  "/unauthorized",
 ];

 const disableFooter = [
  "/login",
  "/register",
  "/admin",
  "/pricing/checkout",
  "/unauthorized",
 ];
 const showNavbar = !disableNavbar.some(
  (path) => pathname === path || pathname.startsWith(`${path}/`)
 );

 const showFooter = !disableFooter.some(
  (path) => pathname === path || pathname.startsWith(`${path}/`)
 );

 return (
  <html
   lang="en"
   suppressHydrationWarning>
   <SessionProvider>
    <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      {showNavbar && <Navbar />}
      <main>{children}</main>
      {showFooter && <Footer />}
    </body>
   </SessionProvider>
  </html>
 );
}
