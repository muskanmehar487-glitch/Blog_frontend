import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import BlogDetails from './pages/BlogDetails.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import AdminDashboard from './pages/admin/AdminDashboard.jsx'
import { useAuth } from './state/AuthContext.jsx'

function PrivateRoute({ children }) {
  const { user } = useAuth()
  const location = useLocation()
  return user ? children : (
    <Navigate to="/login" replace state={{ from: location, message: 'Please log in to continue' }} />
  )
}

function AdminRoute({ children }) {
  const { user } = useAuth()
  return user && user.role === 'admin' ? children : <Navigate to="/" replace />
}

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/blogs/:id" element={<PrivateRoute><BlogDetails /></PrivateRoute>} />
          <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}


