import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';

import Navigation from '../Navigation/Navigation';

const Layout = () => {
  const location = useLocation().pathname;

  return (
    <>
      <header className="fixed top-0 w-full">
        <Navigation />
      </header>
      <main className="mx-auto mt-16 min-h-screen max-w-5xl px-4">
        {location === '/' ? (
          <Navigate to={'/dashboard'} state={{ from: location }} replace />
        ) : (
          <Outlet />
        )}
      </main>
    </>
  );
};

export default Layout;
