"use client";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layouts/Navbar";
import {usePathname} from "next/navigation";
import {SessionProvider} from "next-auth/react";
import {ThemeProvider} from "next-themes"; // Tambahkan ini

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
 const disableNavbar = ["/login", "/register", "/admin", "/pricing/checkout"];
 const showNavbar = !disableNavbar.some(
  (path) => pathname === path || pathname.startsWith(`${path}/`)
 );

 return (
  <html
   lang="en"
   suppressHydrationWarning>
   {" "}
   {/* Tambahkan suppressHydrationWarning */}
   <SessionProvider>
    <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
     <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem>
      {" "}
      {/* Tambahkan ThemeProvider */}
      {showNavbar && <Navbar />}
      <main>{children}</main>
     </ThemeProvider>
    </body>
   </SessionProvider>
  </html>
 );
}
