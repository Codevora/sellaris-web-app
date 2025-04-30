import {Metadata} from "next";
import {
 FaChartLine,
 FaShieldAlt,
 FaUsers,
 FaLaptopCode,
 FaHandshake,
 FaRocket,
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
 title: "Karir di Sellaris - Bergabung dengan Tim Kami",
 description: "Peluang karir dan kesempatan bergabung dengan tim Sellaris",
};

const Positions = [
 {
  icon: <FaLaptopCode className="text-4xl text-teal-500" />,
  title: "Frontend Developer",
  type: "Full-time",
  location: "Jakarta/Remote",
 },
 {
  icon: <FaLaptopCode className="text-4xl text-teal-500" />,
  title: "Backend Engineer",
  type: "Full-time",
  location: "Jakarta/Remote",
 },
 {
  icon: <FaChartLine className="text-4xl text-teal-500" />,
  title: "Product Manager",
  type: "Full-time",
  location: "Jakarta",
 },
];

const Benefits = [
 {
  icon: <FaRocket className="text-3xl text-teal-500" />,
  title: "Kesempatan Berkembang",
  description: "Program pelatihan dan pengembangan karir",
 },
 {
  icon: <FaHandshake className="text-3xl text-teal-500" />,
  title: "Fleksibilitas",
  description: "Pilihan kerja remote atau hybrid",
 },
 {
  icon: <FaShieldAlt className="text-3xl text-teal-500" />,
  title: "Kesejahteraan",
  description: "Asuransi kesehatan dan tunjangan lengkap",
 },
];

