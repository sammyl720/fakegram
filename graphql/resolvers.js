const User = require('../models/User')
const Post = require('../models/Post')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const posts = require('./posts')
const authToken = require('../utils/authToken')
require('dotenv').config()
module.exports = {
  hello: () => {
    return 'hello world'
  },
  users: async (args, context) => {
    // console.log('users resolver')
    let users = await User.find().select('-password')
    // console.log(users)
    users = users.map(async user => {
      user.posts = await Post.find({ user: user.id, published: true })
      return user
    })
    return users
  },
  user: async (args, context) => {
    // console.log(args)

    const user = await User.findById(args.id).select('-password')
    // console.log(`user: ${user}`)
    user.posts = await Post.find({ user: user.id, published: true })
    return user
  },
  createUser: async (args, context) => {
    // console.log(args)
    const { name, email, password } = args.data
    if (!name || !email || !password) {
      throw new Error({
        error: 'Insufficient data'
      })
    }
    try {
      const hashedPassword = await bcrypt.hash(password, 12)
      const emailExists = await User.findOne({ email })
      if (emailExists) {
        console.log('user with that e-mail already exists ')
        throw new Error('E-mail already in use')
      }
      const user = await new User({
        name,
        email,
        password: hashedPassword
      })
      console.log(user)
      if (args.data.age) user.age = args.data.age
      await user.save()
      return user
    } catch (err) {
      console.log('user post error', err)
    }
  },
  EditUser: async (args, context) => {
    try {
      const userId = authToken(context)
      if (!userId) {
        throw new Error('unauthorized')
      }
      // console.log(args.data)
      const updatedUser = await User.findByIdAndUpdate(userId, args.data, {
        useFindAndModify: false
      })
      updatedUser.posts = await Post.find({ user: userId })
      return updatedUser
    } catch (e) {
      console.log('edit user error', e)
    }
  },
  me: async (args, context) => {
    try {
      const userId = authToken(context)
      if (!userId) {
        throw new Error('unauthorized')
      }
      const user = await User.findById(userId)
      user.posts = await Post.find({ user: userId })
      return user
    } catch (e) {
      console.log('user error', e)
    }
  },
  loginUser: async (args, context) => {
    const { password, email } = args.data
    try {
      const user = await User.findOne({ email })
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        throw new Error('Incorrect credentials')
      } else {
        user.posts = await Post.find({ user: user.id })
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
          expiresIn: '1day'
        })
        return {
          user,
          token
        }
      }
    } catch (e) {
      console.log('login user error', e)
    }
  },
  ...posts
}
