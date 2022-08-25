import React, { useState } from 'react';

import ProfilePicture from '../components/UI/ProfilePicture';

import { userData } from '../utils/dummy-todos';

const Profile = () => {
  const inputForm = [
    {
      label: 'Username',
      type: 'text',
      data: userData.username,
    },
    {
      label: 'Email Address',
      type: 'email',
      data: userData.email,
    },
    {
      label: 'Password',
      type: 'password',
      data: userData.password,
    },
  ];

  const [profileData, setProfileData] = useState({
    username: userData.text,
    email: userData.email,
    password: userData.password,
  });
  const [editForm, setEditForm] = useState(false);

  const userNameChangeHandler = (event) => {
    setProfileData((prevState) => {
      return { ...prevState, username: event.target.value };
    });
  };

  const emailChangeHandler = (event) => {
    setProfileData((prevState) => {
      return { ...prevState, email: event.target.value };
    });
  };

  const passwordChangeHandler = (event) => {
    setProfileData((prevState) => {
      return { ...prevState, password: event.target.value };
    });
  };

  const cancelEditHandler = () => {
    setEditForm(false);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();

    if (!editForm) {
      setEditForm((prevState) => !prevState);
    }
  };

  return (
    <section className="mx-auto flex min-h-screen max-w-lg flex-col gap-y-6 py-6">
      <h1 className="font-bold">Profile</h1>
      <div className="flex flex-col items-center justify-center gap-y-3">
        <ProfilePicture classPhoto={'btn-lg'} />
        <span className="text-lg font-bold">@{userData.username}</span>
      </div>
      <form onSubmit={formSubmitHandler} className="flex flex-col gap-y-6">
        {inputForm.map((input, index) => {
          const newProfileData =
            index === 0
              ? profileData.username
              : index === 1
              ? profileData.email
              : index === 2
              ? profileData.password
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
                className={`border-b border-b-neutral-400 p-1 text-sm outline-none ${
                  editForm
                    ? 'text-neutral-900 focus:border-b-orange-100'
                    : 'text-neutral-500'
                }`}
                value={editForm ? newProfileData : input.data}
                readOnly={!editForm ? true : false}
                onChange={
                  index === 0
                    ? userNameChangeHandler
                    : index === 1
                    ? emailChangeHandler
                    : index === 2
                    ? passwordChangeHandler
                    : null
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
