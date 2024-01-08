const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const mongourl =
  `mongodb+srv://fullstack:${password}@cluster0.ras6e7z.mongodb.net/testBlogApp?retryWrites=true&w=majority`

mongoose.connect(mongourl)

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
  })

const Blog = mongoose.model('Blog', blogSchema)

const blog = new Blog({
  title: 'Test blog title2 ',
  author: 'Test blog author 2',
  url: 'www.testblogurl2.com',
  likes: 2
})


blog.save().then(result => {
  console.log('blog saved!')
  mongoose.connection.close()
})