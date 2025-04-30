"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
} from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-teal-600 to-teal-700 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <Link href="/" className="inline-block">
              <motion.span
                className="text-3xl font-bold italic text-white"
                style={{ fontFamily: "'Raleway', sans-serif" }}
                whileHover={{ scale: 1.05 }}
              >
                SELLARIS
              </motion.span>
            </Link>
            <p className="text-teal-100">
              Solusi bisnis terintegrasi untuk pertumbuhan usaha yang berkelanjutan.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: <FaFacebook className="text-xl" />, url: "#" },
                { icon: <FaTwitter className="text-xl" />, url: "#" },
                { icon: <FaInstagram className="text-xl" />, url: "#" },
                { icon: <FaLinkedin className="text-xl" />, url: "#" },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3 }}
                  className="bg-teal-500/20 hover:bg-teal-500/40 rounded-full w-10 h-10 flex items-center justify-center transition-colors"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-xl font-bold text-white mb-4">Tautan Cepat</h3>
            <ul className="space-y-3">
              {[
                { name: "Tentang Kami", path: "/about" },
                { name: "Fitur", path: "/discover" },
                { name: "Harga", path: "/pricing" },
                { name: "Blog", path: "/blog" },
                { name: "Karir", path: "/careers" },
                { name: "Kontak", path: "/contact" },
              ].map((link, index) => (
                <li key={index}>
                  <motion.div whileHover={{ x: 5 }}>
                    <Link
                      href={link.path}
                      className="flex items-center text-teal-100 hover:text-amber-300 transition-colors"
                    >
                      <FiArrowRight className="mr-2" />
                      {link.name}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-xl font-bold text-white mb-4">Hubungi Kami</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-amber-300 mt-1 mr-3 flex-shrink-0" />
                <span className="text-teal-100">
                  Jl. Teknologi No. 123, Jakarta Selatan, Indonesia 12560
                </span>
              </li>
              <li className="flex items-center">
                <FaPhone className="text-amber-300 mr-3" />
                <span className="text-teal-100">+62 21 1234 5678</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="text-amber-300 mr-3" />
                <span className="text-teal-100">hello@sellaris.id</span>
              </li>
              <li className="flex items-center">
                <FaClock className="text-amber-300 mr-3" />
                <span className="text-teal-100">Senin-Jumat: 09:00 - 17:00</span>
              </li>
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-xl font-bold text-white mb-4">Newsletter</h3>
            <p className="text-teal-100">
              Dapatkan update terbaru tentang produk dan penawaran khusus.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Alamat email Anda"
                className="w-full px-4 py-3 rounded-lg bg-teal-500/20 border border-teal-400/30 focus:outline-none focus:ring-2 focus:ring-amber-300 text-white placeholder-teal-200"
                required
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full bg-gradient-to-r from-amber-300 to-amber-400 text-teal-800 font-medium py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                Berlangganan
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-teal-500/30 my-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-teal-200 text-sm mb-4 md:mb-0"
          >
            &copy; {currentYear} Sellaris. All rights reserved.
          </motion.p>

          <div className="flex space-x-6">
            {[
              { name: "Privacy Policy", path: "/privacy" },
              { name: "Terms of Service", path: "/terms" },
              { name: "Cookie Policy", path: "/cookies" },
            ].map((link, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="text-teal-200 hover:text-amber-300 text-sm transition-colors"
              >
                <Link href={link.path}>{link.name}</Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;