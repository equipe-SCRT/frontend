import React, { useState } from 'react';
import '../assets/bootstrap/css/bootstrap.min.css';
import '../styles/LoginPage.css';
import '../styles/index.css';
import loginImage from '../assets/images/login-image.jpeg';
import axios from 'axios';
import { Button } from '../assets/bootstrap/js/bootstrap.bundle';
import { useNavigate } from 'react-router-dom';

const ProdutoCadastro = () => {
  return (
    <div className="container-scroller">
    <nav className="navbar default-layout col-lg-12 col-12 p-0 fixed-top d-flex align-items-top flex-row">
      <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-start">
        <div className="me-3">
          <button
            className="navbar-toggler navbar-toggler align-self-center"
            type="button"
            data-bs-toggle="minimize"
          >
            <span className="icon-menu" />
          </button>
        </div>
        <div>
          <a
            className="navbar-brand brand-logo"
            href="https://demo.bootstrapdash.com/star-admin2-free/template/index.html"
          >
            <img src="./Star Admin2_files/logo.svg" alt="logo" />
          </a>
          <a
            className="navbar-brand brand-logo-mini"
            href="https://demo.bootstrapdash.com/star-admin2-free/template/index.html"
          >
            <img src="./Star Admin2_files/logo-mini.svg" alt="logo" />
          </a>
        </div>
      </div>
      <div className="navbar-menu-wrapper d-flex align-items-top">
        <ul className="navbar-nav">
          <li className="nav-item font-weight-semibold d-none d-lg-block ms-0">
            <h1 className="welcome-text">
              Good Morning, <span className="text-black fw-bold">John Doe</span>
            </h1>
            <h3 className="welcome-sub-text">
              Your performance summary this week{" "}
            </h3>
          </li>
        </ul>
        <ul className="navbar-nav ms-auto">
          <li className="nav-item dropdown d-none d-lg-block">
            <a
              className="nav-link dropdown-bordered dropdown-toggle dropdown-toggle-split"
              id="messageDropdown"
              href="https://demo.bootstrapdash.com/star-admin2-free/template/pages/tables/basic-table.html#"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {" "}
              Select Category{" "}
            </a>
            <div
              className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list pb-0"
              aria-labelledby="messageDropdown"
            >
              <a className="dropdown-item py-3">
                <p className="mb-0 font-weight-medium float-left">
                  Select category
                </p>
              </a>
              <div className="dropdown-divider" />
              <a className="dropdown-item preview-item">
                <div className="preview-item-content flex-grow py-2">
                  <p className="preview-subject ellipsis font-weight-medium text-dark">
                    Bootstrap Bundle{" "}
                  </p>
                  <p className="fw-light small-text mb-0">
                    This is a Bundle featuring 16 unique dashboards
                  </p>
                </div>
              </a>
              <a className="dropdown-item preview-item">
                <div className="preview-item-content flex-grow py-2">
                  <p className="preview-subject ellipsis font-weight-medium text-dark">
                    Angular Bundle
                  </p>
                  <p className="fw-light small-text mb-0">
                    Everything you’ll ever need for your Angular projects
                  </p>
                </div>
              </a>
              <a className="dropdown-item preview-item">
                <div className="preview-item-content flex-grow py-2">
                  <p className="preview-subject ellipsis font-weight-medium text-dark">
                    VUE Bundle
                  </p>
                  <p className="fw-light small-text mb-0">
                    Bundle of 6 Premium Vue Admin Dashboard
                  </p>
                </div>
              </a>
              <a className="dropdown-item preview-item">
                <div className="preview-item-content flex-grow py-2">
                  <p className="preview-subject ellipsis font-weight-medium text-dark">
                    React Bundle
                  </p>
                  <p className="fw-light small-text mb-0">
                    Bundle of 8 Premium React Admin Dashboard
                  </p>
                </div>
              </a>
            </div>
          </li>
          <li className="nav-item d-none d-lg-block">
            <div
              id="datepicker-popup"
              className="input-group date datepicker navbar-date-picker"
            >
              <span className="input-group-addon input-group-prepend border-right">
                <span className="icon-calendar input-group-text calendar-icon" />
              </span>
              <input type="text" className="form-control" />
            </div>
          </li>
          <li className="nav-item">
            <form
              className="search-form"
              action="https://demo.bootstrapdash.com/star-admin2-free/template/pages/tables/basic-table.html#"
            >
              <i className="icon-search" />
              <input
                type="search"
                className="form-control"
                placeholder="Search Here"
                title="Search here"
              />
            </form>
          </li>
          <li className="nav-item dropdown">
            <a
              className="nav-link count-indicator"
              id="notificationDropdown"
              href="https://demo.bootstrapdash.com/star-admin2-free/template/pages/tables/basic-table.html#"
              data-bs-toggle="dropdown"
            >
              <i className="icon-mail icon-lg" />
            </a>
            <div
              className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list pb-0"
              aria-labelledby="notificationDropdown"
            >
              <a className="dropdown-item py-3 border-bottom">
                <p className="mb-0 font-weight-medium float-left">
                  You have 4 new notifications{" "}
                </p>
                <span className="badge badge-pill badge-primary float-right">
                  View all
                </span>
              </a>
              <a className="dropdown-item preview-item py-3">
                <div className="preview-thumbnail">
                  <i className="mdi mdi-alert m-auto text-primary" />
                </div>
                <div className="preview-item-content">
                  <h6 className="preview-subject fw-normal text-dark mb-1">
                    Application Error
                  </h6>
                  <p className="fw-light small-text mb-0"> Just now </p>
                </div>
              </a>
              <a className="dropdown-item preview-item py-3">
                <div className="preview-thumbnail">
                  <i className="mdi mdi-settings m-auto text-primary" />
                </div>
                <div className="preview-item-content">
                  <h6 className="preview-subject fw-normal text-dark mb-1">
                    Settings
                  </h6>
                  <p className="fw-light small-text mb-0"> Private message </p>
                </div>
              </a>
              <a className="dropdown-item preview-item py-3">
                <div className="preview-thumbnail">
                  <i className="mdi mdi-airballoon m-auto text-primary" />
                </div>
                <div className="preview-item-content">
                  <h6 className="preview-subject fw-normal text-dark mb-1">
                    New user registration
                  </h6>
                  <p className="fw-light small-text mb-0"> 2 days ago </p>
                </div>
              </a>
            </div>
          </li>
          <li className="nav-item dropdown">
            <a
              className="nav-link count-indicator"
              id="countDropdown"
              href="https://demo.bootstrapdash.com/star-admin2-free/template/pages/tables/basic-table.html#"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="icon-bell" />
              <span className="count" />
            </a>
            <div
              className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list pb-0"
              aria-labelledby="countDropdown"
            >
              <a className="dropdown-item py-3">
                <p className="mb-0 font-weight-medium float-left">
                  You have 7 unread mails{" "}
                </p>
                <span className="badge badge-pill badge-primary float-right">
                  View all
                </span>
              </a>
              <div className="dropdown-divider" />
              <a className="dropdown-item preview-item">
                <div className="preview-thumbnail">
                  <img
                    src="./Star Admin2_files/face10.jpg"
                    alt="image"
                    className="img-sm profile-pic"
                  />
                </div>
                <div className="preview-item-content flex-grow py-2">
                  <p className="preview-subject ellipsis font-weight-medium text-dark">
                    Marian Garner{" "}
                  </p>
                  <p className="fw-light small-text mb-0">
                    {" "}
                    The meeting is cancelled{" "}
                  </p>
                </div>
              </a>
              <a className="dropdown-item preview-item">
                <div className="preview-thumbnail">
                  <img
                    src="./Star Admin2_files/face12.jpg"
                    alt="image"
                    className="img-sm profile-pic"
                  />
                </div>
                <div className="preview-item-content flex-grow py-2">
                  <p className="preview-subject ellipsis font-weight-medium text-dark">
                    David Grey{" "}
                  </p>
                  <p className="fw-light small-text mb-0">
                    {" "}
                    The meeting is cancelled{" "}
                  </p>
                </div>
              </a>
              <a className="dropdown-item preview-item">
                <div className="preview-thumbnail">
                  <img
                    src="./Star Admin2_files/face1.jpg"
                    alt="image"
                    className="img-sm profile-pic"
                  />
                </div>
                <div className="preview-item-content flex-grow py-2">
                  <p className="preview-subject ellipsis font-weight-medium text-dark">
                    Travis Jenkins{" "}
                  </p>
                  <p className="fw-light small-text mb-0">
                    {" "}
                    The meeting is cancelled{" "}
                  </p>
                </div>
              </a>
            </div>
          </li>
          <li className="nav-item dropdown d-none d-lg-block user-dropdown">
            <a
              className="nav-link"
              id="UserDropdown"
              href="https://demo.bootstrapdash.com/star-admin2-free/template/pages/tables/basic-table.html#"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                className="img-xs rounded-circle"
                src="./Star Admin2_files/face8.jpg"
                alt="Profile image"
              />{" "}
            </a>
            <div
              className="dropdown-menu dropdown-menu-right navbar-dropdown"
              aria-labelledby="UserDropdown"
            >
              <div className="dropdown-header text-center">
                <img
                  className="img-md rounded-circle"
                  src="./Star Admin2_files/face8.jpg"
                  alt="Profile image"
                />
                <p className="mb-1 mt-3 font-weight-semibold">Allen Moreno</p>
                <p className="fw-light text-muted mb-0">allenmoreno@gmail.com</p>
              </div>
              <a className="dropdown-item">
                <i className="dropdown-item-icon mdi mdi-account-outline text-primary me-2" />{" "}
                My Profile{" "}
                <span className="badge badge-pill badge-danger">1</span>
              </a>
              <a className="dropdown-item">
                <i className="dropdown-item-icon mdi mdi-message-text-outline text-primary me-2" />{" "}
                Messages
              </a>
              <a className="dropdown-item">
                <i className="dropdown-item-icon mdi mdi-calendar-check-outline text-primary me-2" />{" "}
                Activity
              </a>
              <a className="dropdown-item">
                <i className="dropdown-item-icon mdi mdi-help-circle-outline text-primary me-2" />{" "}
                FAQ
              </a>
              <a className="dropdown-item">
                <i className="dropdown-item-icon mdi mdi-power text-primary me-2" />
                Sign Out
              </a>
            </div>
          </li>
        </ul>
        <button
          className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
          type="button"
          data-bs-toggle="offcanvas"
        >
          <span className="mdi mdi-menu" />
        </button>
      </div>
    </nav>
    <div className="container-fluid page-body-wrapper">
      <div className="theme-setting-wrapper">
        <div id="settings-trigger">
          <i className="ti-settings" />
        </div>
        <div id="theme-settings" className="settings-panel">
          <i className="settings-close ti-close" />
          <p className="settings-heading">SIDEBAR SKINS</p>
          <div className="sidebar-bg-options selected" id="sidebar-light-theme">
            <div className="img-ss rounded-circle bg-light border me-3" />
            Light
          </div>
          <div className="sidebar-bg-options" id="sidebar-dark-theme">
            <div className="img-ss rounded-circle bg-dark border me-3" />
            Dark
          </div>
          <p className="settings-heading mt-2">HEADER SKINS</p>
          <div className="color-tiles mx-0 px-4">
            <div className="tiles success" />
            <div className="tiles warning" />
            <div className="tiles danger" />
            <div className="tiles info" />
            <div className="tiles dark" />
            <div className="tiles default" />
          </div>
        </div>
      </div>
      <div id="right-sidebar" className="settings-panel">
        <i className="settings-close ti-close" />
        <ul className="nav nav-tabs border-top" id="setting-panel" role="tablist">
          <li className="nav-item">
            <a
              className="nav-link active"
              id="todo-tab"
              data-bs-toggle="tab"
              href="https://demo.bootstrapdash.com/star-admin2-free/template/pages/tables/basic-table.html#todo-section"
              role="tab"
              aria-controls="todo-section"
              aria-expanded="true"
            >
              TO DO LIST
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              id="chats-tab"
              data-bs-toggle="tab"
              href="https://demo.bootstrapdash.com/star-admin2-free/template/pages/tables/basic-table.html#chats-section"
              role="tab"
              aria-controls="chats-section"
            >
              CHATS
            </a>
          </li>
        </ul>
        <div className="tab-content" id="setting-content">
          <div
            className="tab-pane fade show active scroll-wrapper ps"
            id="todo-section"
            role="tabpanel"
            aria-labelledby="todo-section"
          >
            <div className="add-items d-flex px-3 mb-0">
              <form className="form w-100">
                <div className="form-group d-flex">
                  <input
                    type="text"
                    className="form-control todo-list-input"
                    placeholder="Add To-do"
                  />
                  <button
                    type="submit"
                    className="add btn btn-primary todo-list-add-btn"
                    id="add-task"
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
            <div className="list-wrapper px-3">
              <ul className="d-flex flex-column-reverse todo-list">
                <li>
                  <div className="form-check">
                    <label className="form-check-label">
                      <input className="checkbox" type="checkbox" />
                      Team review meeting at 3.00 PM
                      <i className="input-helper" />
                    </label>
                  </div>
                  <i className="remove ti-close" />
                </li>
                <li>
                  <div className="form-check">
                    <label className="form-check-label">
                      <input className="checkbox" type="checkbox" />
                      Prepare for presentation
                      <i className="input-helper" />
                    </label>
                  </div>
                  <i className="remove ti-close" />
                </li>
                <li>
                  <div className="form-check">
                    <label className="form-check-label">
                      <input className="checkbox" type="checkbox" />
                      Resolve all the low priority tickets due today
                      <i className="input-helper" />
                    </label>
                  </div>
                  <i className="remove ti-close" />
                </li>
                <li className="completed">
                  <div className="form-check">
                    <label className="form-check-label">
                      <input
                        className="checkbox"
                        type="checkbox"
                        defaultChecked=""
                      />
                      Schedule meeting for next week
                      <i className="input-helper" />
                    </label>
                  </div>
                  <i className="remove ti-close" />
                </li>
                <li className="completed">
                  <div className="form-check">
                    <label className="form-check-label">
                      <input
                        className="checkbox"
                        type="checkbox"
                        defaultChecked=""
                      />
                      Project review
                      <i className="input-helper" />
                    </label>
                  </div>
                  <i className="remove ti-close" />
                </li>
              </ul>
            </div>
            <h4 className="px-3 text-muted mt-5 fw-light mb-0">Events</h4>
            <div className="events pt-4 px-3">
              <div className="wrapper d-flex mb-2">
                <i className="ti-control-record text-primary me-2" />
                <span>Feb 11 2018</span>
              </div>
              <p className="mb-0 font-weight-thin text-gray">
                Creating component page build a js
              </p>
              <p className="text-gray mb-0">The total number of sessions</p>
            </div>
            <div className="events pt-4 px-3">
              <div className="wrapper d-flex mb-2">
                <i className="ti-control-record text-primary me-2" />
                <span>Feb 7 2018</span>
              </div>
              <p className="mb-0 font-weight-thin text-gray">
                Meeting with Alisa
              </p>
              <p className="text-gray mb-0 ">Call Sarah Graves</p>
            </div>
            <div className="ps__rail-x" style={{ left: 0, bottom: 0 }}>
              <div
                className="ps__thumb-x"
                tabIndex={0}
                style={{ left: 0, width: 0 }}
              />
            </div>
            <div className="ps__rail-y" style={{ top: 0, right: 0 }}>
              <div
                className="ps__thumb-y"
                tabIndex={0}
                style={{ top: 0, height: 0 }}
              />
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="chats-section"
            role="tabpanel"
            aria-labelledby="chats-section"
          >
            <div className="d-flex align-items-center justify-content-between border-bottom">
              <p className="settings-heading border-top-0 mb-3 pl-3 pt-0 border-bottom-0 pb-0">
                Friends
              </p>
              <small className="settings-heading border-top-0 mb-3 pt-0 border-bottom-0 pb-0 pr-3 fw-normal">
                See All
              </small>
            </div>
            <ul className="chat-list">
              <li className="list active">
                <div className="profile">
                  <img src="./Star Admin2_files/face1.jpg" alt="image" />
                  <span className="online" />
                </div>
                <div className="info">
                  <p>Thomas Douglas</p>
                  <p>Available</p>
                </div>
                <small className="text-muted my-auto">19 min</small>
              </li>
              <li className="list">
                <div className="profile">
                  <img src="./Star Admin2_files/face2.jpg" alt="image" />
                  <span className="offline" />
                </div>
                <div className="info">
                  <div className="wrapper d-flex">
                    <p>Catherine</p>
                  </div>
                  <p>Away</p>
                </div>
                <div className="badge badge-success badge-pill my-auto mx-2">
                  4
                </div>
                <small className="text-muted my-auto">23 min</small>
              </li>
              <li className="list">
                <div className="profile">
                  <img src="./Star Admin2_files/face3.jpg" alt="image" />
                  <span className="online" />
                </div>
                <div className="info">
                  <p>Daniel Russell</p>
                  <p>Available</p>
                </div>
                <small className="text-muted my-auto">14 min</small>
              </li>
              <li className="list">
                <div className="profile">
                  <img src="./Star Admin2_files/face4.jpg" alt="image" />
                  <span className="offline" />
                </div>
                <div className="info">
                  <p>James Richardson</p>
                  <p>Away</p>
                </div>
                <small className="text-muted my-auto">2 min</small>
              </li>
              <li className="list">
                <div className="profile">
                  <img src="./Star Admin2_files/face5.jpg" alt="image" />
                  <span className="online" />
                </div>
                <div className="info">
                  <p>Madeline Kennedy</p>
                  <p>Available</p>
                </div>
                <small className="text-muted my-auto">5 min</small>
              </li>
              <li className="list">
                <div className="profile">
                  <img src="./Star Admin2_files/face6.jpg" alt="image" />
                  <span className="online" />
                </div>
                <div className="info">
                  <p>Sarah Graves</p>
                  <p>Available</p>
                </div>
                <small className="text-muted my-auto">47 min</small>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <ul className="nav">
          <li className="nav-item">
            <a
              className="nav-link"
              href="https://demo.bootstrapdash.com/star-admin2-free/template/index.html"
            >
              <i className="mdi mdi-grid-large menu-icon" />
              <span className="menu-title">Dashboard</span>
            </a>
          </li>
          <li className="nav-item nav-category">UI Elements</li>
          <li className="nav-item">
            <a
              className="nav-link"
              data-bs-toggle="collapse"
              href="https://demo.bootstrapdash.com/star-admin2-free/template/pages/tables/basic-table.html#ui-basic"
              aria-expanded="false"
              aria-controls="ui-basic"
            >
              <i className="menu-icon mdi mdi-floor-plan" />
              <span className="menu-title">UI Elements</span>
              <i className="menu-arrow" />
            </a>
            <div className="collapse" id="ui-basic">
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  {" "}
                  <a
                    className="nav-link"
                    href="https://demo.bootstrapdash.com/star-admin2-free/template/pages/ui-features/buttons.html"
                  >
                    Buttons
                  </a>
                </li>
                <li className="nav-item">
                  {" "}
                  <a
                    className="nav-link"
                    href="https://demo.bootstrapdash.com/star-admin2-free/template/pages/ui-features/dropdowns.html"
                  >
                    Dropdowns
                  </a>
                </li>
                <li className="nav-item">
                  {" "}
                  <a
                    className="nav-link"
                    href="https://demo.bootstrapdash.com/star-admin2-free/template/pages/ui-features/typography.html"
                  >
                    Typography
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li className="nav-item nav-category">Forms and Datas</li>
          <li className="nav-item">
            <a
              className="nav-link"
              data-bs-toggle="collapse"
              href="https://demo.bootstrapdash.com/star-admin2-free/template/pages/tables/basic-table.html#form-elements"
              aria-expanded="false"
              aria-controls="form-elements"
            >
              <i className="menu-icon mdi mdi-card-text-outline" />
              <span className="menu-title">Form elements</span>
              <i className="menu-arrow" />
            </a>
            <div className="collapse" id="form-elements">
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="https://demo.bootstrapdash.com/star-admin2-free/template/pages/forms/basic_elements.html"
                  >
                    Basic Elements
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              data-bs-toggle="collapse"
              href="https://demo.bootstrapdash.com/star-admin2-free/template/pages/tables/basic-table.html#charts"
              aria-expanded="false"
              aria-controls="charts"
            >
              <i className="menu-icon mdi mdi-chart-line" />
              <span className="menu-title">Charts</span>
              <i className="menu-arrow" />
            </a>
            <div className="collapse" id="charts">
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  {" "}
                  <a
                    className="nav-link"
                    href="https://demo.bootstrapdash.com/star-admin2-free/template/pages/charts/chartjs.html"
                  >
                    ChartJs
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li className="nav-item active">
            <a
              className="nav-link collapsed"
              data-bs-toggle="collapse"
              href="https://demo.bootstrapdash.com/star-admin2-free/template/pages/tables/basic-table.html#tables"
              aria-expanded="false"
              aria-controls="tables"
            >
              <i className="menu-icon mdi mdi-table" />
              <span className="menu-title">Tables</span>
              <i className="menu-arrow" />
            </a>
            <div className="collapse" id="tables" style={{}}>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  {" "}
                  <a
                    className="nav-link active"
                    href="https://demo.bootstrapdash.com/star-admin2-free/template/pages/tables/basic-table.html"
                  >
                    Basic table
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              data-bs-toggle="collapse"
              href="https://demo.bootstrapdash.com/star-admin2-free/template/pages/tables/basic-table.html#icons"
              aria-expanded="true"
              aria-controls="icons"
            >
              <i className="menu-icon mdi mdi-layers-outline" />
              <span className="menu-title">Icons</span>
              <i className="menu-arrow" />
            </a>
            <div className="collapse show" id="icons" style={{}}>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  {" "}
                  <a
                    className="nav-link"
                    href="https://demo.bootstrapdash.com/star-admin2-free/template/pages/icons/mdi.html"
                  >
                    Mdi icons
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li className="nav-item nav-category">pages</li>
          <li className="nav-item">
            <a
              className="nav-link"
              data-bs-toggle="collapse"
              href="https://demo.bootstrapdash.com/star-admin2-free/template/pages/tables/basic-table.html#auth"
              aria-expanded="false"
              aria-controls="auth"
            >
              <i className="menu-icon mdi mdi-account-circle-outline" />
              <span className="menu-title">User Pages</span>
              <i className="menu-arrow" />
            </a>
            <div className="collapse" id="auth">
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  {" "}
                  <a
                    className="nav-link"
                    href="https://demo.bootstrapdash.com/star-admin2-free/template/pages/samples/login.html"
                  >
                    {" "}
                    Login{" "}
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li className="nav-item nav-category">help</li>
          <li className="nav-item">
            <a
              className="nav-link"
              href="http://bootstrapdash.com/demo/star-admin2-free/docs/documentation.html"
            >
              <i className="menu-icon mdi mdi-file-document" />
              <span className="menu-title">Documentation</span>
            </a>
          </li>
        </ul>
      </nav>
      <div className="main-panel">
        <div className="content-wrapper">
          <div className="row">
            <div className="col-lg-6 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Basic Table</h4>
                  <p className="card-description">
                    Add class <code>.table</code>
                  </p>
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Profile</th>
                          <th>VatNo.</th>
                          <th>Created</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Jacob</td>
                          <td>53275531</td>
                          <td>12 May 2017</td>
                          <td>
                            <label className="badge badge-danger">Pending</label>
                          </td>
                        </tr>
                        <tr>
                          <td>Messsy</td>
                          <td>53275532</td>
                          <td>15 May 2017</td>
                          <td>
                            <label className="badge badge-warning">
                              In progress
                            </label>
                          </td>
                        </tr>
                        <tr>
                          <td>John</td>
                          <td>53275533</td>
                          <td>14 May 2017</td>
                          <td>
                            <label className="badge badge-info">Fixed</label>
                          </td>
                        </tr>
                        <tr>
                          <td>Peter</td>
                          <td>53275534</td>
                          <td>16 May 2017</td>
                          <td>
                            <label className="badge badge-success">
                              Completed
                            </label>
                          </td>
                        </tr>
                        <tr>
                          <td>Dave</td>
                          <td>53275535</td>
                          <td>20 May 2017</td>
                          <td>
                            <label className="badge badge-warning">
                              In progress
                            </label>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Hoverable Table</h4>
                  <p className="card-description">
                    Add class <code>.table-hover</code>
                  </p>
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>User</th>
                          <th>Product</th>
                          <th>Sale</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Jacob</td>
                          <td>Photoshop</td>
                          <td className="text-danger">
                            {" "}
                            28.76% <i className="ti-arrow-down" />
                          </td>
                          <td>
                            <label className="badge badge-danger">Pending</label>
                          </td>
                        </tr>
                        <tr>
                          <td>Messsy</td>
                          <td>Flash</td>
                          <td className="text-danger">
                            {" "}
                            21.06% <i className="ti-arrow-down" />
                          </td>
                          <td>
                            <label className="badge badge-warning">
                              In progress
                            </label>
                          </td>
                        </tr>
                        <tr>
                          <td>John</td>
                          <td>Premier</td>
                          <td className="text-danger">
                            {" "}
                            35.00% <i className="ti-arrow-down" />
                          </td>
                          <td>
                            <label className="badge badge-info">Fixed</label>
                          </td>
                        </tr>
                        <tr>
                          <td>Peter</td>
                          <td>After effects</td>
                          <td className="text-success">
                            {" "}
                            82.00% <i className="ti-arrow-up" />
                          </td>
                          <td>
                            <label className="badge badge-success">
                              Completed
                            </label>
                          </td>
                        </tr>
                        <tr>
                          <td>Dave</td>
                          <td>53275535</td>
                          <td className="text-success">
                            {" "}
                            98.05% <i className="ti-arrow-up" />
                          </td>
                          <td>
                            <label className="badge badge-warning">
                              In progress
                            </label>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Striped Table</h4>
                  <p className="card-description">
                    Add class <code>.table-striped</code>
                  </p>
                  <div className="table-responsive">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>User</th>
                          <th>First name</th>
                          <th>Progress</th>
                          <th>Amount</th>
                          <th>Deadline</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="py-1">
                            <img
                              src="./Star Admin2_files/face1.jpg"
                              alt="image"
                            />
                          </td>
                          <td>Herman Beck</td>
                          <td>
                            <div className="progress">
                              <div
                                className="progress-bar bg-success"
                                role="progressbar"
                                style={{ width: "25%" }}
                                aria-valuenow={25}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              />
                            </div>
                          </td>
                          <td>$ 77.99</td>
                          <td>May 15, 2015</td>
                        </tr>
                        <tr>
                          <td className="py-1">
                            <img
                              src="./Star Admin2_files/face2.jpg"
                              alt="image"
                            />
                          </td>
                          <td>Messsy Adam</td>
                          <td>
                            <div className="progress">
                              <div
                                className="progress-bar bg-danger"
                                role="progressbar"
                                style={{ width: "75%" }}
                                aria-valuenow={75}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              />
                            </div>
                          </td>
                          <td>$245.30</td>
                          <td>July 1, 2015</td>
                        </tr>
                        <tr>
                          <td className="py-1">
                            <img
                              src="./Star Admin2_files/face3.jpg"
                              alt="image"
                            />
                          </td>
                          <td>John Richards</td>
                          <td>
                            <div className="progress">
                              <div
                                className="progress-bar bg-warning"
                                role="progressbar"
                                style={{ width: "90%" }}
                                aria-valuenow={90}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              />
                            </div>
                          </td>
                          <td>$138.00</td>
                          <td>Apr 12, 2015</td>
                        </tr>
                        <tr>
                          <td className="py-1">
                            <img
                              src="./Star Admin2_files/face4.jpg"
                              alt="image"
                            />
                          </td>
                          <td>Peter Meggik</td>
                          <td>
                            <div className="progress">
                              <div
                                className="progress-bar bg-primary"
                                role="progressbar"
                                style={{ width: "50%" }}
                                aria-valuenow={50}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              />
                            </div>
                          </td>
                          <td>$ 77.99</td>
                          <td>May 15, 2015</td>
                        </tr>
                        <tr>
                          <td className="py-1">
                            <img
                              src="./Star Admin2_files/face5.jpg"
                              alt="image"
                            />
                          </td>
                          <td>Edward</td>
                          <td>
                            <div className="progress">
                              <div
                                className="progress-bar bg-danger"
                                role="progressbar"
                                style={{ width: "35%" }}
                                aria-valuenow={35}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              />
                            </div>
                          </td>
                          <td>$ 160.25</td>
                          <td>May 03, 2015</td>
                        </tr>
                        <tr>
                          <td className="py-1">
                            <img
                              src="./Star Admin2_files/face6.jpg"
                              alt="image"
                            />
                          </td>
                          <td>John Doe</td>
                          <td>
                            <div className="progress">
                              <div
                                className="progress-bar bg-info"
                                role="progressbar"
                                style={{ width: "65%" }}
                                aria-valuenow={65}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              />
                            </div>
                          </td>
                          <td>$ 123.21</td>
                          <td>April 05, 2015</td>
                        </tr>
                        <tr>
                          <td className="py-1">
                            <img
                              src="./Star Admin2_files/face7.jpg"
                              alt="image"
                            />
                          </td>
                          <td>Henry Tom</td>
                          <td>
                            <div className="progress">
                              <div
                                className="progress-bar bg-warning"
                                role="progressbar"
                                style={{ width: "20%" }}
                                aria-valuenow={20}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              />
                            </div>
                          </td>
                          <td>$ 150.00</td>
                          <td>June 16, 2015</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className="footer">
          <div className="d-sm-flex justify-content-center justify-content-sm-between">
            <span className="text-muted text-center text-sm-left d-block d-sm-inline-block">
              Premium{" "}
              <a href="https://www.bootstrapdash.com/" target="_blank">
                Bootstrap admin template
              </a>{" "}
              from BootstrapDash.
            </span>
            <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">
              Copyright © 2021. All rights reserved.
            </span>
          </div>
        </footer>
      </div>
    </div>
  </div>
  
 
  );
}

export default ProdutoCadastro;
