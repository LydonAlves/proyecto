const jwt = require('jsonwebtoken')

const generateSing = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '3w' })
}

const verifyJWT = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET)
}

module.exports = { generateSing, verifyJWT }
