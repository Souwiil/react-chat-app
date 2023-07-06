import React from 'react';
import {Routes, Route} from 'react-router-dom'
import Register from './pages/Register';
import Login from './pages/Login';
import Chat from './pages/Chat';
import Avatar from './pages/Avatar';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/avatar" element={<Avatar/>} />
        <Route path="/" element={<Chat/>} />
      </Routes>
    </div>
  );
}

export default App;

