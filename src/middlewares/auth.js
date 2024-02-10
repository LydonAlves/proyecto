const User = require('../api/models/User')
const { verifyJWT } = require('../config/jwt')

const isAuth = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json('Authorization token is required')
    }

    const token = req.headers.authorization
    const parsedToken = token.replace('Bearer ', '')
    const { id } = verifyJWT(parsedToken)
    const user = await User.findById(id)

    if (!user) {
      return res.status(404).json('User not found')
    }

    user.password = null
    req.user = user

    next()
  } catch (error) {
    return res.status(400).json("You're not authorized to perform this action")
  }
}

const isAdmin = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json('Authorization token is required')
    }

    const token = req.headers.authorization
    const parsedToken = token.replace('Bearer ', '')
    const { id } = verifyJWT(parsedToken)
    const user = await User.findById(id)

    if (user && user.rol === 'admin') {
      user.password = null
      req.user = user
      next()
    } else {
      return res.status(400).json('Only administrators can do this action')
    }
  } catch (error) {
    return res.status(400).json("You're not authorized to perform this action")
  }
}

module.exports = { isAuth, isAdmin }
