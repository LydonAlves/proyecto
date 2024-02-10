const { isAdmin, isAuth } = require('../../middlewares/auth')
const upload = require('../../middlewares/file')
const {
  getProjectById,
  postProject,
  putProject,
  getProjects,
  deleteProject
} = require('../controllers/Project')

const projectsRouter = require('express').Router()

projectsRouter.get('/:id', [isAuth], getProjectById)
projectsRouter.get('/', [isAuth], getProjects)
projectsRouter.post('/', [isAdmin], upload.single('image'), postProject)
projectsRouter.put('/:id', [isAdmin], upload.single('image'), putProject)
projectsRouter.delete('/:id', [isAdmin], deleteProject)

module.exports = projectsRouter
