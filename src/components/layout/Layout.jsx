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
      pageDesc = <p >Essa página é destinada para <br /> centralizar e visualizar de forma <br /> clara e eficiente os dados de <br />estoque </p>;
      break;
    default:
      pageDesc = <p >DESCRICAO DA PAGINA NÃO MAPEADA</p>;
      break;
  }


  return (
    <>
      {useLocation().pathname !== "/" && <>
        <SideBarScrt />
        <HeaderScrt>
          {pageDesc}
        </HeaderScrt>
        <div className={styles.main}>
          {children}
        </div>
      </>}
      {
        useLocation().pathname === "/" &&
        <div >
          {children}
        </div>
      }
    </>
  );
};

export default Layout;