const CareerPage = () => {
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

    <div className="container mx-auto flex flex-col lg:flex-row items-center gap-12 z-10 px-6">
     <StaggerContainer className="flex flex-col justify-center lg:w-1/2">
      <FadeIn>
       <h1 className="font-raleway font-bold text-4xl md:text-5xl lg:text-6xl text-gray-800 leading-tight mb-6">
        <span className="inline-block">Bergabung dengan</span>
        <br />
        <span className="text-teal-500 bg-clip-text bg-gradient-to-r from-teal-500 to-blue-500">
         Tim Sellaris
        </span>
       </h1>
      </FadeIn>
      <FadeIn>
       <p className="text-lg text-gray-600 leading-relaxed mb-8">
        Kami mencari talenta-talenta berbakat yang bersemangat untuk menciptakan
        solusi bisnis yang revolusioner. Jika Anda ingin menjadi bagian dari
        perjalanan kami mengubah dunia bisnis, mari berbicara!
       </p>
      </FadeIn>
      <FadeIn className="mt-4">
       <MotionButton
        whileHover={{scale: 1.05}}
        whileTap={{scale: 0.95}}
        className="px-6 py-3 bg-gradient-to-r from-teal-500 to-blue-500 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all">
        <Link
         href="#open-positions"
         className="flex items-center justify-center gap-2">
         Lihat Posisi Terbuka <FaArrowRightLong />
        </Link>
       </MotionButton>
      </FadeIn>
     </StaggerContainer>

     <MotionDiv
      initial={{opacity: 0, y: 50}}
      animate={{opacity: 1, y: 0}}
      transition={{duration: 0.8}}
      className="lg:w-1/2 flex justify-center relative group">
      <div className="relative z-10 overflow-hidden rounded-2xl">
       <Image
        src="/career/team.png"
        alt="Tim Sellaris"
        width={500}
        height={400}
        className="object-cover w-full h-auto transition-all duration-500 group-hover:scale-105"
       />
      </div>
     </MotionDiv>
    </div>
   </section>

   {/* Culture Section */}
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
        src="/career/culture.png"
        alt="Budaya Sellaris"
        width={600}
        height={500}
        className="hover:rotate-1 transition-transform duration-300"
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
         Budaya <span className="text-teal-500">Kami</span>
        </h1>

        <div className="space-y-6">
         <MotionDiv
          whileHover={{y: -5}}
          className="flex gap-4 items-start p-6 bg-gradient-to-r from-blue-50 to-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100">
          <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
           <FaUsers className="text-2xl" />
          </div>
          <div>
           <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Kolaboratif
           </h3>
           <p className="text-gray-600">
            Kami percaya pada kerja tim dan saling mendukung untuk mencapai
            tujuan bersama
           </p>
          </div>
         </MotionDiv>

         <MotionDiv
          whileHover={{y: -5}}
          className="flex gap-4 items-start p-6 bg-gradient-to-r from-amber-50 to-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100">
          <div className="p-3 bg-amber-100 rounded-lg text-amber-600">
           <FaRocket className="text-2xl" />
          </div>
          <div>
           <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Inovatif
           </h3>
           <p className="text-gray-600">
            Kami mendorong ide-ide baru dan pendekatan kreatif untuk memecahkan
            masalah
           </p>
          </div>
         </MotionDiv>

         <MotionDiv
          whileHover={{y: -5}}
          className="flex gap-4 items-start p-6 bg-gradient-to-r from-emerald-50 to-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100">
          <div className="p-3 bg-emerald-100 rounded-lg text-emerald-600">
           <FaChartLine className="text-2xl" />
          </div>
          <div>
           <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Bertumbuh
           </h3>
           <p className="text-gray-600">
            Kami berkomitmen untuk pengembangan pribadi dan profesional setiap
            anggota tim
           </p>
          </div>
         </MotionDiv>
        </div>
       </MotionDiv>
      </div>
     </div>
    </div>
   </section>

   {/* Benefits Section */}
   <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
    <div className="container mx-auto px-6">
     <StaggerContainer className="flex flex-col items-center text-center mb-16">
      <FadeIn>
       <h1 className="font-raleway font-bold text-4xl md:text-5xl text-gray-800 mb-4">
        Manfaat <span className="text-teal-500">Bergabung</span>
       </h1>
       <p className="text-gray-600 max-w-2xl mx-auto">
        Kami menawarkan lebih dari sekadar gaji - kami menawarkan pengalaman dan
        pertumbuhan
       </p>
      </FadeIn>
     </StaggerContainer>

     <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl mx-auto">
      {Benefits.map((item, index) => (
       <MotionDiv
        key={index}
        initial={{opacity: 0, y: 50}}
        whileInView={{opacity: 1, y: 0}}
        transition={{duration: 0.5, delay: index * 0.1}}
        viewport={{once: true}}
        whileHover={{y: -10}}
        className="flex flex-col items-center text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all">
        <div className="mb-4">{item.icon}</div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
         {item.title}
        </h3>
        <p className="text-gray-600">{item.description}</p>
       </MotionDiv>
      ))}
     </div>
    </div>
   </section>

   {/* Open Positions Section */}
   <section
    id="open-positions"
    className="py-20 bg-white relative overflow-hidden">
    <div className="container mx-auto px-6">
     <StaggerContainer className="flex flex-col items-center text-center mb-16">
      <FadeIn>
       <h1 className="font-raleway font-bold text-4xl md:text-5xl text-gray-800 mb-4">
        Posisi <span className="text-teal-500">Terbuka</span>
       </h1>
       <p className="text-gray-600 max-w-2xl mx-auto">
        Temukan peran yang sesuai dengan keahlian dan minat Anda
       </p>
      </FadeIn>
     </StaggerContainer>

     <div className="grid grid-cols-1 gap-6 w-full max-w-4xl mx-auto">
      {Positions.map((position, index) => (
       <MotionDiv
        key={index}
        initial={{opacity: 0, y: 50}}
        whileInView={{opacity: 1, y: 0}}
        transition={{duration: 0.5, delay: index * 0.1}}
        viewport={{once: true}}
        whileHover={{scale: 1.02}}
        className="flex flex-col md:flex-row gap-6 items-center p-6 bg-gradient-to-r from-gray-50 to-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100">
        <div>{position.icon}</div>
        <div className="flex-1 text-center md:text-left">
         <h3 className="text-xl font-semibold text-gray-800">
          {position.title}
         </h3>
         <div className="flex flex-col md:flex-row md:gap-4 justify-center md:justify-start mt-2">
          <span className="text-gray-600">{position.type}</span>
          <span className="text-gray-600">{position.location}</span>
         </div>
        </div>
        <MotionButton
         whileHover={{scale: 1.05}}
         whileTap={{scale: 0.95}}
         className="px-6 py-2 bg-gradient-to-r from-teal-500 to-blue-500 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all">
         <Link
          href={`/career/apply?position=${encodeURIComponent(position.title)}`}
          className="flex items-center justify-center gap-2">
          Lamar <FaArrowRightLong />
         </Link>
        </MotionButton>
       </MotionDiv>
      ))}
     </div>

     <div className="text-center mt-12">
      <p className="text-gray-600 mb-4">
       Tidak melihat posisi yang sesuai? Kami selalu mencari talenta berbakat!
      </p>
      <MotionButton
       whileHover={{scale: 1.05}}
       whileTap={{scale: 0.95}}
       className="px-6 py-3 border-2 border-teal-500 text-teal-500 font-medium rounded-lg hover:bg-teal-50 transition-all">
       <Link
        href="/career/contact"
        className="flex items-center justify-center gap-2">
        Hubungi Kami
       </Link>
      </MotionButton>
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
        Siap Memulai <span className="text-amber-300">Perjalanan</span> Bersama
        Kami?
       </h1>
       <p className="text-lg text-teal-100 max-w-2xl mx-auto mb-8 leading-relaxed">
        Kirimkan CV dan portofolio Anda sekarang dan mari kita bicara tentang
        bagaimana Anda dapat berkontribusi untuk tim kami.
       </p>
      </FadeIn>

      <FadeIn className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
       <MotionButton
        whileHover={{scale: 1.05}}
        whileTap={{scale: 0.95}}
        className="px-6 py-3 bg-white text-teal-600 font-medium rounded-lg shadow-lg hover:shadow-xl transition-all">
        <Link
         href="/career/apply"
         className="flex items-center justify-center gap-2">
         Lamar Sekarang
        </Link>
       </MotionButton>
       <MotionButton
        whileHover={{scale: 1.05}}
        whileTap={{scale: 0.95}}
        className="px-6 py-3 border-2 border-white text-white font-medium rounded-lg hover:bg-white/10 transition-all">
        <Link
         href="/career/faq"
         className="flex items-center justify-center gap-2">
         FAQ Karir
        </Link>
       </MotionButton>
      </FadeIn>
     </StaggerContainer>
    </div>
   </section>
  </div>
 );
};

export default CareerPage;
