import { Outlet, Navigate, useLocation } from 'react-router-dom';

import Navigation from 'components/Navigation/Navigation';

const Layout = () => {
  const { pathname } = useLocation();

  return (
    <>
      <header className="fixed top-0 z-10 w-full bg-material-green shadow-material-shadow-2">
        <Navigation />
      </header>
      <main className="mx-auto mt-16 min-h-screen max-w-5xl px-4">
        {pathname === '/' ? (
          <Navigate to="/home" state={{ from: pathname }} replace />
        ) : (
          <Outlet />
        )}
      </main>
    </>
  );
};

export default Layout;
