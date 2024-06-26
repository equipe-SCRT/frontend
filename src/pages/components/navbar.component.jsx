import React, { useState } from 'react';
import "../../styles/NavBar.component.css"
import imagemLogo from "../../assets/images/logo.png";


const NavBar = () => {
  document.body.style.paddingLeft = "280px";
  return (
    <header>
      
  {/* Sidebar */}
  <nav
    id="sidebarMenu"
    className="collapse d-lg-block sidebar collapse bg-green"
    style={{backgroundColor: "#306B34"}
  }
  >
    <div id='img' style={{
        width: "240px",
        height: "100px",
        display: 'flex',
        alignContent: "center",
        backgroundColor: "#306B34",
        padding: "20px"
      }}>
        <a className="navbar-brand" href="#">
            <img
              src={imagemLogo}
              height={100}
              alt="MDB Logo"
              loading="lazy"
              style={{padding: 15,
                position: "fixed"
              }}
            />
          </a>
      </div>
    <div className="position-sticky">
      <div className="list-group list-group-flush mx-3 mt-4" id='components'>
      
        <a
          href="#"
          id="link-nav"
          aria-current="true"
        >
          <i  className="fas fa-chart-area fa-fw me-3"/>
          <span>Gráficos</span>
        </a>
        <a
          href="#"
          id="link-nav"
        >
          <i className="fas fa-chart-area fa-fw me-3" />
          <span>Colaboradores</span>
        </a>
        <a
          href="#"
          id="link-nav"
        >
          <i className="fas fa-lock fa-fw me-3" />
          <span>Produtos</span>
        </a>
        <a
          href="#"
          id="link-nav"
        >
          <i className="fas fa-chart-line fa-fw me-3" />
          <span>Cesta</span>
        </a>
        <a
          href="#"
          id="link-nav"
        >
          <i className="fas fa-chart-pie fa-fw me-3" />
          <span>Condominios</span>
        </a>
        <a
          href="#"
          id="link-nav"
        >
          <i className="fas fa-chart-bar fa-fw me-3" />
          <span>Campanhas</span>
        </a>
        <a
          href="#"
          id="link-nav"
        >
          <i className="fas fa-globe fa-fw me-3" />
          <span>Indicadores</span>
        </a>
        <a
          href="#"
          id="link-nav"
        >
          <i className="fas fa-building fa-fw me-3" />
          <span>Relatórios</span>
        </a>
       
      </div>
    </div>
  </nav>
  {/* Sidebar */}
  {/* Navbar */}
  <nav
    id="main-navbar"
    className="navbar navbar-expand-lg navbar-light fixed-top"
  >
    {/* Container wrapper */}
    <div className="container-fluid">
      {/* Toggle button */}
      <button
        data-mdb-button-init=""
        className="navbar-toggler"
        type="button"
        data-mdb-collapse-init=""
        data-mdb-target="#sidebarMenu"
        aria-controls="sidebarMenu"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i className="fas fa-bars" />
      </button>
      {/* Brand */}
    
     

     
      {/* Right links */}
      <ul className="navbar-nav ms-auto d-flex flex-row">
        {/* Notification dropdown */}
        <li className="nav-item dropdown">
          <a
            data-mdb-dropdown-init=""
            className="nav-link me-3 me-lg-0 dropdown-toggle hidden-arrow"
            href="#"
            id="navbarDropdownMenuLink"
            role="button"
            data-mdb-toggle="dropdown"
            aria-expanded="false"
          >
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z"/></svg>
          </a>
          <ul
            className="dropdown-menu dropdown-menu-end"
            aria-labelledby="navbarDropdownMenuLink"
          >
            <li>
              <a className="dropdown-item" href="#">
                Some news
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Another news
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Something else here
              </a>
            </li>
          </ul>
        </li>
        {/* Icon */}
        <li className="nav-item">
          <a className="nav-link me-3 me-lg-0" href="#">
            <i className="fas fa-fill-drip" />
          </a>
        </li>
        {/* Icon */}
        <li className="nav-item me-3 me-lg-0">
          <a className="nav-link" href="#"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M478-240q21 0 35.5-14.5T528-290q0-21-14.5-35.5T478-340q-21 0-35.5 14.5T428-290q0 21 14.5 35.5T478-240Zm-36-154h74q0-33 7.5-52t42.5-52q26-26 41-49.5t15-56.5q0-56-41-86t-97-30q-57 0-92.5 30T342-618l66 26q5-18 22.5-39t53.5-21q32 0 48 17.5t16 38.5q0 20-12 37.5T506-526q-44 39-54 59t-10 73Zm38 314q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg> <i className="fab fa-github" />
          </a>
        </li>
        {/* Icon dropdown */}
        <li className="nav-item dropdown">
          <a
            data-mdb-dropdown-init=""
            className="nav-link me-3 me-lg-0 dropdown-toggle hidden-arrow"
            href="#"
            id="navbarDropdown"
            role="button"
            data-mdb-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="united kingdom flag m-0" />
          </a>
          <ul
            className="dropdown-menu dropdown-menu-end"
            aria-labelledby="navbarDropdown"
          >
            <li>
              <a className="dropdown-item" href="#">
                <i className="united kingdom flag" />
                English
                <i className="fa fa-check text-success ms-2" />
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <a className="dropdown-item" href="#">
                <i className="flag-poland flag" />
                Polski
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                <i className="flag-china flag" />
                中文
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                <i className="flag-japan flag" />
                日本語
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                <i className="flag-germany flag" />
                Deutsch
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                <i className="flag-france flag" />
                Français
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                <i className="flag-spain flag" />
                Español
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                <i className="flag-russia flag" />
                Русский
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                <i className="flag-portugal flag" />
                Português
              </a>
            </li>
          </ul>
        </li>
        {/* Avatar */}
        <li className="nav-item dropdown">
          <a
            data-mdb-dropdown-init=""
            className="nav-link dropdown-toggle hidden-arrow d-flex align-items-center"
            href="#"
            id="navbarDropdownMenuLink"
            role="button"
            data-mdb-toggle="dropdown"
            aria-expanded="false"
          >
<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"/></svg>          </a>
          <ul
            className="dropdown-menu dropdown-menu-end"
            aria-labelledby="navbarDropdownMenuLink"
          >
            <li>
              <a className="dropdown-item" href="#">
                My profile
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Settings
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Logout
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    {/* Container wrapper */}
  </nav>
  {/* Navbar */}
</header>

  );
}

export default NavBar;
