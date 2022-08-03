import mongoose from "mongoose"

const groupSchema = mongoose.Schema({
    name: String,
    creator: String,
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const group = mongoose.model('group', groupSchema)

export default group