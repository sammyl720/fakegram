const jwt = require('jsonwebtoken')
require('dotenv').config()
module.exports = (context, strict = true) => {
  // console.log(context.headers['authorization'])
  if (!context.headers['authorization'] && strict) {
    throw new Error('unauthorized')
  }
  const token = context.headers['authorization'].split(' ')[1]
  if (!token && strict) {
    throw new Error('unauthorized')
  } else if (!token) {
    return
  }
  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET)
    return userId
  } catch (e) {
    console.log('token error', e)
  }
}
