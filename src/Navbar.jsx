import { useState } from 'react'

export default function Navbar() {
  const [user] = useState(null)

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <ul className="flex gap-4">
        <li><a href="#" className="hover:underline">Home</a></li>
        <li><a href="#" className="hover:underline">Movies</a></li>
        <li><a href="#" className="hover:underline">Actors</a></li>
        <li><a href="#" className="hover:underline">Producers</a></li>
        <li><a href="#" className="hover:underline">Top Rated</a></li>
      </ul>
      <div className="flex items-center gap-2">
        {user ? (
          <>
            <div className="w-8 h-8 rounded-full bg-gray-600" />
            <span>{user.name}</span>
          </>
        ) : (
          <>
            <div className="w-8 h-8 rounded-full bg-gray-600" />
            <a href="#" className="text-sm hover:underline">Login</a>
            <span className="text-sm">or</span>
            <a href="#" className="text-sm hover:underline">Sign Up</a>
          </>
        )}
      </div>
    </nav>
  )
}
