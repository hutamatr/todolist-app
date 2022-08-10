import React from "react";
import { Outlet } from "react-router-dom";

import Navigation from "../Navigation/Navigation";
import FormModal from "../Dashboard/DashboardForm";

const Layout = () => {
  return (
    <>
      <header className="fixed top-0 w-full">
        <Navigation />
      </header>
      <main className="mx-auto mt-16 max-w-5xl px-4">
        <Outlet />
      </main>
      <FormModal />
    </>
  );
};

export default Layout;
