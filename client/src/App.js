import React, { useState } from 'react';
import {io} from 'socket.io-client';
import Chat from './Page/Chat/Chat';
import Details from './Page/Details/Details'
import './App.css';

const socket = io.connect('http://localhost:8000')

function App() {
  const [showChat,setShowChat] = useState(false);
  const [userData,setUserData] = useState({})
  

  return (
    <div className='container' >
    { !showChat ? 
          <Details setUserData={setUserData} socket={socket} setShowChat={setShowChat} />
          :
          <Chat socket={socket} username={userData.username} room={userData.room} />
    }
    </div>
  );
}

export default App;
