const { isAdmin, isAuth } = require('../../middlewares/auth')
const upload = require('../../middlewares/file')
const {
  getCollaboratorById,
  getCollaborators,
  postCollaborator,
  putCollaborator,
  deleteCollaborator
} = require('../controllers/Collaborator')

const collaboratorRoutes = require('express').Router()

collaboratorRoutes.get('/:id', [isAdmin], getCollaboratorById)
collaboratorRoutes.get('/', [isAdmin], getCollaborators)
collaboratorRoutes.post(
  '/',
  [isAuth],
  upload.single('profileImage'),
  postCollaborator
)
collaboratorRoutes.put(
  '/:id',
  [isAdmin],
  upload.single('profileImage'),
  putCollaborator
)
collaboratorRoutes.delete('/:id', [isAdmin], deleteCollaborator)

module.exports = collaboratorRoutes
