import { useState, useEffect } from 'react'
import blogService from '../services/blogs'


const BlogForm = ({handleSuccessNotification, handleErrorNotification}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const handleNewBlog = async (event) => {
    event.preventDefault()
    
    try {
      const blog = await blogService.create({
        title, author, url
      })
      handleSuccessNotification(`a new blog '${blog.title}' by '${blog.author}' added`)
    } catch (exception) {
      handleErrorNotification('something went wrong')
    }
  }

  return (
    <form onSubmit={handleNewBlog}>
      <h2>create new</h2>
  
      <div>
        title:
        <input
          type="text"
          value={title}
          name="Title"
          onChange={handleTitleChange}
        />
      </div>
      <div>
        author:
        <input
          type="text"
          value={author}
          name="Author"
          onChange={handleAuthorChange}
        />
      </div>
      <div>
        url:
        <input
          type="text"
          value={url}
          name="Url"
          onChange={handleUrlChange}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm