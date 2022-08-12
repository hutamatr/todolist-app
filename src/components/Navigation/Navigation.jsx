import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { CgMenuRight, CgClose } from "react-icons/cg";
import useAuth from "../../hooks/useAuth";

import todoIcon from "../../assets/images/to-do-list.png";

const Navigation = () => {
  const [viewMenu, setMenuView] = useState(false);

  const { isAuthenticated, logout } = useAuth();

  /*   const navMenu = [
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
  ]; */

  const menuIsActive = ({ isActive }) =>
    isActive ? "rounded p-1 text-custom-orange ring-2 ring-custom-green" : "";

  const menuViewHandler = () => setMenuView((prevState) => !prevState);

  const logoutHandler = () => logout();

  return (
    <nav className="relative mx-auto flex max-w-5xl flex-row items-center justify-between bg-custom-white p-4 sm:static">
      <Link to={"/"} replace={true} className="flex items-center gap-x-3">
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
        className={`absolute top-16 flex h-[calc(100vh-3rem)] w-full flex-col items-center gap-y-4 rounded-xl bg-custom-white py-10 text-center duration-500 sm:static sm:top-0 sm:h-0 sm:w-auto sm:translate-x-0 sm:flex-row sm:gap-x-8 sm:bg-transparent sm:py-0 ${
          viewMenu ? "left-0" : "translate-x-full"
        }`}
      >
        <li>
          <NavLink to={"/"} className={menuIsActive}>
            Home
          </NavLink>
        </li>
        {isAuthenticated && (
          <li>
            <NavLink to={"dashboard"} className={menuIsActive}>
              Dashboard
            </NavLink>
          </li>
        )}
        {isAuthenticated && (
          <li>
            <NavLink to={"category"} className={menuIsActive}>
              Category
            </NavLink>
          </li>
        )}
        {isAuthenticated ? (
          <li>
            <NavLink to={"/"} onClick={logoutHandler}>
              Logout
            </NavLink>
          </li>
        ) : (
          <li>
            <NavLink to={"login"} className={menuIsActive}>
              Login
            </NavLink>
          </li>
        )}

        {/* {navMenu.map((menu, index) => {
          return (
            <li key={index}>
              <NavLink
                to={menu.href}
                className={({ isActive }) =>
                  isActive
                    ? "rounded p-1 text-custom-orange ring-2 ring-custom-green"
                    : ""
                }
              >
                {menu.title}
              </NavLink>
            </li>
          );
        })} */}
      </ul>
    </nav>
  );
};

export default Navigation;
