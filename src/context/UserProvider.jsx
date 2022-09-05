import React, { useState, useCallback } from 'react';

import { UserContext } from './Context';

const UserProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState({
    username: '',
    email: '',
    image: '',
  });

  const getUserDetailsHandler = useCallback((user) => {
    setUserDetails({
      username: user.username,
      email: user.email,
      image: user.image,
    });
  }, []);

  const value = {
    username: userDetails.username,
    email: userDetails.email,
    image: userDetails.image,
    getUserDetails: getUserDetailsHandler,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
