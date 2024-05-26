import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomePage from './pages/home/HomePage';
import LoginPage from './pages/login/LoginPage';
import NotFoundPage from './pages/notfound/NotFoundPage';
import api from './api/api';


const App = () => {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<LoginPage/>} />

        <Route element={<NotFoundPage/>} />
      </Routes>
    </Router>
  );
};

export default App;
