import React from "react";

const SearchBar = ({ value, onChange, onSearch }) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div className="w-full flex justify-center mb-10 px-4">
      <div className="relative w-full max-w-2xl">
        <input
          type="text"
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          placeholder="Search movies..."
          className="w-full rounded-full bg-gradient-to-r from-gray-900 to-gray-800 border border-gray-700/50 px-6 py-3.5 text-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:scale-[1.02] transition-all duration-300 ease-in-out backdrop-blur-lg shadow-lg font-['Inter',sans-serif]"
          aria-label="Search movies, shows, or actors"
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange({ target: { value: "" } })}
            className="absolute right-12 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
            aria-label="Clear search"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
        <button
          type="button"
          onClick={onSearch}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-amber-500/20 hover:bg-amber-500/30 text-white px-4 py-2 rounded-full transition-all duration-200 border border-amber-500/30 hover:scale-105"
          aria-label="Search"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;