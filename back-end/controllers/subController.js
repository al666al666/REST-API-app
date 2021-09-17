const { update } = require('../models/subSchema');
const Sub = require('../models/subSchema')


exports.getAll = async (req, res) => {
    try {
        const savedSub = await Sub.find();
        res.status(200).json(savedSub)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

exports.postOne = async (req, res) => {
    const newSub = new Sub({
        name: req.body.name,
        chanel: req.body.chanel
    })
    try {
        const newsaveSub = await newSub.save();
        res.status(201).json(newsaveSub)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

exports.getOne = async (req, res) => {
    res.send(res.data.name)
}

exports.deleteOne = async (req, res) => {
    try {
        await res.data.remove()
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

exports.updateOne = async (req, res) => {
    if ((req.body.name != null) && (req.body.chanel != null)){
        res.data.name = req.body.name;
        res.data.chanel = req.body.chanel
    }
    try {
        const updatedSub = await res.data.save()
        res.status(201).json(updatedSub)
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}






//middleware 

exports.getbyId = async (req, res, next) => {
    let data
    try {
        data = await Sub.findById(req.params.id)
        if (data == null) {
            return res.status(404).json('data undefined')
        }

    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.data = data
    next()
}