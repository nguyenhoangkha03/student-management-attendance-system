const Faculty = require('../models/facultyModel')

exports.getAllFaculties = (req, res) => {
    Faculty.getAll((err, result) => {
        if(err) return res.status(500).json({ error: err.message })
        res.json(result)
    })
}

exports.addFaculty = (req, res) => {
    const newFaculty = req.body
    Faculty.add(newFaculty, (err, result) => {
        if(err) return res.status(500).json({ error: err.message })
        res.json({ message: 'Add new faculty successfully', id: result.insertId})
    })
}

exports.deleteFaculty = (req, res) => {
    const id = req.params.id
    Faculty.delete(id, (err, result) => {
        if(err) return res.status(500).json({ error: err.message })
        res.json({ message: 'Delete a faculty successfully', id})
    })
}

exports.updateFaculty = (req, res) => {
    const id = req.params.id
    const newFaculty = req.body
    Faculty.update(id, newFaculty, (err, result) => {
        if(err) return res.status(500).json({ error: err.message })
        res.json({ message: 'Update faculty successfully', affectedRows: result.affectedRows })
    })
}

exports.getFacultyById = (req, res) => {
    const id = req.params.id
    Faculty.getById(id, (err, result) => {
      if (err) return res.status(500).json({ error: err.message })
      if (result.length === 0) return res.status(404).json({ message: 'Faculty not found' })
      res.json(result[0])
    })
}
