const RollCall = require('../models/rollCallModel')

exports.getAllRollCalls = (req, res) => {
    RollCall.getAll((err, result) => {
        if(err) return res.status(500).json({ error: err.message })
        res.json(result)
    })
}

const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
  
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}


exports.addRollCall = (req, res) => {
    const newRollCall = req.body
    const now = getCurrentDateTime()
    RollCall.add(newRollCall, now, (err, result) => {
        if(err) return res.status(500).json({ error: err.message })
        res.json({ message: 'Add new room successfully', id: result.insertId})
    })
}

exports.deleteRollCall = (req, res) => {
    const id = req.params.id
    RollCall.delete(id, (err, result) => {
        if(err) return res.status(500).json({ error: err.message })
        res.json({ message: 'Delete a room successfully', id})
    })
}

exports.updateRollCall = (req, res) => {
    const id = req.params.id
    const newRoom = req.body
    const now = getCurrentDateTime()
    RollCall.update(id, newRoom, now, (err, result) => {
        if(err) return res.status(500).json({ error: err.message })
        res.json({ message: 'Update room successfully', affectedRows: result.affectedRows })
    })
}

exports.getRollCallById = (req, res) => {
    const id = req.params.id
    Room.getById(id, (err, result) => {
      if (err) return res.status(500).json({ error: err.message })
      if (result.length === 0) return res.status(404).json({ message: 'Room not found' })
      res.json(result[0])
    })
}
