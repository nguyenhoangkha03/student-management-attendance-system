const SectionClass = require('../models/sectionClassModel')

exports.getAllSectionClasses = (req, res) => {
    SectionClass.getAll((err, result) => {
        if(err) return res.status(500).json({ error: err.message })
        res.json(result)
    })
}

exports.addSectionClass = (req, res) => {
    const newSectionClass = req.body
    SectionClass.add(newSectionClass, (err, result) => {
        if(err) return res.status(500).json({ error: err.message })
        res.json({ message: 'Add new SectionClass successfully', id: result.insertId})
    })
}

exports.deleteSectionClass= (req, res) => {
    const id = req.params.id
    SectionClass.delete(id, (err, result) => {
        if(err) return res.status(500).json({ error: err.message })
        res.json({ message: 'Delete a SectionClass successfully', id})
    })
}

exports.updateSectionClass = (req, res) => {
    const id = req.params.id
    const newSectionClass = req.body
    SectionClass.update(id, newSectionClass, (err, result) => {
        if(err) return res.status(500).json({ error: err.message })
        res.json({ message: 'Update SectionClass successfully', affectedRows: result.affectedRows })
    })
}

exports.getSectionClassById = (req, res) => {
    const id = req.params.id
    SectionClass.getById(id, (err, result) => {
      if (err) return res.status(500).json({ error: err.message })
      if (result.length === 0) return res.status(404).json({ message: 'SectionClass not found' })
      res.json(result[0])
    })
}

exports.getAllSectionClassesById = (req, res) => {
    const id = req.params.id
    SectionClass.getAllByIdSemester(id, (err, result) => {
      if (err) return res.status(500).json({ error: err.message })
      res.json(result)
    })
}

exports.getAllJoinSectionClassesByIdSemesterAndIdStudent = (req, res) => {

    const { idSemester, idStudent } = req.params

    SectionClass.getAllJoinByIdSemesterAndIdStudent({ idSemester, idStudent }, (err, result) => {
      if (err) return res.status(500).json({ error: err.message })
      res.json(result)
    })
}

exports.getAllJoinSectionClassesByIdSemesterAndIdTeacher = (req, res) => {

    const { idSemester, idTeacher } = req.params

    SectionClass.getAllJoinByIdSemesterAndIdTeacher({ idSemester, idTeacher }, (err, result) => {
      if (err) return res.status(500).json({ error: err.message })
      res.json(result)
    })
}

exports.getAllJoinSectionClassesByIdSemesterAndNotIdStudent = (req, res) => {

    const { idSemester, idStudent } = req.params

    SectionClass.getAllJoinByIdSemesterAndNotIdStudent({ idSemester, idStudent }, (err, result) => {
      if (err) return res.status(500).json({ error: err.message })
      res.json(result)
    })
}

exports.getAllJoinGroupBySemesterSectionClassesByIdStudent = (req, res) => {

    const idStudent = req.params

    SectionClass.getAllJoinGroupBySemesterByIdStudent(idStudent, (err, result) => {
      if (err) return res.status(500).json({ error: err.message })
      res.json(result)
    })
}

exports.getAllSectionClassByIdTeacher = (req, res) => {

    const idTeacher = req.params

    SectionClass.getAllByIdTeacher(idTeacher, (err, result) => {
      if (err) return res.status(500).json({ error: err.message })
      res.json(result)
    })
}
