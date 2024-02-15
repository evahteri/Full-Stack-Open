import { useState, useEffect } from 'react'

const Blog = ({ blog }) => {
  const [fullInfo, setfullInfo] = useState(false)


  const toggleFullInfo = () => {
    if (fullInfo)
      setfullInfo(false)
    else
      setfullInfo(true)
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
        likes {blog.likes} <button>like</button> <br />
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