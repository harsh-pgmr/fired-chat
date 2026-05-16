import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css';


import Home from './Home';
import Login from './Login';
import Register from './Register';
import JoinChat from './JoinChat';
import RoomsList from './RoomsList';
import Header from './Header';


function App() {

  return(
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/roomsList" element={<RoomsList />} />
        <Route exact path="/joinChat" element={<JoinChat />} />
      </Routes>
    </BrowserRouter>

  )
  
}

export default App
