const express = require('express')
const app = express()
const http = require("http")
const { Server} = require('socket.io')
const cors = require("cors")

app.use(cors())

const server = http.createServer(app)

let users = []

const addUser = (newUser) => {
    if (users.findIndex((user) => user.socketId === newUser.socketId) === -1){
        users.push(newUser)
    }
}

const removeUser = (socketId) => {
    users = users.filter(user => user.socketId === socketId)
}

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ["GET", "POST"]
    },
})

io.on("connection", (socket) => {
    console.log(socket.id)
    socket.emit("userList", users)
    socket.emit("getGroup")
    
    socket.on("sendmessage", (data) => {
        try{
            users.forEach((user) => {
               if(user.groupId === data.group){
                socket.to(user.socketId).emit("recieve", data)          
                console.log(data.content);
                console.log(user.socketId);
               }
            })
        } catch(err){
            console.log(err.message);
        }
    })

    socket.on("groupId", (groupid) => {
        addUser({
            socketId: socket.id,
            groupId: groupid
        })
    })

   // socket.on("disconnect", () => {
    //    removeUser(socket)
   // });
})

server.listen(3001, () => {
    console.log("server listening on port 3001");
})