const { generateSing } = require('../../config/jwt')
const deleteFile = require('../../util/deleteFile')
const User = require('../models/User')
const bcrypt = require('bcrypt')

const getusers = async (req, res, next) => {
  try {
    const users = await User.find
    return res.status(200).json(users)
  } catch (error) {
    return res.status(400).json(error)
  }
}

const register = async (req, res, next) => {
  try {
    const newUser = new User({
      userName: req.body.userName,
      password: req.body.password,
      rol: 'user'
    })

    const duplicateUser = await User.findOne({ username: req.body.userName })

    if (duplicateUser) {
      return res.status(400).json('Name already in use')
    }

    const userSaved = await newUser.save()
    return res.status(201).json(userSaved)
  } catch (error) {
    return res.status(400).json(error)
  }
}

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ userName: req.body.userName })

    if (!user) {
      return res.status(200).json("user doesn't exist")
    }

    if (bcrypt.compareSync(req.body.password, user.password)) {
      const token = generateSing(user._id)
      return res.status(200).json(user, token)
    } else {
      return res.status(400).json('Incorrect pasword')
    }
  } catch (error) {
    console.log('Error during login')
    return res.status(400).json(error)
  }
}

const logOut = async (req, res, next) => {
  try {
    const token = null
    return res.status(200).json(token)
  } catch (error) {
    return next(error)
  }
}

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const newUser = new User(req.body)
    newUser._id = id

    if (req.file) {
      newUser.profileImage = req.file.path
      const oldUser = await User.findById(id)
      deleteFile(oldUser.profileImage)
    }

    const userUpdated = await User.findByIdAndUpdate(id, newUser, { new: true })
    return res.status(200).json(userUpdated)
  } catch (error) {
    return res.status(400).json('Error in request')
  }
}

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const userDeleted = await User.findByIdAndDelete(id)

    deleteFile(userDeleted.profileImage)

    return res.status(200).json(userDeleted)
  } catch (error) {
    return res.status(400).json('Error in the request')
  }
}

module.exports = { getusers, login, register, logOut, updateUser, deleteUser }
