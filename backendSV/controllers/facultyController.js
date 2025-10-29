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