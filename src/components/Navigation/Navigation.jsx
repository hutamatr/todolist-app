import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

import { ReactComponent as Menu } from '../../assets/icons/uil_bars.svg';
import { ReactComponent as Close } from '../../assets/icons/uil_times.svg';

import todoIcon from '../../assets/images/todo-list-icon.webp';
import ProfilePicture from '../UI/ProfilePicture';
import { useAuth } from '../../hooks/useStoreContext';
import useAxios from '../../hooks/useAxios';

const Navigation = () => {
  const { requestHttp } = useAxios();
  const { logout, authToken } = useAuth();
  const [viewMenu, setMenuView] = useState(false);

  const menuIsActive = ({ isActive }) =>
    isActive ? 'border-b-2 border-b-orange-100' : '';

  const menuViewHandler = () => setMenuView((prevState) => !prevState);

  const logoutHandler = () => {
    // requestHttp({
    //   method: 'GET',
    //   url: '/accounts/logout',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${authToken}`,
    //   },
    // });
    logout({
      isSuccess: true,
      successMessage: 'Logout Successfully',
    });
  };

  return (
    <nav className="relative z-[9999] mx-auto flex max-w-5xl flex-row items-center justify-between bg-white p-4 sm:static">
      <Link to={'/'} replace={true} className="flex items-center gap-x-3">
        <img src={todoIcon} alt="" className="w-10" loading="lazy" />
      </Link>
      <div className="flex flex-row gap-x-6">
        <button className="sm:hidden" onClick={menuViewHandler}>
          {viewMenu ? (
            <Close className="h-6 w-6" fill="#44454A" />
          ) : (
            <Menu className="h-6 w-6" fill="#44454A" />
          )}
        </button>
      </div>
      <ul
        className={`absolute top-16 flex w-[35%] flex-col items-start justify-center gap-y-4 rounded-md bg-white p-4 text-center text-sm font-semibold text-neutral-500 shadow-md duration-500 sm:static sm:top-0 sm:h-0 sm:w-auto sm:translate-x-0 sm:flex-row sm:items-center sm:gap-x-8 sm:bg-transparent sm:py-0 sm:shadow-none ${
          viewMenu ? 'right-4' : '-right-full'
        }`}
      >
        <ProfilePicture
          classPhoto={'btn-sm block sm:hidden'}
          classAvatar="w-10"
        />
        <li>
          <NavLink
            to={'home'}
            className={menuIsActive}
            onClick={menuViewHandler}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to={'dashboard'}
            className={menuIsActive}
            onClick={menuViewHandler}
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to={'category'}
            className={menuIsActive}
            onClick={menuViewHandler}
          >
            Category
          </NavLink>
        </li>
        <li className="block sm:hidden">
          <NavLink
            to={'profile'}
            className={menuIsActive}
            onClick={menuViewHandler}
          >
            Profile
          </NavLink>
        </li>
        <li className="block sm:hidden">
          <NavLink
            to={'login'}
            replace
            onClick={logoutHandler}
            className="text-red-100"
          >
            Logout
          </NavLink>
        </li>
        <div className="dropdown-end dropdown">
          <ProfilePicture
            classPhoto={'btn-sm hidden sm:block cursor-pointer'}
            tabIndex={0}
            classAvatar="w-10"
          />
          <ul
            tabIndex={0}
            className="dropdown-content menu menu-compact mt-3 w-52 rounded-md bg-base-100 p-2 shadow-lg"
          >
            <li>
              <NavLink to={'profile'}>Profile</NavLink>
            </li>
            <li>
              <NavLink
                to={'login'}
                replace
                onClick={logoutHandler}
                className="text-red-100"
              >
                Logout
              </NavLink>
            </li>
          </ul>
        </div>
      </ul>
    </nav>
  );
};

export default Navigation;
