const Image = require('../models/imageStudentModel')

exports.getAllImages = (req, res) => {
    Image.getAll((err, result) => {
        if(err) return res.status(500).json({ error: err.message })
        res.json(result)
    })
}

exports.addImage = (req, res) => {
    const newImage = req.body
    console.log(newImage)
    Image.add(newImage, (err, result) => {
        if(err) return res.status(500).json({ error: err.message })
        res.json({ message: 'Add new Image successfully', id: result.insertId})
    })
}

exports.deleteImage = (req, res) => {
    const id = req.params.id
    Image.delete(id, (err, result) => {
        if(err) return res.status(500).json({ error: err.message })
        res.json({ message: 'Delete a Image successfully', id})
    })
}

exports.updateImage = (req, res) => {
    const id = req.params.id
    const newImage = req.body
    Image.update(id, newImage, (err, result) => {
        if(err) return res.status(500).json({ error: err.message })
        res.json({ message: 'Update Image successfully', affectedRows: result.affectedRows })
    })
}

exports.getImageById = (req, res) => {
    const id = req.params.id
    Image.getById(id, (err, result) => {
      if (err) return res.status(500).json({ error: err.message })
      if (result.length === 0) return res.status(404).json({ message: 'Image not found' })
      res.json(result[0])
    })
}
