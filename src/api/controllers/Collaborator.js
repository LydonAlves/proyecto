const deleteFile = require('../../util/deleteFile')
const Collaborator = require('../models/Collaborator')

const getCollaborators = async (req, res, next) => {
  try {
    const collaborators = await Collaborator.find()
    return res.status(200).json(collaborators)
  } catch (error) {
    return res.status(400).json('Error in the request')
  }
}

const getCollaboratorById = async (req, res, next) => {
  try {
    const { id } = req.params
    const collaborator = await Collaborator.findById(id)
    return res.status(200).json(collaborator)
  } catch (error) {
    return res.status(400).json('Error in the request')
  }
}

const postCollaborator = async (req, res, next) => {
  try {
    const newCollaborator = new Collaborator(req.body)

    if (req.file) {
      newCollaborator.profileImage = req.file.path
    }

    const duplicateCollaborator = await Collaborator.findOne({
      name: req.body.name
    })

    if (duplicateCollaborator) {
      return res.status(400).json('Name already in use')
    }

    const savedCollaborator = await newCollaborator.save()
    return res.status(201).json(savedCollaborator)
  } catch (error) {
    return res.status(400).json('Error in the request')
  }
}

const putCollaborator = async (req, res, next) => {
  try {
    const { id } = req.params
    const collaboratorUpdates = new Collaborator(req.body)
    collaboratorUpdates._id = id

    if (req.file) {
      collaboratorUpdates.profileImage = req.file.path
      const oldCollaborator = await Collaborator.findById(id)
      deleteFile(oldCollaborator.profileImage)
    }

    const collaboratorUpdated = await Collaborator.findByIdAndUpdate(
      id,
      collaboratorUpdates,
      {
        new: true
      }
    )

    if (!collaboratorUpdated) {
      return res.status(404).json({ message: 'Collaborator not found' })
    }

    return res.status(200).json(collaboratorUpdated)
  } catch (error) {
    return res.status(400).json('Error in the request')
  }
}

const deleteCollaborator = async (req, res, next) => {
  try {
    const { id } = req.params
    const collaboratorDeleted = await Collaborator.findByIdAndDelete(id)

    deleteFile(collaboratorDeleted.profileImage)

    return res.status(200).json(collaboratorDeleted)
  } catch (error) {
    return res.status(400).json('Error in the request')
  }
}

module.exports = {
  getCollaborators,
  getCollaboratorById,
  postCollaborator,
  putCollaborator,
  deleteCollaborator
}
