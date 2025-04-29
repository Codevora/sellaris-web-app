import {Metadata} from "next";
import {
 FaChartLine,
 FaShieldAlt,
 FaMoneyBillWave,
 FaUsers,
 FaStore,
 FaQrcode,
 FaFileInvoiceDollar,
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
 title: "Sellaris - Solusi Bisnis yang Menyenangkan",
 description: "Platform manajemen bisnis dengan pengalaman visual memukau",
};

const Brands = [
 {icon: <FaStore className="text-5xl text-teal-500" />, name: "Retail"},
 {icon: <FaQrcode className="text-5xl text-teal-500" />, name: "F&B"},
 {
  icon: <FaFileInvoiceDollar className="text-5xl text-teal-500" />,
  name: "Service",
 },
];

const Brands2 = [
 {icon: <FaUsers className="text-5xl text-teal-500" />, name: "Enterprise"},
 {icon: <FaChartLine className="text-5xl text-teal-500" />, name: "Startup"},
];

const Home = () => {
 return (
  <div className="flex flex-col w-full overflow-x-hidden bg-gray-50">
   {/* Hero Section - 3D Parallax Effect */}
   <section className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-white overflow-hidden">
    {/* Floating background elements */}
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

    <div className="container mx-auto flex flex-col lg:flex-row items-center gap-12 z-10 px-6">
     <StaggerContainer className="flex flex-col justify-center lg:w-1/2">
      <FadeIn>
       <h1 className="font-raleway font-bold text-4xl md:text-5xl lg:text-6xl text-gray-800 leading-tight mb-6">
        <span className="inline-block">Transformasi Bisnis</span>
        <br />
        <span className="text-teal-500 bg-clip-text bg-gradient-to-r from-teal-500 to-blue-500">
         dengan Sellaris
        </span>
       </h1>
      </FadeIn>
      <FadeIn>
       <p className="text-lg text-gray-600 leading-relaxed mb-8">
        Sellaris menyediakan solusi terintegrasi untuk mengelola seluruh
        operasional bisnis Anda, mulai dari transaksi kasir, manajemen
        inventori, hingga analisis laporan keuangan - semuanya dalam satu
        platform.
       </p>
      </FadeIn>
      <FadeIn className="flex flex-col sm:flex-row gap-4 w-full mt-4">
       <MotionButton
        whileHover={{scale: 1.05}}
        whileTap={{scale: 0.95}}
        className="px-6 py-3 bg-gradient-to-r from-teal-500 to-blue-500 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all">
        <Link
         href="/a"
         className="flex items-center justify-center gap-2">
         Mulai Sekarang <FaArrowRightLong />
        </Link>
       </MotionButton>
       <MotionButton
        whileHover={{scale: 1.05}}
        whileTap={{scale: 0.95}}
        className="px-6 py-3 border-2 border-gray-300 bg-white text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all">
        <Link
         href="/a"
         className="flex items-center justify-center gap-2">
         Hubungi Kami
        </Link>
       </MotionButton>
      </FadeIn>
     </StaggerContainer>

     <MotionDiv
      initial={{opacity: 0, y: 50}}
      animate={{opacity: 1, y: 0}}
      transition={{duration: 0.8}}
      className="lg:w-1/2 flex justify-center relative group">
      {/* Main Image Container */}
      <div className="relative z-10 overflow-hidden rounded-2xl">
       <Image
        src="/person/1.png"
        alt="hero"
        width={350}
        height={350}
        className="object-cover w-full h-auto transition-all duration-500 group-hover:scale-105"
       />

       {/* Overlay Border */}
       <div className="absolute inset-0 border-4 border-teal-400/30 rounded-2xl pointer-events-none"></div>
      </div>

      {/* Floating Border Effect */}
      <div className="absolute -bottom-6 -left-6 w-[calc(100%+48px)] h-[calc(100%+48px)] border-4 border-teal-400 rounded-2xl z-0 transition-all duration-700 group-hover:-translate-x-1 group-hover:-translate-y-1"></div>

      {/* Subtle Shadow */}
      <div className="absolute inset-0 bg-teal-400/10 rounded-2xl -z-10 translate-x-4 translate-y-4"></div>
     </MotionDiv>
    </div>
   </section>

   {/* Features Section - Interactive Cards */}
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
        src="/assets/1.png"
        alt="feature"
        width={600}
        height={500}
        className=" hover:rotate-1 transition-transform duration-300"
       />
      </MotionDiv>

      <div className="lg:w-1/2">
       <MotionDiv
        initial={{opacity: 0, x: 100}}
        whileInView={{opacity: 1, x: 0}}
        transition={{duration: 0.8}}
        viewport={{once: true}}
        className="flex flex-col gap-10">
        <h1 className="font-raleway font-bold text-4xl md:text-5xl text-gray-800">
         Efisiensi <span className="text-teal-500">Tanpa Batas</span>
        </h1>

        <div className="space-y-6">
         <MotionDiv
          whileHover={{y: -5}}
          className="flex gap-4 items-start p-6 bg-gradient-to-r from-blue-50 to-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100">
          <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
           <FaChartLine className="text-2xl" />
          </div>
          <div>
           <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Analisis Real-time
           </h3>
           <p className="text-gray-600">
            Analisis bisnis real-time untuk pengambilan keputusan yang lebih
            cerdas
           </p>
          </div>
         </MotionDiv>

         <MotionDiv
          whileHover={{y: -5}}
          className="flex gap-4 items-start p-6 bg-gradient-to-r from-amber-50 to-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100">
          <div className="p-3 bg-amber-100 rounded-lg text-amber-600">
           <FaShieldAlt className="text-2xl" />
          </div>
          <div>
           <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Keamanan Data
           </h3>
           <p className="text-gray-600">
            Keamanan data terjamin dengan sistem enkripsi tingkat tinggi
           </p>
          </div>
         </MotionDiv>

         <MotionDiv
          whileHover={{y: -5}}
          className="flex gap-4 items-start p-6 bg-gradient-to-r from-emerald-50 to-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100">
          <div className="p-3 bg-emerald-100 rounded-lg text-emerald-600">
           <FaMoneyBillWave className="text-2xl" />
          </div>
          <div>
           <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Multi-Pembayaran
           </h3>
           <p className="text-gray-600">
            Integrasi pembayaran lengkap dengan berbagai metode
           </p>
          </div>
         </MotionDiv>
        </div>

        <MotionButton
         whileHover={{x: 5, scale: 1.05}}
         className="self-start mt-4">
         <Link
          href="/a"
          className="flex items-center gap-2 text-teal-600 font-semibold hover:underline">
          Pelajari Lebih Lanjut <FaArrowRightLong />
         </Link>
        </MotionButton>
       </MotionDiv>
      </div>
     </div>
    </div>
   </section>

   {/* Brands Section - Floating Cards */}
   <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
    <div className="container mx-auto px-6">
     <StaggerContainer className="flex flex-col items-center text-center">
      <FadeIn>
       <h1 className="font-raleway font-bold text-4xl md:text-5xl text-gray-800 mb-4">
        Dipercaya <span className="text-teal-500">5000+ Bisnis</span>
       </h1>
       <p className="text-gray-600 max-w-2xl mx-auto mb-12">
        Bergabung dengan jaringan bisnis yang telah berkembang bersama Sellaris
       </p>
      </FadeIn>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 w-full max-w-5xl mx-auto">
       {[...Brands, ...Brands2].map((item, index) => (
        <MotionDiv
         key={index}
         initial={{opacity: 0, y: 50}}
         whileInView={{opacity: 1, y: 0}}
         transition={{duration: 0.5, delay: index * 0.1}}
         viewport={{once: true}}
         whileHover={{y: -10}}
         className="flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all">
         {item.icon}
         <p className="mt-4 font-semibold text-gray-700">{item.name}</p>
        </MotionDiv>
       ))}
      </div>
     </StaggerContainer>
    </div>
   </section>

   {/* Testimonial Section - 3D Card Effect */}
   <section className="py-20 bg-gradient-to-br from-teal-600 to-teal-700 text-white relative">
    <div className="container mx-auto px-6">
     <MotionDiv
      initial={{opacity: 0}}
      whileInView={{opacity: 1}}
      transition={{duration: 0.8}}
      viewport={{once: true}}
      className="max-w-4xl mx-auto">
      <div className="text-center mb-16">
       <h2 className="font-raleway font-bold text-4xl md:text-5xl mb-6">
        Apa Kata Mereka Tentang{" "}
        <span className="text-amber-300">Sellaris?</span>
       </h2>
       <div className="w-20 h-1 bg-amber-300 mx-auto"></div>
      </div>

      <MotionDiv
       whileHover={{scale: 1.02}}
       className="bg-white/10 backdrop-blur-md rounded-3xl p-10 border border-white/20 shadow-lg relative overflow-hidden">
       <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-teal-500/20"></div>
       <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-amber-300/10"></div>

       <div className="relative z-10">
        <div className="flex items-center mb-8">
         <div className="w-16 h-16 rounded-full bg-teal-500 flex items-center justify-center text-2xl font-bold mr-4">
          AS
         </div>
         <div>
          <h4 className="font-bold text-xl">Ahmad Surya</h4>
          <p className="text-teal-100">Pemilik Restoran Chain</p>
         </div>
        </div>
        <p className="text-lg leading-relaxed mb-6 italic">
         "Sejak menggunakan Sellaris, operasional toko kami menjadi lebih
         efisien. Transaksi lebih cepat, laporan keuangan lebih akurat, dan yang
         paling penting, kami bisa fokus mengembangkan bisnis tanpa khawatir
         dengan masalah teknis."
        </p>
       </div>
      </MotionDiv>
     </MotionDiv>
    </div>
   </section>

   {/* Pricing Section - Animated Cards */}
   <section className="py-20 bg-white relative overflow-hidden">
    <div className="container mx-auto px-6">
     <div className="flex flex-col lg:flex-row items-center gap-12">
      {/* Image Section - Enhanced with animations */}
      <MotionDiv
       initial={{opacity: 0, x: -100}}
       whileInView={{opacity: 1, x: 0}}
       transition={{duration: 0.8}}
       viewport={{once: true}}
       className="lg:w-1/2 relative group">
       <div className="relative z-10 overflow-hidden rounded-2xl">
        <Image
         src="/assets/2.png"
         alt="Pricing illustration"
         width={1000}
         height={1000}
         className="w-full h-auto transition-all duration-500 group-hover:scale-105"
        />
       </div>
      </MotionDiv>

      {/* Content Section */}
      <MotionDiv
       initial={{opacity: 0, x: 100}}
       whileInView={{opacity: 1, x: 0}}
       transition={{duration: 0.8}}
       viewport={{once: true}}
       className="lg:w-1/2">
       <div className="flex flex-col gap-10">
        <h1 className="font-raleway font-bold text-4xl md:text-5xl text-gray-800">
         Harga <span className="text-teal-500">Terjangkau</span>
        </h1>

        <div className="space-y-6">
         <MotionDiv
          whileHover={{scale: 1.02, y: -5}}
          transition={{duration: 0.3}}
          className="flex gap-4 items-center p-6 bg-gradient-to-r from-blue-50 to-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100">
          <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
           <FaChartLine className="text-2xl" />
          </div>
          <div>
           <h3 className="text-xl font-semibold text-gray-800 mb-1">
            Paket Starter
           </h3>
           <p className="text-gray-600">
            Mulai dari Rp99.000/bulan untuk bisnis kecil
           </p>
          </div>
         </MotionDiv>

         <MotionDiv
          whileHover={{scale: 1.02, y: -5}}
          transition={{duration: 0.3}}
          className="flex gap-4 items-center p-6 bg-gradient-to-r from-amber-50 to-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100">
          <div className="p-3 bg-amber-100 rounded-lg text-amber-600">
           <FaShieldAlt className="text-2xl" />
          </div>
          <div>
           <h3 className="text-xl font-semibold text-gray-800 mb-1">
            Diskon Tahunan
           </h3>
           <p className="text-gray-600">
            Diskon khusus untuk pembayaran tahunan
           </p>
          </div>
         </MotionDiv>

         <MotionDiv
          whileHover={{scale: 1.02, y: -5}}
          transition={{duration: 0.3}}
          className="flex gap-4 items-center p-6 bg-gradient-to-r from-emerald-50 to-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100">
          <div className="p-3 bg-emerald-100 rounded-lg text-emerald-600">
           <FaMoneyBillWave className="text-2xl" />
          </div>
          <div>
           <h3 className="text-xl font-semibold text-gray-800 mb-1">
            Paket Enterprise
           </h3>
           <p className="text-gray-600">Gratis migrasi data dan onboarding</p>
          </div>
         </MotionDiv>
        </div>

        <MotionButton
         whileHover={{scale: 1.05}}
         whileTap={{scale: 0.95}}
         className="self-start px-6 py-3 bg-gradient-to-r from-teal-500 to-blue-500 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all">
         <Link
          href="/a"
          className="flex items-center gap-2">
          Lihat Detail Harga <FaArrowRightLong />
         </Link>
        </MotionButton>
       </div>
      </MotionDiv>
     </div>
    </div>
   </section>

   {/* CTA Section - Floating Elements */}
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
        Siap <span className="text-amber-300">Mengubah</span> Bisnis Anda?
       </h1>
       <p className="text-lg text-teal-100 max-w-2xl mx-auto mb-8 leading-relaxed">
        Bergabung dengan ribuan bisnis yang telah mempercayakan operasional
        mereka kepada Sellaris. Mulai gratis 14 hari tanpa perlu kartu kredit.
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
         Coba Gratis Sekarang
        </Link>
       </MotionButton>
       <MotionButton
        whileHover={{scale: 1.05}}
        whileTap={{scale: 0.95}}
        className="px-6 py-3 border-2 border-white text-white font-medium rounded-lg hover:bg-white/10 transition-all">
        <Link
         href="/a"
         className="flex items-center justify-center gap-2">
         Demo Produk
        </Link>
       </MotionButton>
      </FadeIn>
     </StaggerContainer>
    </div>
   </section>
  </div>
 );
};

export default Home;
