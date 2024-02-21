import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

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
    'This is a test title',
    'Test Author',
    'likes: 0',
    'www.testingurl.com'
  )
})