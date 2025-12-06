import { useEffect, useState } from 'react'
import { apiAuth } from '../../services/api.js'

export default function AdminDashboard() {
  const [blogs, setBlogs] = useState([])
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ title: '', image: '', description: '', content: '', author: '', tags: '' })
  const [error, setError] = useState('')

  async function load() {
    const { data } = await apiAuth.get('/api/admin/blogs')
    setBlogs(data)
  }

  useEffect(() => { load() }, [])

  function edit(b) {
    setEditing(b._id)
    setForm({ ...b, tags: (b.tags || []).join(',') })
  }

  function clear() {
    setEditing(null)
    setForm({ title: '', image: '', description: '', content: '', author: '', tags: '' })
  }

  async function save() {
    setError('')
    const required = ['title', 'description', 'content', 'author']
    for (const k of required) {
      if (!String(form[k] || '').trim()) {
        setError(`${k} is required`)
        return
      }
    }
    try {
      const payload = { ...form, tags: form.tags ? form.tags.split(',').map(t => t.trim()) : [] }
      if (editing) await apiAuth.put(`/api/admin/blogs/${editing}`, payload)
      else await apiAuth.post('/api/admin/blogs', payload)
      clear();
      await load()
    } catch (e) {
      const msg = e?.response?.data?.message || 'Failed to save blog'
      setError(msg)
    }
  }

  async function remove(id) {
    await apiAuth.delete(`/api/admin/blogs/${id}`)
    await load()
  }

  return (
    <div className="admin">
      <h2>Admin Dashboard</h2>
      {error && <div className="error">{error}</div>}
      <div className="admin-grid">
        <div className="admin-form">
          <input placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
          <input placeholder="Image URL" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} />
          <input placeholder="Author" value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} />
          <input placeholder="Tags (comma-separated)" value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })} />
          <textarea placeholder="Short Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
          <textarea placeholder="Content" value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} />
          <div className="actions">
            <button onClick={save}>{editing ? 'Update' : 'Create'} Blog</button>
            {editing && <button onClick={clear}>Cancel</button>}
          </div>
        </div>
        <div className="admin-list">
          {blogs.map(b => (
            <div key={b._id} className="row">
              <div className="grow">
                <strong>{b.title}</strong>
                <div className="muted">{b.author}</div>
              </div>
              <button onClick={() => edit(b)}>Edit</button>
              <button onClick={() => remove(b._id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


