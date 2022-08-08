import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <main
        style={{ padding: "0 1.5rem", maxWidth: "68rem", margin: "0 auto" }}
      >
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
