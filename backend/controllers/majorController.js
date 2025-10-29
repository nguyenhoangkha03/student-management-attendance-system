const Major = require('../models/majorModel')

exports.getAllMajors = (req, res) => {
    Major.getAll((err, result) => {
        if(err) return res.status(500).json({ error: err.message })
        res.json(result)
    })
}

exports.addMajor = (req, res) => {
    const newMajor = req.body
    Major.add(newMajor, (err, result) => {
        if(err) return res.status(500).json({ error: err.message })
        res.json({ message: 'Add new Major successfully', id: result.insertId})
    })
}

exports.deleteMajor= (req, res) => {
    const id = req.params.id
    Major.delete(id, (err, result) => {
        if(err) return res.status(500).json({ error: err.message })
        res.json({ message: 'Delete a Major successfully', id})
    })
}

exports.updateMajor = (req, res) => {
    const id = req.params.id
    const newMajor = req.body
    Major.update(id, newMajor, (err, result) => {
        if(err) return res.status(500).json({ error: err.message })
        res.json({ message: 'Update Major successfully', affectedRows: result.affectedRows })
    })
}

exports.getMajoryById = (req, res) => {
    const id = req.params.id
    Major.getById(id, (err, result) => {
      if (err) return res.status(500).json({ error: err.message })
      if (result.length === 0) return res.status(404).json({ message: 'Major not found' })
      res.json(result[0])
    })
}
