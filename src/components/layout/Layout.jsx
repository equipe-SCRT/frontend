import React, { useState, useEffect } from 'react';

const Layout = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
      if (window.location.pathname !== '/') {
        window.location.href = '/';
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    window.location.href = '/';
  };

  return (
      <>{children}</>
  );
};

export default Layout;
