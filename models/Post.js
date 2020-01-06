const mongoose = require('mongoose')

const PostSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  published: {
    type: Boolean,
    default: false
  },
  description: String,
  imageUrl: String,
  datetime: {
    type: Date,
    default: Date.now
  }
})

module.exports = new mongoose.model('Post', PostSchema)

