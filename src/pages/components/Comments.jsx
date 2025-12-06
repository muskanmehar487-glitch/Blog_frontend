import { useEffect, useState } from 'react'
import { api, apiAuth } from '../../services/api.js'
import { useAuth } from '../../state/AuthContext.jsx'

export default function Comments({ blogId }) {
  const { user } = useAuth()
  const [comments, setComments] = useState([])
  const [content, setContent] = useState('')

  async function load() {
    const { data } = await api.get(`/api/comments/blog/${blogId}`)
    setComments(data)
  }

  useEffect(() => { load() }, [blogId])

  async function add() {
    if (!content.trim()) return
    await apiAuth.post('/api/comments', { blogId, content })
    setContent('')
    await load()
  }

  async function remove(id) {
    await apiAuth.delete(`/api/comments/${id}`)
    await load()
  }

  async function update(id, nextContent) {
    await apiAuth.put(`/api/comments/${id}`, { content: nextContent })
    await load()
  }

  return (
    <div className="comments">
      <h3>Comments</h3>
      {!user && (
        <div className="info">Please log in to post a comment.</div>
      )}
      {user && (
        <div className="comment-form">
          <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Write a comment..." />
          <button onClick={add}>Post Comment</button>
        </div>
      )}
      <ul>
        {comments.map(c => (
          <li key={c._id}>
            <p>{c.content}</p>
            {user && (user.role === 'admin' || user.id === c.userId) && (
              <div className="comment-actions">
                <button onClick={() => remove(c._id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}


