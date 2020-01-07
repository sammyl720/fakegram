const User = require('../models/User')
module.exports = async id => {
  try {
    const user = await User.findById(id).select('-password')
    const result = {
      name: user.name,
      profileUrl: user.profileUrl,
      id: user.id,
      _id: user.id
    }
    return result
  } catch (e) {
    console.log('Like list retrievel error', e)
  }
}
