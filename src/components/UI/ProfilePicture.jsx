import React from 'react';
import { Link } from 'react-router-dom';

import { useUser } from '../../hooks/useStoreContext';

const ProfilePicture = ({ classPhoto, tabIndex }) => {
  const { image } = useUser();

  return (
    <section
      tabIndex={tabIndex}
      className={`avatar btn-circle btn-ghost static ${classPhoto}`}
    >
      <img
        src="https://placeimg.com/80/80/people"
        alt=""
        className="w-10 rounded-full"
        loading="lazy"
      />
    </section>
  );
};

export default ProfilePicture;
