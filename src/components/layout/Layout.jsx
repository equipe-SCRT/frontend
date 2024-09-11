import React, { useState, useEffect } from 'react';

const Layout = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(true);
      // if (window.location.pathname !== '/') {
      //   window.location.href = '/';
      // }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(true);
    window.location.href = '/';
  };

  return (
      <>{children}</>
  );
};

export default Layout;
