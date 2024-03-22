const mongoose = require('mongoose')
const Schema = mongoose.Schema

const projectSchema = new Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    university: { type: String, required: true },
    funding: {
      type: String,
      required: true,
      enum: ['EU', 'Spain national', 'Junta de Andalucia']
    },
    collaborators: [
      { type: mongoose.Types.ObjectId, ref: 'collaborators', required: false }
    ]
  },
  {
    timestamps: true,
    collection: 'projects'
  }
)

const Project = mongoose.model('projects', projectSchema, 'projects')
module.exports = Project
