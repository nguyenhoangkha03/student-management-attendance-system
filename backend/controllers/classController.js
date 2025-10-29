const Classs = require('../models/classModel')

exports.getAllClasses = (req, res) => {
    Classs.getAll((err, result) => {
        if(err) return res.status(500).json({ error: err.message })
        res.json(result)
    })
}

exports.addClass = (req, res) => {
    const newClass = req.body
    Classs.add(newClass, (err, result) => {
        if(err) return res.status(500).json({ error: err.message })
        res.json({ message: 'Add new class successfully', id: result.insertId})
    })
}

exports.deleteClass= (req, res) => {
    const id = req.params.id
    Classs.delete(id, (err, result) => {
        if(err) return res.status(500).json({ error: err.message })
        res.json({ message: 'Delete a class successfully', id})
    })
}

exports.updateClass = (req, res) => {
    const id = req.params.id
    const newClass = req.body
    Classs.update(id, newClass, (err, result) => {
        if(err) return res.status(500).json({ error: err.message })
        res.json({ message: 'Update class successfully', affectedRows: result.affectedRows })
    })
}

exports.getClassyById = (req, res) => {
    const id = req.params.id
    Classs.getById(id, (err, result) => {
      if (err) return res.status(500).json({ error: err.message })
      if (result.length === 0) return res.status(404).json({ message: 'Class not found' })
      res.json(result[0])
    })
}

exports.getClassyByIdSemester = (req, res) => {
    const id = req.params.id
    Classs.getByIdSemester(id, (err, result) => {
      if (err) return res.status(500).json({ error: err.message })
      if (result.length === 0) return res.status(404).json({ message: 'Class not found' })
      res.json(result)
    })
}
