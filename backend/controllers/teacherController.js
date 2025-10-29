const Teacher = require('../models/teacherModel')

exports.getAllTeachers = (req, res) => {
    Teacher.getAll((err, result) => {
        if(err) return res.status(500).json({ error: err.message })

        if (!result || result.length === 0) {
            return res.json([])
        }

        const teachers = result.map(teacher => ({
            ...teacher,
            image: teacher.image ? `data:image/jpeg;base64,${teacher.image.toString("base64")}` : null
        }))

        res.json(teachers)
    })
}

exports.addTeacher = (req, res) => {
    const { msgv, ho_ten, ngay_sinh, gioi_tinh, dia_chi, email, sdt, id_khoa } = req.body

    let imageBuffer = null
    if(req.file){
        imageBuffer = req.file.buffer
    }

    Teacher.add({ msgv, ho_ten, ngay_sinh, gioi_tinh, dia_chi, email, sdt, id_khoa, imageBuffer }, (err, result) => {
        if(err) return res.status(500).json({ error: err.message })
        res.json({ message: 'Add new teacher successfully', id: result.insertId})
    })
}

exports.deleteTeacher= (req, res) => {
    const id = req.params.id
    Teacher.delete(id, (err, result) => {
        if(err) return res.status(500).json({ error: err.message })
        res.json({ message: 'Delete a teacher successfully', id})
    })
}

exports.updateTeacher = (req, res) => {
    
    const id = req.params.id
    const { msgv, ho_ten, ngay_sinh, gioi_tinh, dia_chi, email, sdt, id_khoa } = req.body

    let imageBuffer = null
    if(req.file === undefined){
        Teacher.getById(id, (err, result) => {
            imageBuffer = result[0].image
            Teacher.update(id, { msgv, ho_ten, ngay_sinh, gioi_tinh, dia_chi, email, sdt, id_khoa, imageBuffer }, (err, result) => {
                if(err) return res.status(500).json({ error: err.message })
                res.json({ message: 'Update teacher successfully', affectedRows: result.affectedRows })
            })
        })
    }
    else{
        imageBuffer = req.file.buffer
        Teacher.update(id, { msgv, ho_ten, ngay_sinh, gioi_tinh, dia_chi, email, sdt, id_khoa, imageBuffer }, (err, result) => {
            if(err) return res.status(500).json({ error: err.message })
            res.json({ message: 'Update teacher successfully', affectedRows: result.affectedRows })
        })
    }
}

exports.getTeacherById = (req, res) => {
    const id = req.params.id
    Teacher.getById(id, (err, result) => {
        if (err) return res.status(500).json({ error: err.message })
        if (!result || result.length === 0) {
            return res.json([])
        }
        const teacher = {...result[0], imageBase64: result[0].image ? `data:image/jpeg;base64,${result[0].image.toString("base64")}` : null}
        res.json(teacher)
    })
}
