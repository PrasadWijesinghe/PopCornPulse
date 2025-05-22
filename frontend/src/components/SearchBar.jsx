import React from "react";

const SearchBar = ({ value, onChange, onSearch }) => (
  <div className="w-full flex justify-center mb-8">
    <div className="relative w-full max-w-xl">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search movies, shows, or actors..."
        className="w-full rounded-full bg-black/60 border border-white/20 px-6 py-3 text-lg text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 transition backdrop-blur-md"
      />
      <button
        type="button"
        onClick={onSearch}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full transition border border-white/20"
        aria-label="Search"
      >
        🔍
      </button>
    </div>
  </div>
);

export default SearchBar;