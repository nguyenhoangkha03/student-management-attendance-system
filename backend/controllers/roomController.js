const Room = require('../models/roomModel')

exports.getAllRooms = (req, res) => {
    Room.getAll((err, result) => {
        if(err) return res.status(500).json({ error: err.message })
        res.json(result)
    })
}

exports.addRoom = (req, res) => {
    const newRoom = req.body
    Room.add(newRoom, (err, result) => {
        if(err) return res.status(500).json({ error: err.message })
        res.json({ message: 'Add new room successfully', id: result.insertId})
    })
}

exports.deleteRoom = (req, res) => {
    const id = req.params.id
    Room.delete(id, (err, result) => {
        if(err) return res.status(500).json({ error: err.message })
        res.json({ message: 'Delete a room successfully', id})
    })
}

exports.updateRoom = (req, res) => {
    const id = req.params.id
    const newRoom = req.body
    Room.update(id, newRoom, (err, result) => {
        if(err) return res.status(500).json({ error: err.message })
        res.json({ message: 'Update room successfully', affectedRows: result.affectedRows })
    })
}

exports.getRoomById = (req, res) => {
    const id = req.params.id
    Room.getById(id, (err, result) => {
      if (err) return res.status(500).json({ error: err.message })
      if (result.length === 0) return res.status(404).json({ message: 'Room not found' })
      res.json(result[0])
    })
}
