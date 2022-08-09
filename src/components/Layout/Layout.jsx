import React from "react";
import { Outlet } from "react-router-dom";

import Navigation from "../Navigation/Navigation";

const Layout = () => {
  return (
    <>
      <header className="fixed top-0 w-full">
        <Navigation />
      </header>
      <main className="mt-16 px-6 max-w-5xl mx-auto">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
