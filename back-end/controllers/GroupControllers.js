import GroupModel from "../models/GroupModel.js"

const getGroups = async(req, res) => {
    try{
        const groups = await GroupModel.find()

        res.status(200).json(groups)

    } catch(err) {
        res.status(404).json({message: err.message})
    }
}


const addGroup = async(req, res) => {
    
        const group = new GroupModel(req.body)

    try{
        await group.save()
        res.status(201).json(req.body)   
    } catch(err) {
        res.status(409).json({message: err.message})
    }
}

export { getGroups, addGroup }