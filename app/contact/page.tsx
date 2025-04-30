import {Metadata} from "next";
import {
 FaMapMarkerAlt,
 FaPhone,
 FaEnvelope,
 FaClock,
 FaFacebook,
 FaTwitter,
 FaInstagram,
 FaLinkedin,
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
 title: "Hubungi Kami - Sellaris Solusi Bisnis",
 description: "Hubungi tim Sellaris untuk pertanyaan, dukungan, atau kemitraan",
};

const ContactMethods = [
 {
  icon: <FaMapMarkerAlt className="text-4xl text-teal-500" />,
  title: "Kantor Kami",
  description:
   "Gedung Bisnis Tower Lt. 12\nJl. Sudirman Kav. 52-53\nJakarta Selatan 12190",
 },
 {
  icon: <FaPhone className="text-4xl text-teal-500" />,
  title: "Telepon",
  description: "+62 21 1234 5678\n+62 812 3456 7890 (WhatsApp)",
 },
 {
  icon: <FaEnvelope className="text-4xl text-teal-500" />,
  title: "Email",
  description: "info@sellaris.com\nsupport@sellaris.com",
 },
 {
  icon: <FaClock className="text-4xl text-teal-500" />,
  title: "Jam Operasional",
  description: "Senin - Jumat: 08.00 - 17.00 WIB\nSabtu: 08.00 - 12.00 WIB",
 },
];

const socialMedia = [
 {
  icon: <FaFacebook className="text-2xl" />,
  url: "https://facebook.com/sellaris",
 },
 {
  icon: <FaTwitter className="text-2xl" />,
  url: "https://twitter.com/sellaris",
 },
 {
  icon: <FaInstagram className="text-2xl" />,
  url: "https://instagram.com/sellaris",
 },
 {
  icon: <FaLinkedin className="text-2xl" />,
  url: "https://linkedin.com/company/sellaris",
 },
];

