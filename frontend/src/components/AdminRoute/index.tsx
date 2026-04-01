import { Navigate, Outlet } from 'react-router-dom'

export function AdminRoute() {
  const token = localStorage.getItem('token')
  const storedUser = localStorage.getItem('user')

  if (!token || !storedUser) {
    return <Navigate to="/login" replace />
  }

  try {
    const user = JSON.parse(storedUser)

    if (user.role !== 'admin') {
      return <Navigate to="/produtos" replace />
    }
  } catch {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}