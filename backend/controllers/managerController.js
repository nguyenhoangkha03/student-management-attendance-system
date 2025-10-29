const Manager = require('../models/managerModel')

exports.getAllManagers = (req, res) => {
    Manager.getAll((err, result) => {
        if(err) return res.status(500).json({ error: err.message })

        if (!result || result.length === 0) {
            return res.json([])
        }

        const managers = result.map(manager => ({
            ...manager,
            image: manager.image ? `data:image/jpeg;base64,${manager.image.toString("base64")}` : null
        }))

        res.json(managers)
    })
}

exports.addManager = (req, res) => {
    const { msm, ho_ten, ngay_sinh, gioi_tinh, dia_chi, email, sdt } = req.body

    let imageBuffer = null
    if(req.file){
        imageBuffer = req.file.buffer
    }

    Manager.add({ msm, ho_ten, ngay_sinh, gioi_tinh, dia_chi, email, sdt, imageBuffer }, (err, result) => {
        if(err) return res.status(500).json({ error: err.message })
        res.json({ message: 'Add new manager successfully', id: result.insertId})
    })
}

exports.deleteManager= (req, res) => {
    const id = req.params.id
    Manager.delete(id, (err, result) => {
        if(err) return res.status(500).json({ error: err.message })
        res.json({ message: 'Delete a manager successfully', id})
    })
}

exports.updateManager = (req, res) => {
    
    const id = req.params.id
    const { msm, ho_ten, ngay_sinh, gioi_tinh, dia_chi, email, sdt } = req.body

    let imageBuffer = null
    if(req.file === undefined){
        Manager.getById(id, (err, result) => {
            imageBuffer = result[0].image
            Manager.update(id, { msm, ho_ten, ngay_sinh, gioi_tinh, dia_chi, email, sdt, imageBuffer }, (err, result) => {
                if(err) return res.status(500).json({ error: err.message })
                res.json({ message: 'Update manager successfully', affectedRows: result.affectedRows })
            })
        })
    }
    else{
        imageBuffer = req.file.buffer
        Manager.update(id, { msm, ho_ten, ngay_sinh, gioi_tinh, dia_chi, email, sdt, imageBuffer }, (err, result) => {
            if(err) return res.status(500).json({ error: err.message })
            res.json({ message: 'Update manager successfully', affectedRows: result.affectedRows })
        })
    }
}

exports.getManagerById = (req, res) => {
    const id = req.params.id
    Manager.getById(id, (err, result) => {
        if (err) return res.status(500).json({ error: err.message })
        if (!result || result.length === 0) {
            return res.json([])
        }
        const manager = {...result[0], imageBase64: result[0].image ? `data:image/jpeg;base64,${result[0].image.toString("base64")}` : null}
        res.json(manager)
    })
}
