import mongoose from "mongoose"

const MessageSchema = mongoose.Schema({
    author: String,
    content: String,
    createdAt: {
        type: Date, 
        default: new Date()
    },
    group: String
})

const message = mongoose.model('message', MessageSchema)

export default message