import React from 'react';
import { Link } from 'react-router-dom';

const ProfilePicture = ({ classSection, classPhoto }) => {
  return (
    <section
      className={`avatar btn btn-ghost btn-circle static ${classPhoto} ${classSection}`}
    >
      <Link to={'profile'}>
        <img
          src="https://placeimg.com/80/80/people"
          alt=""
          className="w-10 rounded-full"
        />
      </Link>
    </section>
  );
};

export default ProfilePicture;
