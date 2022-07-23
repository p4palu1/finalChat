const express = require('express')
const app = express()
const http = require("http")
const { Server} = require('socket.io')
const cors = require("cors")

app.use(cors())

const server = http.createServer(app)

let users = []

const addUser = (socketId) => {
    if (!users.includes(socketId)){
        users.push(socketId)
    }
}

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ["GET", "POST"]
    },
})

io.on("connection", (socket) => {
    console.log(socket.id)
    addUser(socket.id)
    socket.emit("userList", users)
    
    socket.on("sendmessage", (data) => {
        socket.to(data.reciever).emit('recieve', data.message)
    })
})

server.listen(3001, () => {
    console.log("server listening on port 3001");
})