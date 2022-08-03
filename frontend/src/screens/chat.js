import React, { useState, useEffect, useRef, useContext } from 'react'
import io from "socket.io-client";
import Message from "../components/Message"
import { Form, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { getMessages, sendMessage } from "../actions/MessageActions"
import "../css/hidescrollbar.css"
import groupContext from "../context/GroupContext"

const socket = io.connect('http://localhost:3001')


const chat = ({match}) => {

    const currentGroup = { _id: match.params.groupid }
    const dispatch = useDispatch()
    const [userList, setUserList] = useState([])
    const oldMessages = useSelector((state) => state.messages) || []
    const [presentedMessagesIndex, setPresentedMessagesIndex] = useState(25)
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState("")
    const [chosenUser, setChosenUser] = useState("")

    const inputRef = useRef()
    const scrollRef = useRef()
    const loadRef = useRef()

  const handleSendMessage = (e) => {
    e.preventDefault()
    try {
        dispatch(sendMessage({
            content: message,
            author: socket.id,
            createdAt: new Date(),
            group: currentGroup._id
        }))
       socket.emit("sendmessage", {
            content: message,
            author: socket.id,
            createdAt: new Date(),
            group: currentGroup._id
        })
        setMessages([...messages, {
            content: message,
            author: socket.id,
            createdAt: new Date(),
            group: currentGroup._id
        }])
    } catch (err){
        console.log(err.message);
    }
    scrollRef.current.scrollIntoView({behavior: 'smooth'})
    inputRef.current.value = ""
    setMessage("")
}

  const handleShowMore = () => {
    if(oldMessages.length > presentedMessagesIndex + 25){
        setPresentedMessagesIndex(presentedMessagesIndex + 25)
    } else {
        setPresentedMessagesIndex(oldMessages.length)
    }
    console.log(oldMessages.length)
    console.log(presentedMessagesIndex)
    loadRef.current.scrollIntoView()
  }

    useEffect(() => { 
        console.log(currentGroup._id);
        dispatch(getMessages(currentGroup._id))
    }, [socket.id, socket, history])


  useEffect(() => {

    socket.on('recieve', (data) => {
        setMessages([...messages, data])
    })
    socket.emit("groupId", currentGroup._id)
    socket.on('userList', (users) => {
      setUserList(users)
    })

  }, [socket, messages, oldMessages])

  useEffect(() => { 
    scrollRef.current.scrollIntoView({behavior: 'smooth'})
    console.log(oldMessages)
  }, [messages, oldMessages])

  return (
    <div style={{display: 'flex', flexDirection: 'column', height: '90vh', overflowY: 'none'}}>
      <div>
        <h3>GROUP: {currentGroup._id}</h3>
      </div>
      <section className="feed" style={{ height: "80vh", overflowY: 'scroll' }}>
        
        <div style={presentedMessagesIndex === oldMessages.length || oldMessages.length <= 25 ? {display: 'none'} : {display: 'flex'}} 
             className="align-items-center justify-content-center mt-3">
            <Button onClick={handleShowMore}>Show more</Button>
        </div>
        {
            oldMessages
            .slice(oldMessages.length - presentedMessagesIndex,oldMessages.length)
            .map((m, index) => (
                <>
                <span ref={index === 24 ? loadRef : null}></span>
                <Message author={m.author} content={m.content} isUser={m.author === socket.id} />                
                </>
            ))
        }
        {
            messages.map(m => (
                <Message author={m.author} content={m.content} isUser={m.author === socket.id}/>
            ))
        }
        <span ref={scrollRef}></span>
      </section>
      <footer style={{ width: '100%', bottom: '0', position: 'absolute', backgroundColor: 'gray'}} onSubmit={handleSendMessage}>
              
              <Form style={{ display: 'flex', justifyContent: 'center'}}>
                  <Form.Group style={{width: '100%'}}>
                    <Form.Control ref={inputRef} type="text" onChange={(e)=> setMessage(e.target.value)}>
                    </Form.Control>
                  </Form.Group>
                  
                  <Button variant="info" disabled={message === '' || currentGroup.id === ''} type="submit" style={{ backgroundColor: 'black'}}>
                    <i className="fas fa-paper-plane" ></i>
                  </Button>
              </Form>
              
      </footer>
    </div>
  )
}

export default chat