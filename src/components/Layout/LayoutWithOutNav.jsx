import React from "react";
import { Outlet } from "react-router-dom";

import todoListImage from "../../assets/images/todo-list-image.webp";

const LayoutWithOutNav = () => {
  return (
    <main className="hero mx-auto max-w-5xl">
      <section className="hero-content flex-col gap-8 lg:flex-row-reverse">
        <img
          src={todoListImage}
          alt="TODO-LIST"
          className="max-w-[10rem] md:max-w-xs lg:max-w-full"
        />
        <Outlet />
      </section>
    </main>
  );
};

export default LayoutWithOutNav;
