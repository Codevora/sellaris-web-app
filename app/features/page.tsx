import {Metadata} from "next";
import {
 FaShieldAlt,
 FaMoneyBillWave,
 FaUsers,
 FaStore,
 FaQrcode,
 FaLightbulb,
 FaMobileAlt,
 FaCloud,
 FaCogs,
 FaChartBar,
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
 title: "Discover Sellaris - Temukan Fitur Unggulan Kami",
 description:
  "Jelajahi semua fitur dan solusi bisnis yang ditawarkan oleh Sellaris",
};

const FeatureCategories = [
 {
  title: "Operasional Toko",
  icon: <FaStore className="text-4xl text-teal-500" />,
  features: [
   "Manajemen Kasir",
   "Pengelolaan Inventori",
   "Multi-outlet",
   "Loyalty Program",
  ],
 },
 {
  title: "Analisis Bisnis",
  icon: <FaChartBar className="text-4xl text-teal-500" />,
  features: [
   "Dashboard Real-time",
   "Laporan Penjualan",
   "Analisis Pelanggan",
   "Prediksi Stok",
  ],
 },
 {
  title: "Integrasi",
  icon: <FaCogs className="text-4xl text-teal-500" />,
  features: ["Pembayaran Digital", "E-commerce", "Marketplace", "API Terbuka"],
 },
];

const FeatureHighlights = [
 {
  title: "Kasir Pintar",
  description:
   "Transaksi cepat dengan antarmuka intuitif dan dukungan berbagai metode pembayaran",
  icon: <FaMoneyBillWave className="text-5xl text-teal-500" />,
  image: "/assets/3.png",
 },
 {
  title: "Manajemen Stok",
  description: "Pantau stok secara real-time dengan sistem notifikasi otomatis",
  icon: <FaQrcode className="text-5xl text-teal-500" />,
  image: "/assets/4.png",
 },
 {
  title: "Analisis Pelanggan",
  description: "Pahami perilaku pelanggan dengan data pembelian lengkap",
  icon: <FaUsers className="text-5xl text-teal-500" />,
  image: "/assets/5.png",
 },
];

