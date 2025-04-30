import {Metadata} from "next";
import {
 FaShieldAlt,
 FaCheck,
 FaStore,
 FaQrcode,
 FaFileInvoiceDollar,
} from "react-icons/fa";
import {
 FadeIn,
 StaggerContainer,
 MotionDiv,
 MotionButton,
} from "@/components/AnimatedComponent";
import PricingWrapper from "@/components/layouts/PricingWrapper";

export const metadata: Metadata = {
 title: "Sellaris - Harga & Paket",
 description: "Pilih paket yang sesuai untuk kebutuhan bisnis Anda",
};

const PricingPage = () => {
 const pricingPlans = [
  {
   name: "Starter",
   price: "Rp99.000",
   period: "/bulan",
   description: "Untuk bisnis kecil yang baru memulai",
   features: [
    "1 Outlet",
    "5 Device",
    "Transaksi Unlimited",
    "Laporan Harian",
    "Support Email",
   ],
   popular: false,
   color: "from-blue-100 to-white",
   buttonColor: "from-blue-500 to-blue-600",
  },
  {
   name: "Business",
   price: "Rp299.000",
   period: "/bulan",
   description: "Untuk bisnis yang sedang berkembang",
   features: [
    "3 Outlet",
    "15 Device",
    "Multi-user Access",
    "Laporan Lengkap",
    "Inventory Management",
    "Priority Support",
   ],
   popular: true,
   color: "from-teal-100 to-white",
   buttonColor: "from-teal-500 to-blue-500",
  },
  {
   name: "Enterprise",
   price: "Rp899.000",
   period: "/bulan",
   description: "Solusi lengkap untuk bisnis besar",
   features: [
    "Outlet Unlimited",
    "Device Unlimited",
    "Tim Dedicated",
    "Laporan Advanced",
    "API Access",
    "Onsite Training",
    "24/7 Support",
   ],
   popular: false,
   color: "from-purple-100 to-white",
   buttonColor: "from-purple-500 to-indigo-500",
  },
 ];

 const features = [
  {
   icon: <FaStore className="text-2xl text-teal-500" />,
   title: "Multi-Outlet",
   description: "Kelola banyak outlet dalam satu dashboard",
  },
  {
   icon: <FaQrcode className="text-2xl text-teal-500" />,
   title: "Payment Gateway",
   description: "Integrasi dengan berbagai metode pembayaran",
  },
  {
   icon: <FaFileInvoiceDollar className="text-2xl text-teal-500" />,
   title: "Laporan Real-time",
   description: "Pantau performa bisnis kapan saja",
  },
  {
   icon: <FaShieldAlt className="text-2xl text-teal-500" />,
   title: "Keamanan Data",
   description: "Enkripsi tingkat tinggi untuk data bisnis Anda",
  },
 ];

 return (
  <div className="flex flex-col w-full overflow-x-hidden bg-gray-50">
   {/* Hero Pricing Section */}
   <section className="relative py-28 bg-gradient-to-br from-blue-50 to-white overflow-hidden">
    {/* Animated background elements */}
    <div className="absolute inset-0 overflow-hidden">
     {/* Floating bubbles */}
     <MotionDiv
      animate={{
       x: [0, 40, 0],
       y: [0, 30, 0],
       transition: {duration: 18, repeat: Infinity, ease: "linear"},
      }}
      className="absolute top-1/4 left-1/4 w-40 h-40 rounded-full bg-blue-100/50 blur-xl"
     />
     <MotionDiv
      animate={{
       x: [0, -50, 0],
       y: [0, -40, 0],
       transition: {duration: 22, repeat: Infinity, ease: "linear"},
      }}
      className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full bg-teal-100/50 blur-xl"
     />
     {/* Subtle grid pattern */}
     <div className="absolute inset-0 opacity-10 [background-image:linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] [background-size:24px_24px]"></div>
    </div>

    <div className="container mx-auto px-6 relative z-10">
     <StaggerContainer className="flex flex-col lg:flex-row items-center gap-12">
      {/* Text content */}
      <div className="lg:w-1/2">
       <FadeIn>
        <h1 className="font-raleway font-bold text-4xl md:text-5xl lg:text-6xl text-gray-800 leading-tight mb-6">
         <span className="inline-block">Harga Terbaik untuk</span>
         <br />
         <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-500">
          Pertumbuhan Bisnis Anda
         </span>
        </h1>
       </FadeIn>
       <FadeIn>
        <p className="text-lg text-gray-600 leading-relaxed mb-8">
         Dapatkan lebih banyak dengan investasi yang lebih sedikit. Paket kami
         dirancang untuk bisnis dari semua ukuran, dengan fitur canggih dan
         skalabilitas tanpa batas.
        </p>
       </FadeIn>

       <FadeIn className="flex flex-col sm:flex-row gap-4 items-center">
        <MotionButton
         whileHover={{scale: 1.05}}
         whileTap={{scale: 0.95}}
         className="px-6 py-3 bg-gradient-to-r from-teal-500 to-blue-500 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all">
         Mulai Uji Coba Gratis
        </MotionButton>

        <div className="flex items-center">
         <div className="flex -space-x-2 mr-4">
          {[1, 2, 3].map((item) => (
           <MotionDiv
            key={item}
            whileHover={{y: -5}}
            className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden"></MotionDiv>
          ))}
         </div>
         <span className="text-sm text-gray-600">
          Bergabung dengan <span className="font-semibold">5,000+</span> bisnis
         </span>
        </div>
       </FadeIn>
      </div>
     </StaggerContainer>
    </div>
   </section>

   {/* Pricing Plans Section */}
   <section className="py-16 bg-white">
    <PricingWrapper />
   </section>

   {/* Feature Comparison Section */}
   <section className="py-16 bg-gray-50">
    <div className="container mx-auto px-6">
     <StaggerContainer className="flex flex-col items-center">
      <FadeIn className="text-center mb-16">
       <h2 className="font-raleway font-bold text-3xl md:text-4xl text-gray-800 mb-4">
        Fitur <span className="text-teal-500">Lengkap</span> di Semua Paket
       </h2>
       <p className="text-gray-600 max-w-2xl mx-auto">
        Semua paket termasuk fitur-fitur utama untuk mengelola bisnis Anda
        dengan mudah
       </p>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl">
       {features.map((feature, index) => (
        <MotionDiv
         key={index}
         initial={{opacity: 0, y: 50}}
         whileInView={{opacity: 1, y: 0}}
         transition={{duration: 0.5, delay: index * 0.1}}
         viewport={{once: true}}
         whileHover={{y: -5}}
         className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100">
         <div className="mb-4">{feature.icon}</div>
         <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {feature.title}
         </h3>
         <p className="text-gray-600">{feature.description}</p>
        </MotionDiv>
       ))}
      </div>
     </StaggerContainer>
    </div>
   </section>

   {/* FAQ Section */}
   <section className="py-16 bg-white">
    <div className="container mx-auto px-6 max-w-4xl">
     <StaggerContainer className="flex flex-col">
      <FadeIn className="text-center mb-12">
       <h2 className="font-raleway font-bold text-3xl md:text-4xl text-gray-800 mb-4">
        Pertanyaan <span className="text-teal-500">Umum</span>
       </h2>
       <p className="text-gray-600">
        Temukan jawaban untuk pertanyaan yang sering diajukan
       </p>
      </FadeIn>

      <div className="space-y-6">
       <FadeIn>
        <MotionDiv
         whileHover={{x: 5}}
         className="border-b border-gray-200 pb-6">
         <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Apakah ada biaya tambahan selain harga paket?
         </h3>
         <p className="text-gray-600">
          Tidak ada biaya tersembunyi. Harga yang tertera sudah termasuk semua
          fitur yang disebutkan. Kecuali jika Anda membutuhkan layanan tambahan
          seperti integrasi khusus atau pelatihan khusus.
         </p>
        </MotionDiv>
       </FadeIn>

       <FadeIn>
        <MotionDiv
         whileHover={{x: 5}}
         className="border-b border-gray-200 pb-6">
         <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Bisakah saya upgrade paket nanti?
         </h3>
         <p className="text-gray-600">
          Tentu! Anda bisa upgrade paket kapan saja. Selisih harga akan dihitung
          secara prorata berdasarkan sisa waktu berlangganan Anda.
         </p>
        </MotionDiv>
       </FadeIn>

       <FadeIn>
        <MotionDiv
         whileHover={{x: 5}}
         className="border-b border-gray-200 pb-6">
         <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Apakah ada uji coba gratis?
         </h3>
         <p className="text-gray-600">
          Ya, kami menawarkan uji coba gratis selama 14 hari untuk semua paket.
          Tidak perlu kartu kredit untuk memulai.
         </p>
        </MotionDiv>
       </FadeIn>

       <FadeIn>
        <MotionDiv
         whileHover={{x: 5}}
         className="border-b border-gray-200 pb-6">
         <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Bagaimana proses migrasi data?
         </h3>
         <p className="text-gray-600">
          Untuk paket Enterprise, kami menyediakan tim khusus untuk membantu
          migrasi data. Untuk paket lain, kami menyediakan panduan dan tools
          untuk mempermudah proses migrasi.
         </p>
        </MotionDiv>
       </FadeIn>
      </div>
     </StaggerContainer>
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
        Siap <span className="text-amber-300">Memulai</span>?
       </h1>
       <p className="text-lg text-teal-100 max-w-2xl mx-auto mb-8 leading-relaxed">
        Bergabung dengan ribuan bisnis yang telah mempercayakan operasional
        mereka kepada Sellaris.
       </p>
      </FadeIn>

      <FadeIn className="flex flex-col sm:flex-row gap-4">
       <MotionButton
        whileHover={{scale: 1.05}}
        whileTap={{scale: 0.95}}
        className="px-8 py-4 bg-white text-teal-600 font-medium rounded-lg shadow-lg hover:shadow-xl transition-all">
        Coba Gratis 14 Hari
       </MotionButton>
       <MotionButton
        whileHover={{scale: 1.05}}
        whileTap={{scale: 0.95}}
        className="px-8 py-4 border-2 border-white text-white font-medium rounded-lg hover:bg-white/10 transition-all">
        Hubungi Tim Penjualan
       </MotionButton>
      </FadeIn>
     </StaggerContainer>
    </div>
   </section>
  </div>
 );
};

export default PricingPage;
