import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { CgMenuRight, CgClose } from 'react-icons/cg';

import ProfilePicture from './ProfilePicture';
import useAuth from '../../hooks/useAuth';

import todoIcon from '../../assets/images/todo-list-icon.webp';

const Navigation = () => {
  const [viewMenu, setMenuView] = useState(false);

  const { isAuthenticated } = useAuth();

  const menuIsActive = ({ isActive }) =>
    isActive ? 'rounded p-1 text-custom-orange ring-2 ring-custom-green' : '';

  const menuViewHandler = () => setMenuView((prevState) => !prevState);

  return (
    <nav className="bg-custom-white relative mx-auto flex max-w-5xl flex-row items-center justify-between p-4 sm:static">
      <Link to={'/'} replace={true} className="flex items-center gap-x-3">
        <img src={todoIcon} alt="" className="w-10" />
        <h1>todo-list.</h1>
      </Link>
      <div className="flex flex-row gap-x-6">
        {/* <ProfilePicture classSection={'block sm:hidden'} /> */}
        <button className="sm:hidden" onClick={menuViewHandler}>
          {viewMenu ? (
            <CgClose className="text-xl" />
          ) : (
            <CgMenuRight className="text-xl" />
          )}
        </button>
      </div>
      <ul
        className={`bg-custom-white absolute top-16 flex h-[calc(100vh-3rem)] w-full flex-col items-center justify-center gap-y-4 text-center duration-500 sm:static sm:top-0 sm:h-0 sm:w-auto sm:translate-x-0 sm:flex-row sm:gap-x-8 sm:bg-transparent sm:py-0 ${
          viewMenu ? 'left-0' : 'translate-x-full'
        }`}
      >
        {isAuthenticated && (
          <li>
            <NavLink to={'dashboard'} className={menuIsActive}>
              Dashboard
            </NavLink>
          </li>
        )}
        {isAuthenticated && (
          <li>
            <NavLink to={'category'} className={menuIsActive}>
              Category
            </NavLink>
          </li>
        )}
        <ProfilePicture classSection={'hidden sm:block'} />
      </ul>
    </nav>
  );
};

export default Navigation;
