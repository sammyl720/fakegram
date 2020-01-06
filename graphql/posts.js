const Post = require('../models/Post')
const User = require('../models/User')
const authToken = require('../utils/authToken')
module.exports = {
  posts: async (args, context ) => {
    try {
      let allPosts = await Post.find({ published: true })
      allPosts = allPosts.map(async post => {
        post.user = await User.findById(post.user)
        return post
      })
      return allPosts
    } catch (e) {
      console.log('post error', e)
    }
  },
  myPosts: async (args, context) => {
    try {
      const userId = authToken(context)
      if (!userId) {
        throw new Error('Please sign in')
      }
      let posts = await Post.find({ user: userId })
      const user = await User.findById(userId)
      // console.log(user)
      posts = posts.map(post => {
        post.user = user
        return post
      })
      // console.log(posts)
      return posts
    } catch (e) {
      console.log('myPost error', e)
    }
  },
  createPost: async (args, context) => {
    try {
      const userId = authToken(context)
      const post = await new Post({
        ...args.data,
        user: userId
      })
      post.save()
      const user = await User.findById(userId)
      post.user = user
      return post
    } catch (e) {
      console.log('create Post error', e)
    }
  },
  updatePost: async (args, context) => {
    try {
      const userId = authToken(context)
      const post = await Post.findById(args.id)
      if (post.user.toString() !== userId) {
        throw new Error('Not authorized')
      }
      const user = await User.findById(userId)
      const updatedPost = await Post.findByIdAndUpdate(args.id, args.data, {
        useFindAndModify: false
      })
      updatedPost.user = user
      return updatedPost
    } catch (e) {
      console.log('update post error', e)
    }
  },
  deletePost: async (args, context ) => {
    try {
      const userId = authToken(context)
      const post = await Post.findById(args.id)
      console.log(`${post.user} === ${userId}`)
      if (post.user.toString() !== userId) {
        throw new Error('Not authorized')
      }
      const user = await User.findById(userId)
      post.user = user
      const result = await Post.findByIdAndDelete(args.id)
      console.log(result)
      return post
    } catch (e) {
      console.log('delete post error', e)
    }
  }
}