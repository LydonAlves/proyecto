const mongoose = require('mongoose')

const collaboratorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    profileImage: { type: String, required: true },
    university: { type: String, required: true },
    course: {
      type: String,
      required: true,
      enum: ['Bachellors degree', 'Masters degree', 'Doctorate', 'Post doc']
    }
  },
  {
    timestamps: true,
    collection: 'collaborators'
  }
)

const Collaborator = mongoose.model(
  'collaborators',
  collaboratorSchema,
  'collaborators'
)
module.exports = Collaborator
