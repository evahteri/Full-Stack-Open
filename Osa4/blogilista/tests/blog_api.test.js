const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Test blog title',
    author: 'Test blog author',
    url: 'www.testblogurl.com',
    likes: 1
  },
  {
    title: 'Another testing blog title',
    author: 'another author',
    url: 'www.anothertestblogurl.com',
    likes: 2
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

const api = supertest(app)

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length)
})

test('identifier field is id', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'New blog',
    author: 'Tester eero',
    url: 'www.newblog.com',
    likes: 5
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const titles = response.body.map(r => r.title)

  expect(response.body).toHaveLength(initialBlogs.length +1)
  expect(titles).toContain(
    'New blog'
  )
})

test('if new blog does not have likes-field, value will be 0', async () => {
  const newBlog = {
    title: 'New blog without likes',
    author: 'Tester eero',
    url: 'www.newblog.com'
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  expect(response.body[initialBlogs.length].likes).toEqual(0)
})

test('if new blog does not have url, 400 will be returned', async () => {
  const newBlog = {
    title: 'New blog without url',
    author: 'Tester eero',
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('if new blog does not have title, 400 will be returned', async () => {
  const newBlog = {
    author: 'Tester eero',
    url: 'www.newblog.com'
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('a blog can be deleted', async () => {

  const response = await api.get('/api/blogs')

  const blogId = response.body[0].id

  await api
    .delete(`/api/blogs/${blogId}`)

  const response2 = await api.get('/api/blogs')

  const titles = response2.body.map(r => r.title)

  expect(titles.length).toEqual(initialBlogs.length-1)
  expect(titles).toContain(
    'Another testing blog title'
  )

})

afterAll(async () => {
  await mongoose.connection.close()
})