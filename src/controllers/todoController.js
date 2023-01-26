const todo = require("../models/todoModel")

const todoAdd = async (req,res) => {
    
    try {
        const _todo = await todo.findOne({name: req.body.name})

        if(_todo) {
            return res.status(400).json({
                success: false,
                message: "Bu isimde kayıt mevcut"
            })
        }

        const todoAdd = new todo(req.body)
        
        await todoAdd.save()
            .then( () => {
                return res.status(201).json(todoAdd)
            })
            .catch((err) => {
                return res.status(400).json({
                    success: false,
                    message:"Kayıt oluşturulurken bir hata oluştur " + err
                })
            })
    } catch (error){
        return res.status(500).json({
            success: false,
            message: "Kayıt oluşturulamadı! "
        })
    }
    console.log("Controller add çalışstı")
}

const todoGetAll = async (req,res) => {
    const {page} = req.query
    const limit = 10
    const skip = Number(page-1)*limit

    try {
        const todoGetAll = await todo.find({}).limit(limit).skip(skip)
        return res.status(200).json({
            success:true,
            data: todoGetAll
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message: "Kayıtlar getirilemedi!" 
        })
    }
}

const todoUpdate = async (req, res) => {
    const {id} = req.params
    try {
        const todoUpdate = await todo.findByIdAndUpdate(id)
        if (todoUpdate){
            return res.status(200).json({
                success:true,
                message:"Güncelleme başarılı."
            })
        }else{
            return res.status(400).json({
                success:false,
                message:"Kayıt Güncellenemedi!"
            })
        }
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Kayıt Güncellenemedi."
        })
    }
}

const todoDelete = async (req , res) => {
    const {id} = req.params
    try {
        const todoDelete = await todo.findByIdAndDelete(id)
        if (todoDelete){
            return res.status(200).json({
                success:true,
                message:"Silme başarılı."
            })
        }else{
            return res.status(400).json({
                success:false,
                message:"Kayıt Silinemedi!"
            })
        }
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Kayıt Silinemedi."
        })
    }
}

const todoGet = async (req, res) => {
    const {id} = req.params
    try {
        const todoGet = await todo.findById(id)
        if (todoGet){
            return res.status(200).json({
                todoGet
            })
        }else{
            return res.status(404).json({
                success:false,
                message:"Kayıt bulunamadı!"
            })
        }
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Kayıt bulunamadı."
        })
    }
}

module.exports = {
    todoAdd,
    todoGetAll,
    todoUpdate,
    todoDelete,
    todoGet
}