const ContactPage = () => {
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
        <span className="inline-block">Hubungi</span>
        <br />
        <span className="text-teal-500 bg-clip-text bg-gradient-to-r from-teal-500 to-blue-500">
         Tim Sellaris
        </span>
       </h1>
      </FadeIn>
      <FadeIn>
       <p className="text-lg text-gray-600 leading-relaxed mb-8">
        Kami siap membantu Anda dengan pertanyaan, dukungan teknis, atau
        informasi tentang produk kami. Tim kami akan dengan senang hati menjawab
        semua pertanyaan Anda.
       </p>
      </FadeIn>
     </StaggerContainer>

     <MotionDiv
      initial={{opacity: 0, y: 50}}
      animate={{opacity: 1, y: 0}}
      transition={{duration: 0.8}}
      className="lg:w-1/2 flex justify-center relative group">
      <div className="relative z-10 overflow-hidden rounded-2xl">
       <Image
        src="/contact/hero.png"
        alt="Hubungi Kami"
        width={500}
        height={400}
        className="object-cover w-full h-auto transition-all duration-500 group-hover:scale-105"
       />
      </div>
     </MotionDiv>
    </div>
   </section>

   {/* Contact Methods Section */}
   <section className="py-20 bg-white relative">
    <div className="container mx-auto px-6">
     <StaggerContainer className="flex flex-col items-center text-center mb-16">
      <FadeIn>
       <h1 className="font-raleway font-bold text-4xl md:text-5xl text-gray-800 mb-4">
        Cara <span className="text-teal-500">Menghubungi</span>
       </h1>
       <p className="text-gray-600 max-w-2xl mx-auto">
        Beberapa cara untuk terhubung dengan tim kami
       </p>
      </FadeIn>
     </StaggerContainer>

     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl mx-auto">
      {ContactMethods.map((method, index) => (
       <MotionDiv
        key={index}
        initial={{opacity: 0, y: 50}}
        whileInView={{opacity: 1, y: 0}}
        transition={{duration: 0.5, delay: index * 0.1}}
        viewport={{once: true}}
        whileHover={{y: -10}}
        className="flex flex-col items-center text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all">
        <div className="mb-4">{method.icon}</div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
         {method.title}
        </h3>
        <p className="text-gray-600 whitespace-pre-line">
         {method.description}
        </p>
       </MotionDiv>
      ))}
     </div>
    </div>
   </section>

   {/* Contact Form + Map Section */}
   <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
    <div className="container mx-auto px-6">
     <div className="flex flex-col lg:flex-row items-stretch gap-12">
      {/* Contact Form */}
      <MotionDiv
       initial={{opacity: 0, x: -100}}
       whileInView={{opacity: 1, x: 0}}
       transition={{duration: 0.8}}
       viewport={{once: true}}
       className="lg:w-1/2 bg-white rounded-2xl shadow-lg overflow-hidden">
       <div className="p-8">
        <h2 className="font-raleway font-bold text-3xl text-gray-800 mb-6">
         Kirim <span className="text-teal-500">Pesan</span>
        </h2>
        <form className="space-y-6">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
           <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1">
            Nama Lengkap
           </label>
           <input
            type="text"
            id="name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
            placeholder="Nama Anda"
           />
          </div>
          <div>
           <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1">
            Email
           </label>
           <input
            type="email"
            id="email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
            placeholder="email@contoh.com"
           />
          </div>
         </div>
         <div>
          <label
           htmlFor="subject"
           className="block text-sm font-medium text-gray-700 mb-1">
           Subjek
          </label>
          <input
           type="text"
           id="subject"
           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
           placeholder="Subjek pesan"
          />
         </div>
         <div>
          <label
           htmlFor="message"
           className="block text-sm font-medium text-gray-700 mb-1">
           Pesan
          </label>
          <textarea
           id="message"
           rows={5}
           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
           placeholder="Tulis pesan Anda..."></textarea>
         </div>
         <MotionButton
          whileHover={{scale: 1.05}}
          whileTap={{scale: 0.95}}
          type="submit"
          className="w-full px-6 py-3 bg-gradient-to-r from-teal-500 to-blue-500 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all">
          Kirim Pesan <FaArrowRightLong className="ml-2" />
         </MotionButton>
        </form>
       </div>
      </MotionDiv>

      {/* Map Section */}
      <MotionDiv
       initial={{opacity: 0, x: 100}}
       whileInView={{opacity: 1, x: 0}}
       transition={{duration: 0.8}}
       viewport={{once: true}}
       className="lg:w-1/2 bg-white rounded-2xl shadow-lg overflow-hidden">
       <div className="h-full">
        <div className="h-64 md:h-full bg-gray-200 relative">
         {/* Google Maps Embed */}
         <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.82256141529419!3d-6.208741662717247!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e945e34b9d%3A0x5371bf0fdad786a2!2sSudirman%20Central%20Business%20District!5e0!3m2!1sen!2sid!4v1620000000000!5m2!1sen!2sid"
          width="100%"
          height="100%"
          style={{border: 0}}
          allowFullScreen
          loading="lazy"
          className="absolute inset-0"></iframe>
        </div>
        <div className="p-6">
         <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Kunjungi Kantor Kami
         </h3>
         <p className="text-gray-600 mb-4">
          Gedung Bisnis Tower Lt. 12, Jl. Sudirman Kav. 52-53, Jakarta Selatan
         </p>
         <MotionButton
          whileHover={{scale: 1.05}}
          whileTap={{scale: 0.95}}
          className="px-6 py-2 border-2 border-teal-500 text-teal-500 font-medium rounded-lg hover:bg-teal-50 transition-all">
          <Link
           href="https://maps.google.com?q=Gedung+Bisnis+Tower+Jakarta"
           target="_blank"
           rel="noopener noreferrer"
           className="flex items-center justify-center gap-2">
           Petunjuk Arah <FaArrowRightLong />
          </Link>
         </MotionButton>
        </div>
       </div>
      </MotionDiv>
     </div>
    </div>
   </section>

   {/* Social Media Section */}
   <section className="py-20 bg-white relative">
    <div className="container mx-auto px-6">
     <StaggerContainer className="flex flex-col items-center text-center mb-16">
      <FadeIn>
       <h1 className="font-raleway font-bold text-4xl md:text-5xl text-gray-800 mb-4">
        Ikuti Kami di <span className="text-teal-500">Media Sosial</span>
       </h1>
       <p className="text-gray-600 max-w-2xl mx-auto">
        Tetap terhubung dengan update terbaru dan konten eksklusif
       </p>
      </FadeIn>
     </StaggerContainer>

     <div className="flex justify-center gap-6">
      {socialMedia.map((social, index) => (
       <MotionDiv
        key={index}
        whileHover={{y: -5, scale: 1.1}}
        whileTap={{scale: 0.9}}
        transition={{duration: 0.2}}>
        <Link
         href={social.url}
         target="_blank"
         rel="noopener noreferrer"
         className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full text-teal-600 hover:bg-teal-500 hover:text-white transition-all">
         {social.icon}
        </Link>
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
        Butuh <span className="text-amber-300">Bantuan</span> Cepat?
       </h1>
       <p className="text-lg text-teal-100 max-w-2xl mx-auto mb-8 leading-relaxed">
        Tim dukungan kami siap membantu Anda 24/7 melalui live chat atau
        telepon.
       </p>
      </FadeIn>

      <FadeIn className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
       <MotionButton
        whileHover={{scale: 1.05}}
        whileTap={{scale: 0.95}}
        className="px-6 py-3 bg-white text-teal-600 font-medium rounded-lg shadow-lg hover:shadow-xl transition-all">
        <Link
         href="/support"
         className="flex items-center justify-center gap-2">
         Hubungi Dukungan
        </Link>
       </MotionButton>
       <MotionButton
        whileHover={{scale: 1.05}}
        whileTap={{scale: 0.95}}
        className="px-6 py-3 border-2 border-white text-white font-medium rounded-lg hover:bg-white/10 transition-all">
        <Link
         href="/faq"
         className="flex items-center justify-center gap-2">
         Lihat FAQ
        </Link>
       </MotionButton>
      </FadeIn>
     </StaggerContainer>
    </div>
   </section>
  </div>
 );
};

export default ContactPage;
