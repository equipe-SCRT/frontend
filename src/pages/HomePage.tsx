import React from 'react';
import logo from '../assets/images/logo.svg';
import '../styles/HomePage.css';

const HomePage = ()=>{
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          homepage
        </p>
      </header>
    </div>
  );
}

export default HomePage;