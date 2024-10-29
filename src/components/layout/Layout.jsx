// import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SideBarScrt from '../../components/sidebarscrt/SideBarScrt';
import HeaderScrt from '../../components/headerscrt/HeaderScrt';
import styles from './Layout.module.css'

const Layout = ({ children }) => {
  // const [loggedIn, setLoggedIn] = useState(true);
  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     setLoggedIn(true);
  //   } else {
  //     setLoggedIn(false);
  //     if (window.location.pathname !== '/') {
  //       window.location.href = '/';
  //     }
  //   }
  // }, []);

  // const handleLogout = () => {
  //   localStorage.removeItem('token');
  //   setLoggedIn(true);
  //   window.location.href = '/';
  // };

  let pageDesc;
  switch (useLocation().pathname) {
    case "/home":
      pageDesc = <p>Página destinada para informações <br/> pertinentes ao estoque de alimentos</p>;
      break;
    case "/produtos-unitarios/cadastro":
      pageDesc = <p>Página destinada ao cadastro de <br/> produtos individuais que serão <br/> colocados em uma cesta</p>;
      break;
    case "/condominios/cadastro":
      pageDesc = <p>Página destinada ao cadastro <br/> de condomínios</p>;
      break;
    case "/produtos/cadastro":
      pageDesc = <p>Página destinada ao cadastro de produtos que podem estar nas cestas</p>;
      break;
    case "/cestas/cadastro":
      pageDesc = <p>Página destinada para o cadastro das <br/> montagens de cestas</p>;
      break;
    case "/campanhas":
      pageDesc = <p>Página destinada para informações das <br/> campanhas cadastradas</p>;
      break
    case "/voluntarios/cadastro":
      pageDesc = <p>Página destinada ao cadastro e <br/> exclusão de voluntários</p>;
      break
    case "/tipos-cestas/cadastro":
      pageDesc = <p>Página destinada para o cadastro de <br/> tipo de cestas e o que cada uma delas <br/> irá conter</p>;
      break
    case "/perfil":
      pageDesc = <p>Página destinada à informações do usuário</p>;
      break
    case "/condominios":
      pageDesc = <p>Página destinada para informações <br/> referentes a condomínios cadastrados</p>;
      break
    case "/indicadores/cadastro":
      pageDesc = <p>Página destinada a alterações das regras de negócio</p>;
      break
    case "/campanhas/cadastro":
      pageDesc = <p>Página destinada ao cadastro <br/> de campanhas</p>;
      break
    case "/relatorios":
      pageDesc = <p>Página destinada ao download de <br/> relatórios e arquivos</p>;
      break
    default:
      pageDesc = <p>DESCRIÇÃO DA PÁGINA NÃO MAPEADA</p>;
      break;
  }


  return (
    <>
      {useLocation().pathname !== "/" && <>
        <SideBarScrt/>
        <HeaderScrt>
          {pageDesc}
        </HeaderScrt>
        <div className={styles.main}>
          {children}
        </div>
      </>}
      {
        useLocation().pathname === "/" &&
        <div>
          {children}
        </div>
      }
    </>
  );
};

export default Layout;