import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { api } from '../services/api.js'
import { useAuth } from '../state/AuthContext.jsx'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const infoMessage = location.state?.message

  async function submit(e) {
    e.preventDefault()
    setError('')
    try {
      const { data } = await api.post('/api/auth/login', { email, password })
      login(data.user, data.token)
      const next = location.state?.from?.pathname || '/'
      navigate(next)
    } catch (e) {
      setError(e?.response?.data?.message || 'Login failed')
    }
  }

  return (
    <form className="auth-form" onSubmit={submit}>
      <h2>Login</h2>
      {infoMessage && <div className="info">{infoMessage}</div>}
      {error && <div className="error">{error}</div>}
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  )
}


