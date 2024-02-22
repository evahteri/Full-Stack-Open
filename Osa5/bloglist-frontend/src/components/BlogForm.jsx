import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'


const BlogForm = ({ handleNewBlog }) => {
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

  const handleCreateNewBlog = async (event) => {
    event.preventDefault()
    await handleNewBlog( {
      title: title,
      author: author,
      url: url
    })

  }

  return (
    <form onSubmit={handleCreateNewBlog}>
      <h2>create new</h2>

      <div>
        title:
        <input
          type="text"
          value={title}
          name="Title"
          onChange={handleTitleChange}
          placeholder='Title'
          id='title'
        />
      </div>
      <div>
        author:
        <input
          type="text"
          value={author}
          name="Author"
          onChange={handleAuthorChange}
          placeholder='Author'
          id='author'
        />
      </div>
      <div>
        url:
        <input
          type="text"
          value={url}
          name="Url"
          onChange={handleUrlChange}
          placeholder='Url'
          id='url'
        />
      </div>
      <button type="submit" id='create_button'>create</button>
    </form>
  )
}

BlogForm.propTypes = {
  handleNewBlog: PropTypes.func.isRequired,
}

export default BlogForm