const Features = () => {
 return (
  <div className="flex flex-col w-full overflow-x-hidden bg-gray-50">
   {/* Hero Section */}
   <section className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-white overflow-hidden">
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
     <StaggerContainer>
      <FadeIn>
       <h1 className="font-raleway font-bold text-4xl md:text-5xl lg:text-6xl text-gray-800 leading-tight mb-6">
        <span className="text-teal-500 bg-clip-text bg-gradient-to-r from-teal-500 to-blue-500">
         Discover
        </span>{" "}
        Sellaris
       </h1>
      </FadeIn>
      <FadeIn>
       <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto mb-8">
        Jelajahi semua fitur dan solusi yang kami tawarkan untuk membantu bisnis
        Anda tumbuh lebih cepat dan efisien.
       </p>
      </FadeIn>
      <FadeIn>
       <MotionButton
        whileHover={{scale: 1.05}}
        whileTap={{scale: 0.95}}
        className="px-6 py-3 bg-gradient-to-r from-teal-500 to-blue-500 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all">
        <Link
         href="/a"
         className="flex items-center justify-center gap-2">
         Mulai Eksplorasi <FaArrowRightLong />
        </Link>
       </MotionButton>
      </FadeIn>
     </StaggerContainer>
    </div>
   </section>

   {/* Feature Categories */}
   <section className="py-20 bg-white">
    <div className="container mx-auto px-6">
     <StaggerContainer className="text-center mb-16">
      <FadeIn>
       <h2 className="font-raleway font-bold text-3xl md:text-4xl text-gray-800 mb-4">
        Kategori <span className="text-teal-500">Fitur</span>
       </h2>
       <div className="w-20 h-1 bg-teal-500 mx-auto mb-6"></div>
       <p className="text-gray-600 max-w-2xl mx-auto">
        Temukan solusi yang tepat untuk setiap kebutuhan bisnis Anda
       </p>
      </FadeIn>
     </StaggerContainer>

     <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {FeatureCategories.map((category, index) => (
       <MotionDiv
        key={index}
        initial={{opacity: 0, y: 50}}
        whileInView={{opacity: 1, y: 0}}
        transition={{duration: 0.5, delay: index * 0.1}}
        viewport={{once: true}}
        whileHover={{y: -10}}
        className="bg-white rounded-xl shadow-lg hover:shadow-xl overflow-hidden transition-all">
        <div className="p-8 text-center">
         <div className="flex justify-center mb-4">{category.icon}</div>
         <h3 className="text-xl font-semibold text-gray-800 mb-4">
          {category.title}
         </h3>
         <ul className="space-y-2 text-gray-600">
          {category.features.map((feature, i) => (
           <li
            key={i}
            className="flex items-center">
            <span className="w-2 h-2 bg-teal-500 rounded-full mr-2"></span>
            {feature}
           </li>
          ))}
         </ul>
        </div>
        <div className="px-6 py-4 bg-gray-50 text-center">
         <MotionButton
          whileHover={{x: 5}}
          className="text-teal-600 font-medium">
          <Link
           href="/a"
           className="flex items-center justify-center gap-1">
           Lihat Detail <FaArrowRightLong className="text-sm" />
          </Link>
         </MotionButton>
        </div>
       </MotionDiv>
      ))}
     </div>
    </div>
   </section>

   {/* Feature Highlights */}
   <section className="py-20 bg-gray-50">
    <div className="container mx-auto px-6">
     <StaggerContainer className="text-center mb-16">
      <FadeIn>
       <h2 className="font-raleway font-bold text-3xl md:text-4xl text-gray-800 mb-4">
        Fitur <span className="text-teal-500">Unggulan</span>
       </h2>
       <div className="w-20 h-1 bg-teal-500 mx-auto mb-6"></div>
       <p className="text-gray-600 max-w-2xl mx-auto">
        Solusi canggih untuk tantangan bisnis Anda
       </p>
      </FadeIn>
     </StaggerContainer>

     {FeatureHighlights.map((feature, index) => (
      <div
       key={index}
       className={`flex flex-col ${
        index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
       } items-center gap-12 mb-20`}>
       <MotionDiv
        initial={{opacity: 0, x: index % 2 === 0 ? -100 : 100}}
        whileInView={{opacity: 1, x: 0}}
        transition={{duration: 0.8}}
        viewport={{once: true}}
        className="lg:w-1/2 relative group">
        <div className="relative z-10 overflow-hidden">
         <Image
          src={feature.image}
          alt={feature.title}
          width={600}
          height={400}
          className="w-full h-auto object-cover transition-all duration-500 group-hover:scale-105"
         />
        </div>
       </MotionDiv>

       <MotionDiv
        initial={{opacity: 0, x: index % 2 === 0 ? 100 : -100}}
        whileInView={{opacity: 1, x: 0}}
        transition={{duration: 0.8}}
        viewport={{once: true}}
        className="lg:w-1/2">
        <div className="flex flex-col gap-6">
         <div className="flex items-center gap-4">
          <div className="p-3 bg-teal-100 rounded-lg">{feature.icon}</div>
          <h3 className="text-2xl font-bold text-gray-800">{feature.title}</h3>
         </div>
         <p className="text-gray-600 leading-relaxed">{feature.description}</p>
         <div className="grid grid-cols-2 gap-4 mt-4">
          {[
           "Mobile Friendly",
           "Cloud Based",
           "Real-time Sync",
           "24/7 Support",
          ].map((item, i) => (
           <div
            key={i}
            className="flex items-center gap-2">
            <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
            <span className="text-gray-700">{item}</span>
           </div>
          ))}
         </div>
         <MotionButton
          whileHover={{scale: 1.05}}
          whileTap={{scale: 0.95}}
          className="self-start mt-4 px-6 py-3 bg-gradient-to-r from-teal-500 to-blue-500 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all">
          <Link
           href="/a"
           className="flex items-center gap-2">
           Pelajari Lebih Lanjut <FaArrowRightLong />
          </Link>
         </MotionButton>
        </div>
       </MotionDiv>
      </div>
     ))}
    </div>
   </section>

   {/* Benefits Section */}
   <section className="py-20 bg-gradient-to-br from-teal-600 to-teal-700 text-white">
    <div className="container mx-auto px-6">
     <StaggerContainer className="text-center mb-16">
      <FadeIn>
       <h2 className="font-raleway font-bold text-3xl md:text-4xl mb-4">
        Mengapa Memilih <span className="text-amber-300">Sellaris?</span>
       </h2>
       <div className="w-20 h-1 bg-amber-300 mx-auto mb-6"></div>
       <p className="text-teal-100 max-w-2xl mx-auto">
        Keunggulan yang membuat kami berbeda
       </p>
      </FadeIn>
     </StaggerContainer>

     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {[
       {
        icon: <FaMobileAlt className="text-4xl mb-4" />,
        title: "Akses Mobile",
        desc: "Kelola bisnis dari mana saja dengan aplikasi mobile kami",
       },
       {
        icon: <FaCloud className="text-4xl mb-4" />,
        title: "Cloud Based",
        desc: "Data tersimpan aman di cloud dan bisa diakses kapan saja",
       },
       {
        icon: <FaLightbulb className="text-4xl mb-4" />,
        title: "Ramah Pengguna",
        desc: "Antarmuka intuitif yang mudah dipahami semua orang",
       },
       {
        icon: <FaShieldAlt className="text-4xl mb-4" />,
        title: "Keamanan Data",
        desc: "Enkripsi tingkat tinggi untuk melindungi data bisnis Anda",
       },
      ].map((item, index) => (
       <MotionDiv
        key={index}
        initial={{opacity: 0, y: 50}}
        whileInView={{opacity: 1, y: 0}}
        transition={{duration: 0.5, delay: index * 0.1}}
        viewport={{once: true}}
        className="bg-white/10 backdrop-blur-sm p-8 rounded-xl hover:bg-white/20 transition-all">
        <div className="text-center">
         <div className="flex justify-center">{item.icon}</div>
         <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
         <p className="text-teal-100">{item.desc}</p>
        </div>
       </MotionDiv>
      ))}
     </div>
    </div>
   </section>

   {/* CTA Section */}
   <section className="py-20 bg-white">
    <div className="container mx-auto px-6">
     <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-3xl p-12 text-center">
      <StaggerContainer>
       <FadeIn>
        <h2 className="font-raleway font-bold text-3xl md:text-4xl text-gray-800 mb-6">
         Siap <span className="text-teal-500">Mencoba</span> Sellaris?
        </h2>
       </FadeIn>
       <FadeIn>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
         Mulai perjalanan bisnis digital Anda hari ini dengan platform terbaik
         di kelasnya.
        </p>
       </FadeIn>
       <FadeIn className="flex flex-col sm:flex-row gap-4 justify-center">
        <MotionButton
         whileHover={{scale: 1.05}}
         whileTap={{scale: 0.95}}
         className="px-6 py-3 bg-gradient-to-r from-teal-500 to-blue-500 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all">
         <Link
          href="/a"
          className="flex items-center justify-center gap-2">
          Mulai Gratis 14 Hari
         </Link>
        </MotionButton>
        <MotionButton
         whileHover={{scale: 1.05}}
         whileTap={{scale: 0.95}}
         className="px-6 py-3 border-2 border-gray-300 bg-white text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all">
         <Link
          href="/a"
          className="flex items-center justify-center gap-2">
          Hubungi Sales
         </Link>
        </MotionButton>
       </FadeIn>
      </StaggerContainer>
     </div>
    </div>
   </section>
  </div>
 );
};

export default Features;
