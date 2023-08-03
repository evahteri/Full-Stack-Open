const dummy = (blogs) => {
  return 1
}

const totalLikes = array => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return array.length === 0
    ? 0
    : array.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const favorite = blogs.reduce((mostLikedBlog, currentBlog) => {
    return currentBlog.likes > mostLikedBlog.likes ? currentBlog : mostLikedBlog
  })

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes
  }

}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}