import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children, role }) {
  const { user } = useAuth()

  if (!user || user.role !== role) {
    return <Navigate to="/login" replace />
  }
  return children
}
