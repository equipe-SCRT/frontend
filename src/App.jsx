import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VLibras from './components/vlibras/Vlibras';

import HomePage from './pages/home/HomePage';
import LoginPage from './pages/login/LoginPage';
import NotFoundPage from './pages/notfound/NotFoundPage';
import Layout from './components/layout/Layout';
import Register from './pages/recuperar-senha/RegisterPage';
import RegisterNewPasswordPage from './pages/recuperar-senha/RegisterNewPasswordPage';
import ProdutoUnitarioCadastro from "./pages/produtounitariocadastro/ProdutoUnitarioCadastroPage"
import CondominioCadastro from "./pages/condominiocadastro/CondominioCadastroPage"
import ProdutoCadastro from "./pages/produto/ProdutoCadastroPage"
import CestaCadastro from "./pages/cesta/CestaCadastroPage"
import DashboardCampanhas from './pages/dashboardcampanhas/DashboardCampanhasPage';
import TestPage from './pages/TestePage';
import VoluntariosCadastro from './pages/voluntarios/VoluntariosCadastroPage';
import TipoCestaCadastro from './pages/tipo-cesta/TipoCestaCadastroPage';
import PerfilPage from './pages/perfil/PerfilPage';
import DashCondominio from './pages/dashcondominio/DashCondominioPage';
import IndicadoresCadastro from './pages/indicadores/IndicadoresCadastroPage';
import CampanhaCadastroPage from './pages/campanhacadastro/CampanhaCadastroPage';
import RelatorioPage from './pages/relatorios/RelatorioPage';


const App = () => {
  return (
    <Router>
        <Layout>
        <VLibras />
      <Routes>

        <Route path="/" element={<LoginPage/>} />
        <Route path="/home" element={<HomePage/>} />
        <Route path="/redefinir-senha" element={<Register/>} />
        <Route path="/redefinir-senha-nova-senha" element={<RegisterNewPasswordPage/>} />
        <Route path="/campanhas" element={<DashboardCampanhas/>} />
        <Route path="/produtos/cadastro" element={<ProdutoCadastro />} />
        <Route path="/produtos-unitarios/cadastro" element={<ProdutoUnitarioCadastro />} />
        <Route path="/voluntarios/cadastro" element={<VoluntariosCadastro />} />
        <Route path="/tipos-cestas/cadastro" element={<TipoCestaCadastro />} />
        <Route path="/condominios/cadastro" element={<CondominioCadastro />} />
        <Route path="/campanhas/cadastro" element={<CampanhaCadastroPage />} />
        <Route path="/cestas/cadastro" element={<CestaCadastro />} />
        <Route path="/perfil" element={<PerfilPage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/condominios" element={<DashCondominio />} />
        <Route path="/indicadores/cadastro" element={<IndicadoresCadastro />} />
        <Route path="/relatorios" element={<RelatorioPage />} />

        <Route path="*" element={<NotFoundPage/>} />
      </Routes>
        </Layout>
    </Router>
  );
};

export default App;
