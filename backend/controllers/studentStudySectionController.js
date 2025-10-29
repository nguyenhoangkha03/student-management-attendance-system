const StudentStudySection = require('../models/studentStudySectionModel')

exports.getAllStudentStudySections = (req, res) => {
    StudentStudySection.getAll((err, result) => {
        if(err) return res.status(500).json({ error: err.message })
        res.json(result)
    })
}

exports.addStudentStudySection = (req, res) => {
    const newSectionClass = req.body
    StudentStudySection.add(newSectionClass, (err, result) => {
        if(err) return res.status(500).json({ error: err.message })
        res.json({ message: 'Add new SectionClass successfully', id: result.insertId})
    })
}

exports.deleteStudentStudySection= (req, res) => {
    const id = req.params.id
    StudentStudySection.delete(id, (err, result) => {
        if(err) return res.status(500).json({ error: err.message })
        res.json({ message: 'Delete a SectionClass successfully', id})
    })
}

exports.updateStudentStudySection = (req, res) => {
    const id = req.params.id
    const newSectionClass = req.body
    StudentStudySection.update(id, newSectionClass, (err, result) => {
        if(err) return res.status(500).json({ error: err.message })
        res.json({ message: 'Update SectionClass successfully', affectedRows: result.affectedRows })
    })
}

exports.updateScore = (req, res) => {
    const id = req.params.id
    const newScore = req.body
    if(newScore.diem_giua_ky !== null && newScore.diem_cuoi_ky === null) {
        StudentStudySection.getById(id, (err, result) => {
            if (err) return res.status(500).json({ error: err.message })
            if (result.length === 0) return res.status(404).json({ message: 'SectionClass not found' })
            
            if(result[0].diem_cuoi_ky !== null){
                const tong_ket = result[0].diem_cuoi_ky * 0.6 + newScore.diem_giua_ky * 0.4
                StudentStudySection.updateScore(id, { diem_giua_ky: newScore.diem_giua_ky, diem_cuoi_ky: result[0].diem_cuoi_ky, diem_tong_ket: tong_ket }, (err, result) => {
                    if(err) return res.status(500).json({ error: err.message })
                    res.json({ message: 'Update SectionClass successfully', affectedRows: result.affectedRows })
                })
            }
            else {
                StudentStudySection.updateScore(id, newScore, (err, result) => {
                    if(err) return res.status(500).json({ error: err.message })
                    res.json({ message: 'Update SectionClass successfully', affectedRows: result.affectedRows })
                })
            }
        })
    }
    else if(newScore.diem_giua_ky === null && newScore.diem_cuoi_ky !== null) {
        StudentStudySection.getById(id, (err, result) => {
            if (err) return res.status(500).json({ error: err.message })
            if (result.length === 0) return res.status(404).json({ message: 'SectionClass not found' })
            
            if(result[0].diem_giua_ky !== null){
                const tong_ket = result[0].diem_giua_ky * 0.4 + newScore.diem_cuoi_ky * 0.6
                StudentStudySection.updateScore(id, { diem_giua_ky: result[0].diem_giua_ky, diem_cuoi_ky: newScore.diem_cuoi_ky, diem_tong_ket: tong_ket }, (err, result) => {
                    if(err) return res.status(500).json({ error: err.message })
                    res.json({ message: 'Update SectionClass successfully', affectedRows: result.affectedRows })
                })
            }
            else {
                StudentStudySection.updateScore(id, newScore, (err, result) => {
                    if(err) return res.status(500).json({ error: err.message })
                    res.json({ message: 'Update SectionClass successfully', affectedRows: result.affectedRows })
                })
            }
        })
    }
    else {
        StudentStudySection.updateScore(id, newScore, (err, result) => {
            if(err) return res.status(500).json({ error: err.message })
            res.json({ message: 'Update SectionClass successfully', affectedRows: result.affectedRows })
        })
    }
}

exports.getStudentStudySectionById = (req, res) => {
    const id = req.params.id
    StudentStudySection.getById(id, (err, result) => {
      if (err) return res.status(500).json({ error: err.message })
      if (result.length === 0) return res.status(404).json({ message: 'SectionClass not found' })
      res.json(result[0])
    })
}

exports.getByIdSection = (req, res) => {
    const id = req.params.id
    StudentStudySection.getByIdSection(id, (err, result) => {
      if (err) return res.status(500).json({ error: err.message })
      if (result.length === 0) return res.status(404).json({ message: 'SectionClass not found' })
      res.json(result)
    })
}
