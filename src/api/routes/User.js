const { isAdmin } = require('../../middlewares/auth')
const upload = require('../../middlewares/file')
const {
  getusers,
  login,
  register,
  logOut,
  updateUser,
  deleteUser
} = require('../controllers/User')

const usersRoutes = require('express').Router()

usersRoutes.get('/', [isAdmin], getusers)
usersRoutes.post('/register', upload.single('profileImage'), register)
usersRoutes.post('/login', login)
usersRoutes.post('/logout', logOut)
usersRoutes.put('/:id', upload.single('profileImage'), [isAdmin], updateUser)
usersRoutes.delete('/:id', [isAdmin], deleteUser)

module.exports = usersRoutes
