import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomePage from './pages/home/HomePage';
import LoginPage from './pages/login/LoginPage';
import NotFoundPage from './pages/notfound/NotFoundPage';
import api from './api/api';
import Layout from './components/layout/Layout';
import Register from './pages/RegisterPage';
import ProdutoCadastro from "./pages/produtocadastro/ProdutoCadastroPage"
import TestPage from './pages/TestePage';


const App = () => {
  return (
    <Router>
        <Layout>
      <Routes>

        <Route path="/" element={<LoginPage/>} />
        <Route path="/home" element={<HomePage/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/dashboard/cadastroProduto" element={<ProdutoCadastro />} />
        <Route path="/test" element={<TestPage />} />
        

        <Route path="*" element={<NotFoundPage/>} />
      </Routes>
        </Layout>
    </Router>
  );
};

export default App;
