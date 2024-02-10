const collaboratorRoutes = require('./Collaborator')
const projectsRouter = require('./Project')
const usersRoutes = require('./User')

const mainRouter = require('express').Router()

mainRouter.use('/projects', projectsRouter)
mainRouter.use('/collaborators', collaboratorRoutes)
mainRouter.use('/users', usersRoutes)

module.exports = mainRouter
