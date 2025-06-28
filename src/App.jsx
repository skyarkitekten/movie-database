import { useState } from 'react'
import './App.css'
import Navbar from './Navbar.jsx'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY

async function searchMovies(query) {
  if (!API_KEY) return []
  const params = new URLSearchParams({ api_key: API_KEY, query })
  const res = await fetch(`https://api.themoviedb.org/3/search/movie?${params}`)
  if (!res.ok) return []
  const data = await res.json()
  return data.results || []
}

function App() {
  const [query, setQuery] = useState('')
  const [movies, setMovies] = useState([])

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!query) return
    const results = await searchMovies(query)
    setMovies(results)
  }

  return (
    <div className="container mx-auto p-4">
      <Navbar />
      <h1>Movie Search</h1>
      <form onSubmit={handleSearch} className="search-form flex gap-2 mb-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies"
          className="border rounded p-2 flex-1"
        />
        <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white">Search</button>
      </form>
      <ul className="results">
        {movies.map((m) => (
          <li key={m.id}>{m.title} ({m.release_date?.slice(0,4)})</li>
        ))}
      </ul>
    </div>
  )
}

export default App
