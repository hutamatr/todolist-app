import React from 'react';
import { Link } from 'react-router-dom';

const ProfilePicture = ({ classSection }) => {
  return (
    <section className={`dropdown dropdown-end ${classSection}`}>
      <label tabIndex="0" className="avatar btn-ghost btn-sm btn-circle">
        <Link to={'profile'}>
          <img
            src="https://placeimg.com/80/80/people"
            alt=""
            className="w-10 rounded-full"
          />
        </Link>
      </label>
    </section>
  );
};

export default ProfilePicture;
