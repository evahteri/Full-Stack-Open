import { useState, useEffect } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, user, blogs, setBlogs }) => {
  const [fullInfo, setfullInfo] = useState(false)
  const [likes, setLikes] = useState('')

  useEffect(() => {
    setLikes(blog.likes)
  }, [blog.likes])


  const toggleFullInfo = () => {
    if (fullInfo)
      setfullInfo(false)
    else
      setfullInfo(true)
  }

  const handleRemove = async (event, blog) => {
    event.preventDefault()

    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        const response = await blogService.remove(blog.id)

        setBlogs(blogs.filter(b => b.id !== blog.id))
      }
      catch (exception) {
        console.log('error')
      }
    }

  }

  const handleLike = async (event, blogObject) => {
    event.preventDefault()
    const newBlogObject = {
      title: blogObject.title,
      author: blogObject.author,
      url: blogObject.url,
      likes: blogObject.likes + 1,
      user: blogObject.user.id
    }

    try {
      const blog = await blogService.update(blogObject.id, newBlogObject)
      setLikes(blog.likes)
    } catch (exception) {
      console.log('error')
    }
  }
  const removeButtonStyle = {
    backgroundColor: 'red'

  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  if (fullInfo)
    return (
      <div style={blogStyle}>
        {blog.title} <button onClick={toggleFullInfo}>hide</button> <br />
        {blog.url} <br />
        likes {likes} <button onClick={(event) => handleLike(event, blog)}>like</button> <br />
        {blog.author} <br />
        {blog.user.username === user.username && (
          <button style={removeButtonStyle} onClick={(event) => handleRemove(event, blog)}>remove</button>
        )}
      </div>
    )
  else
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author} <button onClick={toggleFullInfo}>view</button>
      </div>
    )
}




export default Blog