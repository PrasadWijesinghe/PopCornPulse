"use client";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full fixed top-0 left-0 z-20 bg-gradient-to-r from-zinc-900/80 to-blue-900/80 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-3"
        >
          <span className="font-extrabold text-3xl md:text-4xl text-white tracking-tight">
            POPCORNPULSE
          </span>
        </motion.div>

        
        <div className="hidden md:flex gap-10">
          <Link
            to="/"
            className="text-white/90 text-lg md:text-xl font-medium hover:text-blue-400 transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            to="/popular"
            className="text-white/90 text-lg md:text-xl font-medium hover:text-blue-400 transition-colors duration-300"
          >
            Popular
          </Link>
          <Link
            to="/toprated"
            className="text-white/90 text-lg md:text-xl font-medium hover:text-blue-400 transition-colors duration-300"
          >
            Top Rated
          </Link>
          <Link
            to="/upcoming"
            className="text-white/90 text-lg md:text-xl font-medium hover:text-blue-400 transition-colors duration-300"
          >
            Upcoming
          </Link>
        </div>

        
        <button
          className="md:hidden text-white text-2xl focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle mobile menu"
        >
          {isOpen ? "✕" : "☰"}
        </button>

        
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-0 w-full bg-zinc-900/95 md:hidden flex flex-col items-center gap-4 py-4"
          >
            <Link
              to="/"
              className="text-white/90 text-lg font-medium hover:text-blue-400 transition-colors duration-300"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/popular"
              className="text-white/90 text-lg font-medium hover:text-blue-400 transition-colors duration-300"
              onClick={() => setIsOpen(false)}
            >
              Popular
            </Link>
            <Link
              to="/toprated"
              className="text-white/90 text-lg font-medium hover:text-blue-400 transition-colors duration-300"
              onClick={() => setIsOpen(false)}
            >
              Top Rated
            </Link>
            <Link
              to="/upcoming"
              className="text-white/90 text-lg font-medium hover:text-blue-400 transition-colors duration-300"
              onClick={() => setIsOpen(false)}
            >
              Upcoming
            </Link>
          </motion.div>
        )}

        
        <motion.a
          href="#"
          whileHover={{ scale: 1.05 }}
          className="hidden md:block bg-gradient-to-r from-blue-600 to-blue-400 text-white px-6 py-2 rounded-full font-semibold shadow-md hover:shadow-lg transition-all duration-300 border border-white/20 text-lg"
        >
          Sign Up
        </motion.a>
      </div>
    </nav>
  );
};

export default Navbar;