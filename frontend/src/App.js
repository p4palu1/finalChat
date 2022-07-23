import { useState, useEffect } from 'react'
import io from "socket.io-client";
const socket = io.connect('http://localhost:3001')

function App() {

  const [userList, setUserList] = useState([])
  const [chosenUser, setChosenUser] = useState("")

  const sendMessage = () => {
    socket.emit("sendmessage", {message: 'hello', sender: socket.id, reciever: chosenUser})
  }

  useEffect(() => {
    socket.on('recieve', (data) => {
      alert(data)
    })

    socket.on('userList', (users) => {
      setUserList(users)
      console.log(users)
    })
  }, [socket])

  return (
    <div className="App">
      <div>
        <h2>me: {socket.id}</h2>
      </div>
      <input placeholder="message..."/>
      <div>
      {
        userList.map((userId) => (
          <div>
            <button onClick={() => setChosenUser(userId)}>{userId}</button>
          </div>
        ))
      }
      </div>
      
      <div>
        <span>Chosen user: {chosenUser}</span>
      </div>
      <button onClick={sendMessage}>send message</button>
      <button onClick={() => setChosenUser("")}>reset</button>
      
    </div>
  );
}

export default App;
