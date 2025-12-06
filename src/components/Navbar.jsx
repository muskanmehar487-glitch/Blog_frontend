import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../state/AuthContext.jsx'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="brand">BlogApp</Link>
      </div>
      <div className="nav-right">
        {user ? (
          <>
            {user.role === 'admin' && <Link to="/admin">Admin</Link>}
            <span className="username">Hi, {user.username}</span>
            <button onClick={() => { logout(); navigate('/'); }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  )
}


