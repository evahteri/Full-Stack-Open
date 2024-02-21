import React from 'react'
import { useState, useEffect } from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
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