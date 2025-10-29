const Schedule = require('../models/scheduleModel')

exports.getAllSchedules = (req, res) => {
    Schedule.getAll((err, result) => {
        if(err) return res.status(500).json({ error: err.message })
        res.json(result)
    })
}

exports.addSchedule = (req, res) => {
    const newSchedule = req.body
    Schedule.add(newSchedule, (err, result) => {
        if(err) return res.status(500).json({ error: err.message })
        res.json({ message: 'Add new schedule successfully', id: result.insertId})
    })
}

exports.deleteSchedule = (req, res) => {
    const id = req.params.id
    Schedule.delete(id, (err, result) => {
        if(err) return res.status(500).json({ error: err.message })
        res.json({ message: 'Delete a schedule successfully', id})
    })
}

exports.updateSchedule = (req, res) => {
    const id = req.params.id
    const newSchedule = req.body
    Schedule.update(id, newSchedule, (err, result) => {
        if(err) return res.status(500).json({ error: err.message })
        res.json({ message: 'Update schedule successfully', affectedRows: result.affectedRows })
    })
}

exports.getScheduleById = (req, res) => {
    const id = req.params.id
    Schedule.getById(id, (err, result) => {
      if (err) return res.status(500).json({ error: err.message })
      if (result.length === 0) return res.status(404).json({ message: 'Schedule not found' })
      res.json(result[0])
    })
}

exports.getJoinAllSchedulesByIdClass = (req, res) => {
    const id = req.params.id
    Schedule.getAllJoinByIdClass(id, (err, result) => {
      if (err) return res.status(500).json({ error: err.message })
      if (result.length === 0) return res.status(404).json({ message: 'Schedule not found' })
      res.json(result)
    })
}

exports.getJoinAllSchedulesByIdTeacher = (req, res) => {
    const id = req.params.id
    Schedule.getAllJoinByIdTeacher(id, (err, result) => {
      if (err) return res.status(500).json({ error: err.message })
      if (result.length === 0) return res.status(404).json({ message: 'Schedule not found' })
      res.json(result)
    })
}

exports.getAllScheduleByIdClassAndDateNow = (req, res) => {
    const id = req.params.id
    Schedule.getAllByIdClassAndDateNow(id, (err, result) => {
      if (err) return res.status(500).json({ error: err.message })
      if (result.length === 0) return res.status(404).json({ message: 'Schedule not found' })
      res.json(result)
    })
}

exports.getCountScheduleByIdStudentAndIdSemester = (req, res) => {
    const { idStudent, idSemester } = req.params
    Schedule.getCountByIdStudentAndIdSemester({ idStudent, idSemester } , (err, result) => {
      if (err) return res.status(500).json({ error: err.message })
      if (result.length === 0) return res.status(404).json({ message: 'Schedule not found' })
      res.json(result)
    })
}

exports.getScheduleByIdSectionAndIdClassAndDay = (req, res) => {
    const { idSection, idClass } = req.params
    const now = new Date().toISOString().split("T")[0]
    Schedule.getByIdSectionAndClassAndDay({ idSection, idClass } , now, (err, result) => {
      if (err) return res.status(500).json({ error: err.message })
      if (result.length === 0) return res.status(404).json({ message: 'Schedule not found' })
      res.json(result)
    })
}
