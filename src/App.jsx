import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VLibras from './components/vlibras/Vlibras';

import HomePage from './pages/home/HomePage';
import LoginPage from './pages/login/LoginPage';
import NotFoundPage from './pages/notfound/NotFoundPage';
import Layout from './components/layout/Layout';
import Register from './pages/RegisterPage';
import ProdutoUnitarioCadastro from "./pages/produtounitariocadastro/ProdutoUnitarioCadastroPage"
import CondominioCadastro from "./pages/condominiocadastro/CondominioCadastroPage"
import ProdutoCadastro from "./pages/produto/ProdutoCadastroPage"
import CestaCadastro from "./pages/cesta/CestaCadastroPage"
import DashboardCampanhas from './pages/dasboardcampanhas/DashboardCampanhasPage';
import TestPage from './pages/TestePage';
import ColaboradoresCadastro from './pages/colaboradores/ColaboradoresCadastroPage';
import TipoCestaCadastro from './pages/tipo-cesta/TipoCestaCadastroPage';
import PerfilPage from './pages/perfil/PerfilPage';
import DashCondominio from './pages/dashcondominio/DashCondominioPage';
import IndicadoresCadastro from './pages/indicadores/IndicadoresCadastroPage';
import CampanhaCadastroPage from './pages/campanhacadastro/CampanhaCadastroPage';


const App = () => {
  return (
    <Router>
        <Layout>
        <VLibras />
      <Routes>

        <Route path="/" element={<LoginPage/>} />
        <Route path="/home" element={<HomePage/>} />
        <Route path="/trocar-senha" element={<Register/>} />
        <Route path="/campanhas" element={<DashboardCampanhas/>} />
        <Route path="/produtos/cadastro" element={<ProdutoCadastro />} />
        <Route path="/produtos-unitarios/cadastro" element={<ProdutoUnitarioCadastro />} />
        <Route path="/voluntarios/cadastro" element={<ColaboradoresCadastro />} />
        <Route path="/tipos-cestas/cadastro" element={<TipoCestaCadastro />} />
        <Route path="/condominios/cadastro" element={<CondominioCadastro />} />
        <Route path="/campanhas/cadastro" element={<CampanhaCadastroPage />} />
        <Route path="/cestas/cadastro" element={<CestaCadastro />} />
        <Route path="/perfil" element={<PerfilPage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/condominio" element={<DashCondominio />} />
        <Route path="/indicadores/cadastro" element={<IndicadoresCadastro />} />
        

        <Route path="*" element={<NotFoundPage/>} />
      </Routes>
        </Layout>
    </Router>
  );
};

export default App;
