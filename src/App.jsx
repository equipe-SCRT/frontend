import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomePage from './pages/home/HomePage';
import LoginPage from './pages/login/LoginPage';
import NotFoundPage from './pages/notfound/NotFoundPage';
import Layout from './components/layout/Layout';
import Register from './pages/RegisterPage';
import ProdutoUnitarioCadastro from "./pages/produtounitariocadastro/ProdutoUnitarioCadastroPage"
import ProdutoCadastro from "./pages/produto/ProdutoCadastroPage"
import CestaCadastro from "./pages/cesta/CestaCadastroPage"
import DashboardCampanhas from './pages/dasboardcampanhas/DashboardCampanhasPage';
import TestPage from './pages/TestePage';
import PerfilPage from './pages/perfil/PerfilPage';
import DashCondominio from './pages/dashcondominio/DashCondominioPage';


const App = () => {
  return (
    <Router>
        <Layout>
      <Routes>

        <Route path="/" element={<LoginPage/>} />
        <Route path="/home" element={<HomePage/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/dashboard-campanhas" element={<DashboardCampanhas/>} />
        <Route path="/dashboard/cadastro-produtos" element={<ProdutoCadastro />} />
        <Route path="/dashboard/cadastro-produto-unitario" element={<ProdutoUnitarioCadastro />} />
        <Route path="/dashboard/cadastro-cestas" element={<CestaCadastro />} />
        <Route path="/perfil" element={<PerfilPage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/dashboard/dash-condominio" element={<DashCondominio />} />

        <Route path="*" element={<NotFoundPage/>} />
      </Routes>
        </Layout>
    </Router>
  );
};

export default App;
