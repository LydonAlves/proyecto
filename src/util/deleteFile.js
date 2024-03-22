const cloudinary = require('cloudinary').v2

const deleteFile = async (url) => {
  const imgSplit = url.split('/')

  const folderName = imgSplit.at(-2)
  const fileName = imgSplit.at(-1).split('.')[0]

  try {
    await cloudinary.uploader.destroy(`${folderName}/${fileName}`, () => {
      console.log('Destroyed')
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports = deleteFile
