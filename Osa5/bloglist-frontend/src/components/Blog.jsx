import { useState, useEffect } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const [fullInfo, setfullInfo] = useState(false)


  const toggleFullInfo = () => {
    if (fullInfo)
      setfullInfo(false)
    else
      setfullInfo(true)
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
      console.log('success')
      console.log(blog)
    } catch (exception) {
      console.log('error')
    }
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
        likes {blog.likes} <button onClick={(event) => handleLike(event, blog)}>like</button> <br />
        {blog.author}
      </div>)
  else
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author} <button onClick={toggleFullInfo}>view</button>
      </div>
    )
}




export default Blog