import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { CgMenuRight, CgClose } from "react-icons/cg";

import todoIcon from "../../assets/images/to-do-list.png";

const Navigation = () => {
  const [viewMenu, setMenuView] = useState(false);

  const navMenu = [
    {
      href: "/",
      title: "Home",
    },
    {
      href: "/dashboard",
      title: "Dashboard",
    },
    {
      href: "/category",
      title: "Category",
    },
    {
      href: "login",
      title: "Login",
    },
  ];

  const menuViewHandler = () => setMenuView((prevState) => !prevState);

  return (
    <nav className="flex flex-row items-center justify-between mx-auto p-4 relative sm:static max-w-5xl">
      <Link to={"/"} replace={true} className="flex gap-x-3 items-center">
        <img src={todoIcon} alt="" className="w-10" />
        <h1>todo-list.</h1>
      </Link>
      <button className="sm:hidden" onClick={menuViewHandler}>
        {viewMenu ? (
          <CgClose className="text-xl" />
        ) : (
          <CgMenuRight className="text-xl" />
        )}
      </button>
      <ul
        className={`flex flex-col sm:flex-row items-center sm:gap-x-8 gap-y-4 absolute sm:static top-16 sm:top-0 text-center w-full sm:w-auto duration-500 bg-custom-white sm:bg-transparent h-[calc(100vh-3rem)] sm:h-0 rounded-xl sm:translate-x-0 py-10 sm:py-0 ${
          viewMenu ? "left-0" : "translate-x-full"
        }`}
      >
        {navMenu.map((menu, index) => {
          const { href, title } = menu;
          return (
            <li key={index}>
              <NavLink
                to={href}
                className={({ isActive }) =>
                  isActive
                    ? "ring-2 ring-custom-green text-custom-orange p-1 rounded"
                    : ""
                }
              >
                {title}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navigation;
