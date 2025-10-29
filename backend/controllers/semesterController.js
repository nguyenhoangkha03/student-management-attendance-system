const Semester = require('../models/semesterModel')

exports.getAllSemesters = (req, res) => {
    Semester.getAll((err, result) => {
        if(err) return res.status(500).json({ error: err.message })
        res.json(result)
    })
}

exports.addSemester = (req, res) => {
    const newSemester = req.body
    Semester.add(newSemester, (err, result) => {
        if(err) return res.status(500).json({ error: err.message })
        res.json({ message: 'Add new semester successfully', id: result.insertId})
    })
}

exports.deleteSemester = (req, res) => {
    const id = req.params.id
    Semester.delete(id, (err, result) => {
        if(err) return res.status(500).json({ error: err.message })
        res.json({ message: 'Delete a semester successfully', id})
    })
}

exports.updateSemester = (req, res) => {
    const id = req.params.id
    const newSemester = req.body
    Semester.update(id, newSemester, (err, result) => {
        if(err) return res.status(500).json({ error: err.message })
        res.json({ message: 'Update semester successfully', affectedRows: result.affectedRows })
    })
}

exports.getSemesterById = (req, res) => {
    const id = req.params.id
    Semester.getById(id, (err, result) => {
      if (err) return res.status(500).json({ error: err.message })
      if (result.length === 0) return res.status(404).json({ message: 'Semester not found' })
      res.json(result[0])
    })
}
