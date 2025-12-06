import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiAuth } from '../services/api.js'
import Comments from './components/Comments.jsx'

export default function BlogDetails() {
  const { id } = useParams()
  const [blog, setBlog] = useState(null)

  useEffect(() => {
    (async () => {
      const { data } = await apiAuth.get(`/api/blogs/${id}`)
      setBlog(data)
    })()
  }, [id])

  if (!blog) return <p>Loading...</p>

  return (
    <div>
      <h1>{blog.title}</h1>
      {blog.image && <img src={blog.image} alt={blog.title} />}
      <div className="meta">By {blog.author} • {new Date(blog.createdAt).toLocaleDateString()}</div>
      <article className="content">{blog.content}</article>
      <Comments blogId={id} />
    </div>
  )
}


