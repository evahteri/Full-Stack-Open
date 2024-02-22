import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import ErrorNotification from './components/ErrorNotification'
import SuccessNotification from './components/SuccessNotification'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    const getBlogs = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }

    getBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage(
        'Wrong username or password'
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <ErrorNotification message={errorMessage} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
              id='username'
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
              id='password'
            />
          </div>
          <button type="submit" id='login_button'>login</button>
        </form>
      </div>
    )
  }

  const handleNewBlog = async (newBlog) => {
    const title = newBlog.title
    const author = newBlog.author
    const url = newBlog.url
    try {
      const blog = await blogService.create({
        title, author, url
      })
      setBlogs(blogs.concat(blog))
      handleSuccessNotification(`a new blog '${blog.title}' by '${blog.author}' added`)
    } catch (exception) {
      handleErrorNotification('something went wrong')
    }
  }

  const blogForm = () => {
    return <div>
      <Togglable buttonLabel='new blog' id='new_blog_button'>
        <BlogForm handleNewBlog={handleNewBlog}/>
      </Togglable>
    </div>
  }

  const handleErrorNotification = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const handleSuccessNotification = (message) => {
    setSuccessMessage(message)
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
  }

  return (
    <div>
      <h2>blogs</h2>
      <ErrorNotification message={errorMessage} />
      <SuccessNotification message={successMessage} />
      <p>{user.name} logged in</p>

      <button onClick={() => window.localStorage.removeItem('loggedBlogappUser')}id='logout_button'>logout</button>

      {blogForm()}

      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog => <Blog key={blog.id} blog={blog} user={user} blogs={blogs} setBlogs={setBlogs} handleErrorNotification={handleErrorNotification} handleSuccessNotification={handleSuccessNotification}/>)
      }
    </div>
  )
}

export default App