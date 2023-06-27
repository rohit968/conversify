import axios from 'axios';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ChatPage from './pages/ChatPage';
import { SignUpPage, SignInPage } from './pages/pageIndex'
import { UserContextProvider } from './UserContext';

const App = () => {
  //axios.defaults.baseURL = 'http://localhost:4000';
  axios.defaults.baseURL = 'https://conversify-backend.onrender.com';
  axios.defaults.withCredentials = true;

  return (
    <UserContextProvider>
      <Routes>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/" element={<SignInPage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </UserContextProvider>
  )
}

export default App;
