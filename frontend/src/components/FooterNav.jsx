import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const FooterNav = () => {
  return (
    <footer className="w-full bg-gradient-to-t from-zinc-900 to-zinc-800 py-8 text-gray-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-6 gap-6">
        {/* Left Section */}
        <div className="text-center md:text-left">
          <h3 className="text-xl font-extrabold text-white tracking-tight">PopcornPulse</h3>
          <p className="text-sm mt-1">Your ultimate movie guide.</p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center gap-6">
          <Link
            to="/"
            className="text-gray-300 text-sm font-medium hover:text-blue-400 transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            to="/popular"
            className="text-gray-300 text-sm font-medium hover:text-blue-400 transition-colors duration-200"
          >
            Popular
          </Link>
          <Link
            to="/toprated"
            className="text-gray-300 text-sm font-medium hover:text-blue-400 transition-colors duration-200"
          >
            Top Rated
          </Link>
          <Link
            to="/upcoming"
            className="text-gray-300 text-sm font-medium hover:text-blue-400 transition-colors duration-200"
          >
            Upcoming
          </Link>
        </div>

        {/* Right Section - Social Media & Copyright */}
        <div className="flex flex-col items-center md:items-end gap-4">
          <div className="flex gap-4">
            <motion.a
              href="https://twitter.com"
              whileHover={{ scale: 1.2 }}
              className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
              aria-label="Twitter"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </motion.a>
            <motion.a
              href="https://facebook.com"
              whileHover={{ scale: 1.2 }}
              className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
              aria-label="Facebook"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
              </svg>
            </motion.a>
            <motion.a
              href="https://instagram.com"
              whileHover={{ scale: 1.2 }}
              className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
              aria-label="Instagram"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.148 3.227-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.148-4.771-1.691-4.919-4.919-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.332.014 7.052.072 2.98.227.228 2.981.073 7.052.014 8.332 0 8.741 0 12c0 3.259.014 3.668.072 4.948.227 4.072 2.981 6.826 7.052 6.981 1.28.058 1.689.072 4.948.072s3.668-.014 4.948-.072c4.072-.227 6.826-2.981 6.981-7.052.058-1.28.072-1.689.072-4.948s-.014-3.668-.072-4.948c-.227-4.072-2.981-6.826-7.052-6.981C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
              </svg>
            </motion.a>
          </div>
          <p className="text-sm">
            © {new Date().getFullYear()} PopcornPulse. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterNav;