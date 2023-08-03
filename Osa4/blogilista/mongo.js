const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const mongourl =
  `mongodb+srv://fullstack:${password}@cluster0.ras6e7z.mongodb.net/blogApp?retryWrites=true&w=majority`

mongoose.connect(mongourl)

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
  })

const Blog = mongoose.model('Blog', blogSchema)