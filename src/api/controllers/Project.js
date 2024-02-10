const deleteFile = require('../../util/deleteFile')
const Project = require('../models/Project')

const getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find().populate('collaborators')
    return res.status(200).json(projects)
  } catch (error) {
    return res.status(400).json('Error in the request')
  }
}

const getProjectById = async (req, res, next) => {
  try {
    const { id } = req.params
    const project = await Project.findById(id).populate('collaborators')
    return res.status(200).json(project)
  } catch (error) {
    return res.status(400).json('Error in the request')
  }
}

const postProject = async (req, res, next) => {
  try {
    const newProject = new Project(req.body)
    console.log(newProject)
    const savedProject = await newProject.save()
    return res.status(201).json(savedProject)
  } catch (error) {
    return res.status(400).json('Error in the request')
  }
}

const putProject = async (req, res, next) => {
  try {
    const { id } = req.params
    const oldProject = await project.findById(id)
    const projectUpdates = new Project(req.body)
    projectUpdates._id = id

    const collaborators = req.body.collaborators || []
    projectUpdates.collaborators = [
      ...oldProject.collaborators,
      ...collaborators
    ]

    if (req.file) {
      projectUpdates.image = req.file.path
      deleteFile(oldProject.image)
    }

    const projectUpdated = await Project.findByIdAndUpdate(id, projectUpdates, {
      new: true
    })

    if (!projectUpdated) {
      return res.status(404).json({ message: 'Project not found' })
    }

    return res.status(200).json(projectUpdated)
  } catch (error) {
    return res.status(400).json('Error in the request')
  }
}

const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params
    const projectDeleted = await Project.findByIdAndDelete(id)

    deleteFile(projectDeleted.image)

    return res.status(200).json(projectDeleted)
  } catch (error) {
    return res.status(400).json('Error in the request')
  }
}

module.exports = {
  getProjects,
  getProjectById,
  postProject,
  putProject,
  deleteProject
}
