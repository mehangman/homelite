import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function Login() {
  const { login } = useAuth()
  const [role, setRole] = useState('customer')
  const navigate = useNavigate()

  const handleLogin = () => {
    login(role)
    navigate(role === 'customer' ? '/customer' : role === 'staff' ? '/staff' : '/admin')
  }

  return (
    <div className="max-w-sm mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <label className="block mb-2">Select Role:</label>
      <select 
        className="border p-2 w-full mb-4"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="customer">Customer</option>
        <option value="staff">Staff</option>
        <option value="admin">Admin</option>
      </select>
      <button 
        onClick={handleLogin} 
        className="bg-red-500 text-white w-full py-2 rounded"
      >
        Login
      </button>
    </div>
  )
}
