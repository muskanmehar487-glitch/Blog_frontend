import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)

  useEffect(() => {
    const saved = localStorage.getItem('auth')
    if (saved) {
      const parsed = JSON.parse(saved)
      setUser(parsed.user)
      setToken(parsed.token)
    }
  }, [])

  function login(nextUser, nextToken) {
    setUser(nextUser)
    setToken(nextToken)
    localStorage.setItem('auth', JSON.stringify({ user: nextUser, token: nextToken }))
  }

  function logout() {
    setUser(null)
    setToken(null)
    localStorage.removeItem('auth')
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}


