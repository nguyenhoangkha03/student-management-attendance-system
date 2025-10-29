const Subject = require('../models/subjectModel')

exports.getAllSubjects = (req, res) => {
    Subject.getAll((err, result) => {
        if(err) return res.status(500).json({ error: err.message })
        res.json(result)
    })
}

exports.addSubject = (req, res) => {
    const newSubject = req.body
    Subject.add(newSubject, (err, result) => {
        if(err) return res.status(500).json({ error: err.message })
        res.json({ message: 'Add new subject successfully', id: result.insertId})
    })
}

exports.deleteSubject = (req, res) => {
    const id = req.params.id
    Subject.delete(id, (err, result) => {
        if(err) return res.status(500).json({ error: err.message })
        res.json({ message: 'Delete a subject successfully', id})
    })
}

exports.updateSubject = (req, res) => {
    const id = req.params.id
    const newSubject = req.body
    Subject.update(id, newSubject, (err, result) => {
        if(err) return res.status(500).json({ error: err.message })
        res.json({ message: 'Update subject successfully', affectedRows: result.affectedRows })
    })
}

exports.getSubjectById = (req, res) => {
    const id = req.params.id
    Subject.getById(id, (err, result) => {
      if (err) return res.status(500).json({ error: err.message })
      if (result.length === 0) return res.status(404).json({ message: 'Subject not found' })
      res.json(result[0])
    })
}
