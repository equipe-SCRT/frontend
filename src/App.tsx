// import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import api from './api';
import Register from './pages/RegisterPage';


const App = () => {
  return (
    <Router>
      <Routes>
        {/* Defina suas rotas */}
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<Register/>} />

        <Route element={<NotFoundPage/>} />
      </Routes>
    </Router>
  );
};

export default App;
