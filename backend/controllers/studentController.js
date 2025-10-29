const Student = require('../models/studentModel')

exports.getAllStudents = (req, res) => {
    Student.getAll((err, result) => {
        if(err) return res.status(500).json({ error: err.message })
        
        if (!result || result.length === 0) {
            return res.json([])
        }

        const students = result.map(student => ({
            ...student,
            image: student.image ? `data:image/jpeg;base64,${student.image.toString("base64")}` : null
        }))

        res.json(students)
    })
}

exports.addStudent = (req, res) => {
    const { mssv, ho_ten, ngay_sinh, gioi_tinh, dia_chi, email, sdt, id_lop } = req.body

    let imageBuffer = null
    if(req.file){
        imageBuffer = req.file.buffer
    }

    Student.add({ mssv, ho_ten, ngay_sinh, gioi_tinh, dia_chi, email, sdt, id_lop, imageBuffer }, (err, result) => {
        if(err) return res.status(500).json({ error: err.message })
        res.json({ message: 'Add new student successfully', id: result.insertId})
    })
}

exports.deleteStudent = (req, res) => {
    const id = req.params.id
    Student.delete(id, (err, result) => {
        if(err) return res.status(500).json({ error: err.message })
        res.json({ message: 'Delete a student successfully', id})
    })
}

exports.updateStudent = (req, res) => {

    const id = req.params.id
    const { mssv, ho_ten, ngay_sinh, gioi_tinh, dia_chi, email, sdt, id_lop } = req.body
     
    let imageBuffer = null
    if(req.file === undefined){
        Student.getById(id, (err, result) => {
            imageBuffer = result[0].image

            Student.update(id, { mssv, ho_ten, ngay_sinh, gioi_tinh, dia_chi, email, sdt, id_lop, imageBuffer }, (err, result) => {
                if(err) return res.status(500).json({ error: err.message })
                res.json({ message: 'Update student successfully', affectedRows: result.affectedRows })
            })
        })
    }
    else{
        imageBuffer = req.file.buffer
        Student.update(id, { mssv, ho_ten, ngay_sinh, gioi_tinh, dia_chi, email, sdt, id_lop, imageBuffer }, (err, result) => {
            if(err) return res.status(500).json({ error: err.message })
            res.json({ message: 'Update student successfully', affectedRows: result.affectedRows })
        })
    }
}

exports.getStudentById = (req, res) => {
    const id = req.params.id

    Student.getById(id, (err, result) => {
        if (err) return res.status(500).json({ error: err.message })
        if (!result || result.length === 0) {
            return res.json([])
        }
        const student = {...result[0], imageBase64: result[0].image ? `data:image/jpeg;base64,${result[0].image.toString("base64")}` : null}
        res.json(student)
    })
}

exports.getStudentByIdClass = (req, res) => {
    const id = req.params.id

    Student.getByIdClass(id, (err, result) => {
        if(err) return res.status(500).json({ error: err.message })
        
        if (!result || result.length === 0) {
            return res.json([])
        }

        // const students = result.map(student => ({
        //     ...student,
        //     image: student.image ? `data:image/jpeg;base64,${student.image.toString("base64")}` : null
        // }))

        res.json(result)
    })
}

exports.getStudentByIdClassAndIdSection = (req, res) => {
    const { idClass, idSection } = req.params

    Student.getByIdClassAndIdSection({ idClass, idSection }, (err, result) => {
        if(err) return res.status(500).json({ error: err.message })
        
        if (!result || result.length === 0) {
            return res.json([])
        }

        // const students = result.map(student => ({
        //     ...student,
        //     image: student.image ? `data:image/jpeg;base64,${student.image.toString("base64")}` : null
        // }))

        res.json(result)
    })
}

exports.getStudentByIdClassAndIdSectionAndIdSchedule = (req, res) => {
    const { idClass, idSection,idSchedule } = req.params

    Student.getByIdClassAndIdSectionAndIdSchedule({ idClass, idSection, idSchedule }, (err, result) => {
        if(err) return res.status(500).json({ error: err.message })
        
        if (!result || result.length === 0) {
            return res.json([])
        }

        // const students = result.map(student => ({
        //     ...student,
        //     image: student.image ? `data:image/jpeg;base64,${student.image.toString("base64")}` : null
        // }))

        res.json(result)
    })
}

exports.getStudentByName = (req, res) => {
    const name = req.params.name

    Student.getByName(name, (err, result) => {
        if(err) return res.status(500).json({ error: err.message })
        
        if (!result || result.length === 0) {
            return res.json([])
        }

        res.json(result)
    })
}

exports.getStudentByMSSV = (req, res) => {
    const mssv = req.params.mssv

    Student.getByMSSV(mssv, (err, result) => {
        if (err) return res.status(500).json({ error: err.message })
        if (!result || result.length === 0) {
            return res.json([])
        }
        const student = {...result[0], imageBase64: result[0].image ? `data:image/jpeg;base64,${result[0].image.toString("base64")}` : null}
        res.json(student)
    })
}
