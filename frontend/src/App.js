import { useState, useEffect } from 'react'
import "./css/bootstrap.min (10).css"
import Chat from "./screens/chat"
import GroupList from "./screens/GroupList"
import Menu from "./components/Menu"
import {BrowserRouter as BR, Routes, Route} from "react-router-dom"
import groupContext from "./context/GroupContext"

function App() {

  const [currentGroup, setCurrentGroup] = useState({
    id: '',
    name: '',
    creator: '',
    createdAt: Date.now(),
  })

  return (
    <groupContext.Provider value={{currentGroup, setCurrentGroup}} >
      <BR className="App">
        <Menu />
        <Route path="/" component={GroupList} exact/>
        <Route path="/chat/:groupid" component={Chat} exact/>
      </BR>
    </groupContext.Provider>
  );
}

export default App;
