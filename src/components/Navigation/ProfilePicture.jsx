import React from 'react';
import { NavLink } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';

const ProfilePicture = ({ classSection }) => {
  const { logout } = useAuth();

  const logoutHandler = () => logout();

  return (
    <section className={`dropdown dropdown-end ${classSection}`}>
      <label tabIndex="0" className="avatar btn btn-ghost btn-circle">
        <div className="w-10 rounded-full">
          <img src="https://placeimg.com/80/80/people" alt="" />
        </div>
      </label>
      <ul
        tabIndex="0"
        className="dropdown-content menu menu-compact mt-3 w-52 rounded-md bg-base-100 p-2 shadow-material-shadow"
      >
        <li>
          <NavLink to={'/'}>Profile</NavLink>
        </li>
        <li>
          <NavLink to={'/login'} replace onClick={logoutHandler}>
            Logout
          </NavLink>
        </li>
      </ul>
    </section>
  );
};

export default ProfilePicture;
