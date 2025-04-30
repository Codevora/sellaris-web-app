import {Metadata} from "next";
import {
 FaChartLine,
 FaShieldAlt,
 FaHandshake,
 FaLightbulb,
 FaGlobeAsia,
 FaCogs,
 FaMobileAlt,
 FaServer,
} from "react-icons/fa";
import Link from "next/link";
import {
 FadeIn,
 StaggerContainer,
 MotionDiv,
 MotionButton,
} from "@/components/AnimatedComponent";
import {FaArrowRightLong} from "react-icons/fa6";
import Image from "next/image";

export const metadata: Metadata = {
 title: "Tentang Sellaris - Solusi Bisnis yang Menyenangkan",
 description:
  "Kenali lebih dalam tentang misi, visi, dan teknologi kami di Sellaris",
};

const TechStack = [
 {
  icon: <FaMobileAlt className="text-4xl text-teal-500" />,
  name: "Mobile First",
  description:
   "Dibangun dengan pendekatan mobile-first untuk pengalaman terbaik di perangkat apapun",
 },
 {
  icon: <FaServer className="text-4xl text-blue-500" />,
  name: "Cloud Native",
  description:
   "Arsitektur berbasis cloud untuk keandalan dan skalabilitas maksimal",
 },
 {
  icon: <FaCogs className="text-4xl text-amber-500" />,
  name: "AI Powered",
  description:
   "Didukung kecerdasan buatan untuk analisis dan rekomendasi cerdas",
 },
];

