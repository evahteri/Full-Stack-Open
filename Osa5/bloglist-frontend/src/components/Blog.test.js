import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogForm from './BlogForm'

test('renders title', () => {

  const blog = {
    title: 'This is a test title',
    author: 'Test Author',
    likes: 0,
    url: 'www.testingurl.com'
  }
  const user = {
    name: 'Test User',
    username: 'testuser'
  }
  const blogs = [blog]

  const setBlogs = jest.fn()

  const { container } = render(
    <Blog blog={blog} user={user} blogs={blogs} setBlogs={setBlogs} />
  )

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent(
    'This is a test title'
  )
})

test('url, likes and user are shown when view button is pressed', async () => {
  const blog = {
    title: 'This is a test title',
    author: 'Test Author',
    likes: 0,
    url: 'www.testingurl.com',
    user: {
      username: 'testuser',
      name: 'Test User'
    }
  }
  const user = {
    name: 'Test User',
    username: 'testuser'
  }
  const blogs = [blog]
  const setBlogs = jest.fn()

  const { container } = render(
    <Blog blog={blog} user={user} blogs={blogs} setBlogs={setBlogs} />
  )
  const mockUser = userEvent.setup()
  const button = screen.getByText('view')
  await mockUser.click(button)

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent(
    'This is a test title'
  )
  expect(div).toHaveTextContent('Test Author')
  expect(div).toHaveTextContent('likes 0')
  expect(div).toHaveTextContent('www.testingurl.com')
})

test('like event handler is called twice when button is pressed twice', async () => {
  // TODO
})

test('blogform calls event handler with the right details', async () => {
  const mockUser = userEvent.setup()
  const mockHandleNewBlog = jest.fn()

  render (
    <BlogForm handleNewBlog={mockHandleNewBlog}/>
  )
  const titleInput = screen.getByPlaceholderText('Title')
  const authorInput = screen.getByPlaceholderText('Author')
  const urlInput = screen.getByPlaceholderText('Url')
  const sendButton = screen.getByText('create')

  await mockUser.type(titleInput, 'Clean Code')
  await mockUser.type(authorInput, 'Martin')
  await mockUser.type(urlInput, 'www.blog.fi')
  await mockUser.click(sendButton)
  expect(mockHandleNewBlog.mock.calls).toHaveLength(1)
  expect(mockHandleNewBlog.mock.calls[0][0].author).toBe('Martin')
  expect(mockHandleNewBlog.mock.calls[0][0].title).toBe('Clean Code')
  expect(mockHandleNewBlog.mock.calls[0][0].url).toBe('www.blog.fi')
})