import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-red-600">Home Lite</Link>
      <div className="space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/about" className="hover:underline">About</Link>
        <Link to="/contact" className="hover:underline">Contact</Link>

        {!user && <Link to="/login" className="hover:underline">Login</Link>}
        {user && (
          <>
            {user.role === 'customer' && <Link to="/customer">Dashboard</Link>}
            {user.role === 'staff' && <Link to="/staff">Staff</Link>}
            {user.role === 'admin' && <Link to="/admin">Admin</Link>}
            <button onClick={logout} className="ml-2 text-red-500">Logout</button>
          </>
        )}
      </div>
    </nav>
  )
}
