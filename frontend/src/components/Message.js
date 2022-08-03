import React from 'react'

const Message = ({isUser, content, author}) => {
  return (
  isUser 
  ? <div style={{color: 'white', margin: '15px', padding: '10px',borderRadius: '10px 10px', backgroundColor: 'rgb(9, 209, 243)'}}>
        <h3>{author}</h3>
        <p>{content}</p>
    </div>
  : <div style={{color: 'white', margin: '15px', padding: '10px',borderRadius: '10px 10px', backgroundColor: 'rgb(20, 20, 20)'}}>
        <h3>{author}</h3>
        <p>{content}</p>
    </div>
    
  )
}

export default Message