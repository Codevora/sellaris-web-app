import Link from "next/link";

export default function AuthLayout({children}: {children: React.ReactNode}) {
 return (
  <div className="flex flex-col min-h-screen w-full items-center  gap-2 bg-white">
   <header className=" top-0 z-10 flex w-full justify-between px-10 py-8">
    <nav className="flex justify-between w-full">
     <ul>
      <Link href="/">
       <h1
        className="text-3xl italic font-bold text-primary"
        style={{fontFamily: "'Raleway', sans-serif"}}>
        SELLARIS
       </h1>
      </Link>
     </ul>
     <ul>
      <Link href="/">
       <h1 className="text-lg text-primary">Contact Us</h1>
      </Link>
     </ul>
    </nav>
   </header>
   {children}
  </div>
 );
}
