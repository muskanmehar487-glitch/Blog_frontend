import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../services/api.js'
import { useAuth } from '../state/AuthContext.jsx'

export default function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  async function submit(e) {
    e.preventDefault()
    setError('')
    try {
      const { data } = await api.post('/api/auth/register', { username, email, password })
      login(data.user, data.token)
      navigate('/')
    } catch (e) {
      setError(e?.response?.data?.message || 'Register failed')
    }
  }

  return (
    <form className="auth-form" onSubmit={submit}>
      <h2>Register</h2>
      {error && <div className="error">{error}</div>}
      <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit">Create Account</button>
    </form>
  )
}


