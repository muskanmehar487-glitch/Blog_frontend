import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../state/AuthContext.jsx'
import { api } from '../services/api.js'

export default function Home() {
  const [blogs, setBlogs] = useState([])
  const [q, setQ] = useState('')
  const { user } = useAuth()

  useEffect(() => {
    load()
  }, [])

  async function load(query) {
    const { data } = await api.get('/api/blogs', { params: query ? { q: query } : {} })
    setBlogs(data.items)
  }

  return (
    <div>
      <div className="hero">
        <h1 className="hero-message">Welcome on Blog Portal</h1>
      </div>
      <div className="search">
        <input placeholder="Search..." value={q} onChange={e => setQ(e.target.value)} />
        <button onClick={() => load(q)}>Search</button>
      </div>
      <div className="grid">
        {blogs.map(b => (
          <div className="card" key={b._id}>
            {b.image && <img src={b.image} alt={b.title} />}
            <h3>{b.title}</h3>
            <p className="line-clamp-2">{b.description || ''}</p>
            <small>By {b.author}</small>
            {user ? (
              <Link to={`/blogs/${b._id}`}>Read More</Link>
            ) : (
              <Link to="/login" state={{ message: 'Please log in to read full posts' }}>Login to read</Link>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}


