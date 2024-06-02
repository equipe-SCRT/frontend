import React, { useState } from 'react';
import '../../assets/bootstrap/css/bootstrap.min.css';
import '../../styles/LoginPage.css';
import '../../styles/index.css';
import "../../styles/NavBar.css"
import "../../styles/NavBar.component.css"
import imagemLogo from "../../assets/images/logo.png";


const NavBar = () => {

  return (
    <header>
  {/* Sidebar */}
  <nav
    id="sidebarMenu"
    className="collapse d-lg-block sidebar collapse bg-green"
    style={{backgroundColor: "#306B34"}
  }
  >
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
    
      <a className="navbar-brand" href="#">
          <img
            src={imagemLogo}
            height={100}
            alt="MDB Logo"
            loading="lazy"
            style={{padding: 15}}
          />
        </a>

     
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
            <i className="fas fa-bell" />
            <span className="badge rounded-pill badge-notification bg-danger">
              1
            </span>
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
          <a className="nav-link" href="#">
            <i className="fab fa-github" />
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
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img (31).webp"
              className="rounded-circle"
              height={22}
              alt="Avatar"
              loading="lazy"
            />
          </a>
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
