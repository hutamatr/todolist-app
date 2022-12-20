import React, { useState, useEffect } from 'react';

import ProfilePicture from '../components/UI/ProfilePicture';
import { useUser, useAuth } from '../hooks/useStoreContext';
import useAxios from '../hooks/useAxios';
import useInputState from '../hooks/useInputState';

const Profile = () => {
  const {
    username: prevUsername,
    email: prevEmail,
    getUserDetails,
  } = useUser();
  const { authToken } = useAuth();
  const { requestHttp } = useAxios();

  const { input, setInput, onChangeInputHandler } = useInputState({
    username: '',
    email: '',
    password: '',
  });

  const { username, email, password } = input;

  // const [profileData, setProfileData] = useState({
  //   username: '',
  //   email: '',
  //   password: '',
  // });
  const [editForm, setEditForm] = useState(false);

  useEffect(() => {
    setInput((prevState) => {
      return {
        ...prevState,
        username: prevUsername,
        email: prevEmail,
      };
    });

    requestHttp(
      {
        method: 'GET',
        url: '/accounts/profile',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
      (data) => {
        getUserDetails(data.data?.user);
      }
    );
  }, [
    requestHttp,
    authToken,
    getUserDetails,
    prevEmail,
    prevUsername,
    setInput,
  ]);

  const inputForm = [
    {
      label: 'Username',
      type: 'text',
      name: 'username',
    },
    {
      label: 'Email Address',
      type: 'email',
      name: 'email',
    },
    {
      label: 'Password',
      type: 'password',
      name: 'password',
    },
  ];

  // const userNameChangeHandler = (event) => {
  //   setInput((prevState) => {
  //     return { ...prevState, username: event.target.value };
  //   });
  // };

  // const emailChangeHandler = (event) => {
  //   setInput((prevState) => {
  //     return { ...prevState, email: event.target.value };
  //   });
  // };

  // const passwordChangeHandler = (event) => {
  //   setInput((prevState) => {
  //     return { ...prevState, password: event.target.value };
  //   });
  // };

  const cancelEditHandler = () => {
    setEditForm(false);
    setInput((prevState) => {
      return {
        ...prevState,
        username: prevUsername,
        email: prevEmail,
      };
    });
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();

    if (!editForm) {
      setEditForm((prevState) => !prevState);
    }

    if (editForm) {
      const updatedProfile = {
        username,
        email,
      };

      requestHttp({
        method: 'PUT',
        url: '/accounts/profile',
        dataRequest: updatedProfile,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
    }
  };

  return (
    <section className="mx-auto flex min-h-screen max-w-lg flex-col gap-y-6 py-6">
      <h1 className="font-bold">Profile</h1>
      <div className="flex flex-col items-center justify-center gap-y-3">
        <ProfilePicture />
        <span className="text-lg font-bold">@{prevUsername}</span>
      </div>
      <form onSubmit={formSubmitHandler} className="flex flex-col gap-y-6">
        {inputForm.map((input, index) => {
          const newProfileData =
            index === 0
              ? username
              : index === 1
              ? email
              : index === 2
              ? password
              : null;

          return (
            <div key={index} className="flex flex-col gap-y-1">
              <label
                htmlFor={input.type}
                className="text-xs font-medium text-neutral-600"
              >
                {input.label}
              </label>
              <input
                type={input.type}
                name={input.name}
                className={`border-b border-b-neutral-400 p-1 text-sm outline-none ${
                  editForm
                    ? 'text-neutral-900 focus:border-b-orange-100'
                    : 'text-neutral-500'
                }`}
                value={newProfileData}
                readOnly={!editForm ? true : false}
                onChange={
                  onChangeInputHandler
                  // index === 0
                  //   ? userNameChangeHandler
                  //   : index === 1
                  //   ? emailChangeHandler
                  //   : index === 2
                  //   ? passwordChangeHandler
                  //   : null
                }
              />
            </div>
          );
        })}
        <button className="block cursor-pointer rounded bg-orange-100 p-3 text-xs font-semibold text-white disabled:bg-orange-50">
          {editForm ? 'Save Profile' : 'Edit Profile'}
        </button>
        <button
          type="button"
          className="block cursor-pointer rounded p-2 text-xs font-semibold text-orange-100 disabled:bg-orange-50"
          onClick={cancelEditHandler}
        >
          Cancel
        </button>
      </form>
    </section>
  );
};

export default Profile;
