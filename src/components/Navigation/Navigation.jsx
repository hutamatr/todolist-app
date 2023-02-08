import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import ThemeSwitcher from './ThemeSwitcher';
import ProfilePicture from 'components/UI/ProfilePicture';
import { useAuth } from 'hooks/useStoreContext';

import { MdMenu, MdClose } from 'react-icons/md';
const todoIcon = 'https://0ms.run/mirrors/i.ibb.co/SsBT67b/todo-list-icon.webp';

const Navigation = () => {
  const [viewMenu, setMenuView] = useState(false);
  const { logout } = useAuth();

  const menuIsActive = ({ isActive }) =>
    isActive ? 'border-b-2 border-b-orange-100' : '';

  const menuViewHandler = () => setMenuView((prevState) => !prevState);

  const logoutHandler = () => {
    logout();
    setTimeout(() => {
      toast.success('Logout Successfully');
    }, 500);
  };

  return (
    <nav className="layout relative z-[9999] mx-auto flex flex-row items-center justify-between bg-material-green p-2 dark:bg-neutral-700 sm:static">
      <Link to="/" replace={true} className="flex items-center gap-x-3">
        <img src={todoIcon} alt="" className="w-10" loading="lazy" />
      </Link>
      <div className="flex flex-row gap-x-6">
        <ThemeSwitcher className="sm:hidden" />
        <button className="sm:hidden" onClick={menuViewHandler}>
          {viewMenu ? (
            <MdClose className="text-2xl dark:text-material-green" />
          ) : (
            <MdMenu className="text-2xl dark:text-material-green" />
          )}
        </button>
      </div>
      <ul
        className={`absolute top-16 flex w-[50vw] flex-col items-center justify-center gap-y-4 rounded-md bg-material-green p-4 text-center text-sm font-semibold text-neutral-600 shadow-material-shadow duration-500 dark:bg-neutral-700 dark:text-material-green sm:static sm:top-0 sm:h-0 sm:w-auto sm:translate-x-0 sm:flex-row sm:items-center sm:gap-x-8 sm:bg-transparent sm:p-0 sm:py-0 sm:shadow-none ${
          viewMenu ? 'right-0' : '-right-full'
        }`}
      >
        <ProfilePicture
          classPhoto="btn-sm block sm:hidden"
          classAvatar="w-10"
        />
        <li>
          <NavLink to="home" className={menuIsActive} onClick={menuViewHandler}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="dashboard"
            className={menuIsActive}
            onClick={menuViewHandler}
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="category"
            className={menuIsActive}
            onClick={menuViewHandler}
          >
            Category
          </NavLink>
        </li>
        <li className="block sm:hidden">
          <NavLink
            to="profile"
            className={menuIsActive}
            onClick={menuViewHandler}
          >
            Profile
          </NavLink>
        </li>
        <li className="block sm:hidden">
          <NavLink
            to="login"
            replace
            onClick={logoutHandler}
            className="text-red-100"
          >
            Logout
          </NavLink>
        </li>
        {/* eslint-disable-next-line prettier/prettier */}
        <div className="dropdown dropdown-end">
          <ProfilePicture
            classPhoto="btn-sm hidden sm:block cursor-pointer"
            tabIndex={0}
            classAvatar="w-10"
          />
          <ul
            tabIndex={0}
            className="dropdown-content menu menu-compact mt-3 w-52 rounded-md bg-base-100 p-2 shadow-lg dark:bg-neutral-700"
          >
            <li>
              <NavLink to="profile">Profile</NavLink>
            </li>
            <li>
              <NavLink
                to="login"
                replace
                onClick={logoutHandler}
                className="text-red-100"
              >
                Logout
              </NavLink>
            </li>
          </ul>
        </div>
        <ThemeSwitcher className="hidden sm:block" />
      </ul>
    </nav>
  );
};

export default Navigation;