const AboutPage = () => {
 return (
  <div className="flex flex-col w-full overflow-x-hidden bg-gray-50">
   {/* Hero Section */}
   <section className="relative flex items-center justify-center min-h-[60vh] bg-gradient-to-br from-blue-50 to-white overflow-hidden">
    <div className="absolute inset-0 overflow-hidden">
     <MotionDiv
      animate={{
       x: [0, 20, 0],
       y: [0, 15, 0],
       transition: {duration: 15, repeat: Infinity, ease: "linear"},
      }}
      className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-blue-100/50 blur-xl"
     />
     <MotionDiv
      animate={{
       x: [0, -30, 0],
       y: [0, -20, 0],
       transition: {duration: 20, repeat: Infinity, ease: "linear"},
      }}
      className="absolute bottom-1/3 right-1/4 w-40 h-40 rounded-full bg-teal-100/50 blur-xl"
     />
    </div>

    <div className="container mx-auto px-6 z-10 text-center">
     <StaggerContainer className="flex flex-col items-center">
      <FadeIn>
       <h1 className="font-raleway font-bold text-4xl md:text-5xl lg:text-6xl text-gray-800 leading-tight mb-6">
        <span className="text-teal-500 bg-clip-text bg-gradient-to-r from-teal-500 to-blue-500">
         Tentang Sellaris
        </span>
       </h1>
      </FadeIn>
      <FadeIn>
       <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
        Platform revolusioner yang mengubah cara pelaku bisnis mengelola
        operasional mereka dengan teknologi terkini.
       </p>
      </FadeIn>
     </StaggerContainer>
    </div>
   </section>

   {/* Our Story Section */}
   <section className="py-20 bg-white relative">
    <div className="container mx-auto px-6">
     <div className="flex flex-col lg:flex-row items-center gap-12">
      <MotionDiv
       initial={{opacity: 0, x: -100}}
       whileInView={{opacity: 1, x: 0}}
       transition={{duration: 0.8}}
       viewport={{once: true}}
       className="lg:w-1/2">
       <Image
        src="/assets/about-1.jpg"
        alt="Our Story"
        width={600}
        height={400}
        className="rounded-2xl shadow-lg hover:rotate-1 transition-transform duration-300"
       />
      </MotionDiv>

      <div className="lg:w-1/2">
       <MotionDiv
        initial={{opacity: 0, x: 100}}
        whileInView={{opacity: 1, x: 0}}
        transition={{duration: 0.8}}
        viewport={{once: true}}
        className="flex flex-col gap-6">
        <h2 className="font-raleway font-bold text-3xl md:text-4xl text-gray-800">
         Cerita <span className="text-teal-500">Kami</span>
        </h2>

        <p className="text-gray-600">
         Sellaris lahir dari pengalaman langsung menghadapi tantangan mengelola
         bisnis di era digital. Dibangun oleh seorang developer yang juga pelaku
         bisnis, platform ini dirancang untuk menyelesaikan masalah nyata yang
         sering dihadapi UMKM.
        </p>

        <p className="text-gray-600">
         Dengan pendekatan "less is more", kami fokus pada fungsionalitas inti
         yang benar-benar dibutuhkan, menghindari kompleksitas yang tidak perlu,
         dan memberikan pengalaman pengguna yang menyenangkan.
        </p>

        <MotionButton
         whileHover={{x: 5, scale: 1.05}}
         className="self-start mt-4">
         <Link
          href="/a"
          className="flex items-center gap-2 text-teal-600 font-semibold hover:underline">
          Pelajari Filosofi Kami <FaArrowRightLong />
         </Link>
        </MotionButton>
       </MotionDiv>
      </div>
     </div>
    </div>
   </section>

   {/* Mission & Vision Section */}
   <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
    <div className="container mx-auto px-6">
     <StaggerContainer className="flex flex-col items-center text-center mb-16">
      <FadeIn>
       <h2 className="font-raleway font-bold text-3xl md:text-4xl text-gray-800 mb-4">
        Misi & <span className="text-teal-500">Visi</span>
       </h2>
       <div className="w-20 h-1 bg-teal-500 mx-auto mb-8"></div>
      </FadeIn>
     </StaggerContainer>

     <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      <MotionDiv
       whileHover={{y: -10}}
       className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all">
       <div className="flex items-center gap-4 mb-6">
        <div className="p-3 bg-teal-100 rounded-lg text-teal-600">
         <FaLightbulb className="text-2xl" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800">Misi Kami</h3>
       </div>
       <p className="text-gray-600 text-left">
        Menyederhanakan manajemen bisnis melalui solusi teknologi yang intuitif,
        terjangkau, dan berdampak langsung pada efisiensi operasional.
       </p>
      </MotionDiv>

      <MotionDiv
       whileHover={{y: -10}}
       className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all">
       <div className="flex items-center gap-4 mb-6">
        <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
         <FaGlobeAsia className="text-2xl" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800">Visi Kami</h3>
       </div>
       <p className="text-gray-600 text-left">
        Menjadi platform manajemen bisnis pilihan utama untuk usaha kecil dan
        menengah di Indonesia, dengan fokus pada kualitas dan kemudahan
        penggunaan.
       </p>
      </MotionDiv>
     </div>
    </div>
   </section>

   {/* Values Section */}
   <section className="py-20 bg-white">
    <div className="container mx-auto px-6">
     <StaggerContainer className="flex flex-col items-center text-center mb-16">
      <FadeIn>
       <h2 className="font-raleway font-bold text-3xl md:text-4xl text-gray-800 mb-4">
        Nilai <span className="text-teal-500">Kami</span>
       </h2>
       <p className="text-gray-600 max-w-2xl mx-auto">
        Prinsip-prinsip yang menjadi dasar setiap pengembangan Sellaris
       </p>
      </FadeIn>
     </StaggerContainer>

     <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      <MotionDiv
       whileHover={{y: -10}}
       className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100">
       <div className="p-3 bg-blue-100 rounded-lg text-blue-600 w-max mb-4">
        <FaChartLine className="text-2xl" />
       </div>
       <h3 className="text-xl font-semibold text-gray-800 mb-2">Simplicity</h3>
       <p className="text-gray-600">
        Kami percaya solusi terbaik adalah yang paling sederhana. Setiap fitur
        dirancang untuk memecahkan masalah tanpa menambah kompleksitas.
       </p>
      </MotionDiv>

      <MotionDiv
       whileHover={{y: -10}}
       className="bg-gradient-to-br from-amber-50 to-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100">
       <div className="p-3 bg-amber-100 rounded-lg text-amber-600 w-max mb-4">
        <FaShieldAlt className="text-2xl" />
       </div>
       <h3 className="text-xl font-semibold text-gray-800 mb-2">Integrity</h3>
       <p className="text-gray-600">
        Kejujuran dan transparansi dalam setiap aspek, dari kode program hingga
        hubungan dengan pengguna adalah hal yang tidak bisa ditawar.
       </p>
      </MotionDiv>

      <MotionDiv
       whileHover={{y: -10}}
       className="bg-gradient-to-br from-emerald-50 to-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100">
       <div className="p-3 bg-emerald-100 rounded-lg text-emerald-600 w-max mb-4">
        <FaHandshake className="text-2xl" />
       </div>
       <h3 className="text-xl font-semibold text-gray-800 mb-2">Impact</h3>
       <p className="text-gray-600">
        Kami mengukur kesuksesan dari seberapa besar dampak positif yang bisa
        kami berikan kepada bisnis-bisnis yang menggunakan Sellaris.
       </p>
      </MotionDiv>
     </div>
    </div>
   </section>

   {/* Technology Section */}
   <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
    <div className="container mx-auto px-6">
     <StaggerContainer className="flex flex-col items-center text-center mb-16">
      <FadeIn>
       <h2 className="font-raleway font-bold text-3xl md:text-4xl text-gray-800 mb-4">
        Teknologi <span className="text-teal-500">Kami</span>
       </h2>
       <p className="text-gray-600 max-w-2xl mx-auto">
        Dibangun dengan teknologi modern untuk performa terbaik
       </p>
      </FadeIn>
     </StaggerContainer>

     <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {TechStack.map((tech, index) => (
       <MotionDiv
        key={index}
        initial={{opacity: 0, y: 50}}
        whileInView={{opacity: 1, y: 0}}
        transition={{duration: 0.5, delay: index * 0.1}}
        viewport={{once: true}}
        whileHover={{y: -10}}
        className="flex flex-col items-center bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all">
        <div className="mb-4">{tech.icon}</div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
         {tech.name}
        </h3>
        <p className="text-gray-600 text-center">{tech.description}</p>
       </MotionDiv>
      ))}
     </div>
    </div>
   </section>

   {/* CTA Section */}
   <section className="py-20 bg-gradient-to-br from-teal-600 to-teal-700 text-white relative overflow-hidden">
    <div className="absolute inset-0 overflow-hidden">
     <MotionDiv
      animate={{
       x: [0, 100, 0],
       y: [0, 50, 0],
       rotate: [0, 360, 0],
       transition: {duration: 20, repeat: Infinity, ease: "linear"},
      }}
      className="absolute top-1/3 left-1/4 w-40 h-40 rounded-full bg-teal-500/20 blur-xl"
     />
     <MotionDiv
      animate={{
       x: [0, -80, 0],
       y: [0, -60, 0],
       rotate: [0, -360, 0],
       transition: {duration: 25, repeat: Infinity, ease: "linear"},
      }}
      className="absolute bottom-1/4 right-1/3 w-48 h-48 rounded-full bg-amber-300/10 blur-xl"
     />
    </div>

    <div className="container mx-auto px-6 relative z-10">
     <StaggerContainer className="flex flex-col items-center text-center">
      <FadeIn>
       <h1 className="font-raleway font-bold text-4xl md:text-5xl mb-6">
        Siap <span className="text-amber-300">Mengubah</span> Cara Anda
        Berbisnis?
       </h1>
       <p className="text-lg text-teal-100 max-w-2xl mx-auto mb-8 leading-relaxed">
        Bergabung dengan ribuan bisnis yang telah mempercayakan operasional
        mereka kepada Sellaris.
       </p>
      </FadeIn>

      <FadeIn className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
       <MotionButton
        whileHover={{scale: 1.05}}
        whileTap={{scale: 0.95}}
        className="px-6 py-3 bg-white text-teal-600 font-medium rounded-lg shadow-lg hover:shadow-xl transition-all">
        <Link
         href="/a"
         className="flex items-center justify-center gap-2">
         Mulai Sekarang
        </Link>
       </MotionButton>
       <MotionButton
        whileHover={{scale: 1.05}}
        whileTap={{scale: 0.95}}
        className="px-6 py-3 border-2 border-white text-white font-medium rounded-lg hover:bg-white/10 transition-all">
        <Link
         href="/a"
         className="flex items-center justify-center gap-2">
         Lihat Demo
        </Link>
       </MotionButton>
      </FadeIn>
     </StaggerContainer>
    </div>
   </section>
  </div>
 );
};

export default AboutPage;
