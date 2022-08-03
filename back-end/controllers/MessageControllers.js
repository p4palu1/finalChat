import MessageModel from "../models/MessageModel.js"

const getMessages = async(req, res) => {
    try{
        let messages = await MessageModel.find({
            group: {$exists: true},
            group: req.params.id
        }).sort({'createdAt': -1}).exec()
        messages = messages.reverse()
        res.status(200).json(messages)

    } catch(err) {
        res.status(404).json({message: err.message})
    }
}


const sendMessage = async(req, res) => {
    
        const message = new MessageModel(req.body)

    try{
        await message.save()
        res.status(201).json(req.body)   
    } catch(err) {
        res.status(409).json({message: err.message})
    }
}

export { getMessages, sendMessage}