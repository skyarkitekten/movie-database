import { useState } from "react";
import "./App.css";
import Navbar from "./Navbar.jsx";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

async function searchMovies(query) {
  if (!API_KEY) return [];
  const params = new URLSearchParams({ api_key: API_KEY, query });
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?${params}`
  );
  if (!res.ok) return [];
  const data = await res.json();
  return data.results || [];
}

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [showSearch, setShowSearch] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;
    const results = await searchMovies(query);
    setMovies(results);
    setShowSearch(true);
  };

  if (showSearch) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto p-4">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setShowSearch(false)}
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              ← Back to Home
            </button>
            <Navbar />
          </div>
          <h1 className="text-3xl font-bold mb-6">Movie Search</h1>
          <form onSubmit={handleSearch} className="search-form flex gap-2 mb-6">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search movies"
              className="border rounded-lg p-3 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-semibold"
            >
              Search
            </button>
          </form>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {movies.map((m) => (
              <div
                key={m.id}
                className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow"
              >
                <h3 className="font-semibold text-lg mb-2">{m.title}</h3>
                <p className="text-gray-600">
                  Released: {m.release_date?.slice(0, 4) || "Unknown"}
                </p>
                {m.overview && (
                  <p className="text-gray-700 text-sm mt-2 line-clamp-3">
                    {m.overview}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-200 via-pink-200 to-purple-300">
      {/* Header */}
      <header className="flex items-center justify-between p-6">
        {/* Logo and announcement */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                <div className="w-4 h-4 grid grid-cols-3 gap-0.5">
                  {[...Array(9)].map((_, i) => (
                    <div
                      key={i}
                      className="w-0.5 h-0.5 bg-black rounded-full"
                    ></div>
                  ))}
                </div>
              </div>
            </div>
            <span className="text-xl font-semibold">MovieDB</span>
          </div>
          <div className="hidden md:flex items-center bg-black/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm">
            <span>MovieDB featured on Product Hunt 🎬</span>
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className="text-gray-700 hover:text-black">
            Features
          </a>
          <a href="#" className="text-gray-700 hover:text-black">
            Browse
          </a>
          <a href="#" className="text-gray-700 hover:text-black">
            About
          </a>
          <a href="#" className="text-gray-700 hover:text-black">
            Login
          </a>
        </nav>

        {/* Mobile menu button */}
        <button className="md:hidden">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </header>

      {/* Main Content */}
      <main className="flex flex-col lg:flex-row items-center justify-between px-6 py-12 lg:py-24 max-w-7xl mx-auto">
        {/* Left Content */}
        <div className="flex-1 max-w-2xl lg:pr-12">
          <h1 className="text-5xl lg:text-7xl font-bold text-black leading-tight mb-6">
            Discover every{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              movie
            </span>
            .
          </h1>

          <p className="text-xl lg:text-2xl text-gray-700 mb-8 leading-relaxed">
            MovieDB helps you find the perfect film by revealing detailed
            information about every movie ever made.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => setShowSearch(true)}
              className="bg-black text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              Start Exploring
            </button>
            <button className="text-black px-8 py-4 rounded-lg font-semibold hover:bg-black/5 transition-colors">
              View Popular Movies
            </button>
          </div>
        </div>

        {/* Right Content - Phone Mockup */}
        <div className="flex-1 flex justify-center lg:justify-end mt-12 lg:mt-0">
          <div className="relative">
            <div className="w-80 h-[600px] bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-200 rounded-[3rem] border-8 border-gray-800 shadow-2xl overflow-hidden">
              {/* Phone Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 grid grid-cols-3 gap-0.5">
                        {[...Array(9)].map((_, i) => (
                          <div
                            key={i}
                            className="w-0.5 h-0.5 bg-black rounded-full"
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <span className="text-lg font-semibold">MovieDB</span>
                </div>
                <button>
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>

              {/* Phone Content */}
              <div className="p-6">
                <h2 className="text-3xl font-bold text-black leading-tight mb-4">
                  Discover
                  <br />
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    every movie
                  </span>
                  .
                </h2>
                <p className="text-gray-700 mb-6">
                  MovieDB helps you find the perfect film by revealing detailed
                  information about every movie.
                </p>
                <button
                  onClick={() => setShowSearch(true)}
                  className="bg-black text-white px-6 py-3 rounded-lg font-semibold w-full"
                >
                  Start Exploring
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
