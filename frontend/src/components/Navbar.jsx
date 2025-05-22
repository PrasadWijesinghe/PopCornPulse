import React from "react";
import {Link} from "react-router-dom"
const Navbar = () => (
  <nav className="w-full fixed top-0 left-0 z-20 bg-black/40 backdrop-blur-md border-b border-white/10">
    <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
      {/* Logo & Brand */}
      <div className="flex items-center gap-3">
        <span className="font-extrabold text-2xl md:text-3xl text-white tracking-wide">POPCORNPULSE</span>
      </div>
      {/* Nav Links */}
      <div className="flex gap-8">
        <Link  to="/home" className="text-white/90 hover:text-white text-lg md:text-xl transition">Popular</Link>
        <Link  to="/toprated" className="text-white/90 hover:text-white text-lg md:text-xl transition">Top Rated</Link>
        <Link to="/upcoming" className="text-white/90 hover:text-white text-lg md:text-xl transition">Upcoming</Link>
        <a href="#" className="text-white/90 hover:text-white text-lg md:text-xl transition">Integrations</a>
      </div>
      {/* Button */}
      <a
        href="#"
        className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full transition font-semibold border border-white/20 text-lg md:text-xl"
      >
        Sign Up
      </a>
    </div>
  </nav>
);

export default Navbar;