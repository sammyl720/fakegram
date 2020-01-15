const jwt = require('jsonwebtoken')
require('dotenv').config()
module.exports = (context, strict = true) => {
  // console.log(context.headers['authorization'])
  let token
  if (!context.headers['authorization'] && strict && !context.cookies.token) {
    throw new Error('unauthorized')
  } else if (!context.headers['authorization']) {
    token = context.cookies.token
  } else {
    token = context.headers['authorization'].split(' ')[1]
  }
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
