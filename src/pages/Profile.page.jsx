import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { toast, Toaster } from 'react-hot-toast';

import ProfilePicture from '../components/UI/ProfilePicture';
import useInputState from '../hooks/useInputState';
import useQueryTodos from '../hooks/useQueryTodos';
import useMutationTodos from '../hooks/useMutationTodos';

const Profile = () => {
  const [editForm, setEditForm] = useState(false);
  const { input, setInput, onChangeInputHandler } = useInputState({
    username: '',
    email: '',
    password: '',
  });

  const queryClient = useQueryClient();

  const { username, email, password } = input;

  const { data: dataUserDetail } = useQueryTodos(
    'user',
    {
      method: 'GET',
      url: '/accounts/profile',
    },
    (data) => {
      setInput((prevState) => ({
        ...prevState,
        username: data?.data.data.user.username,
        email: data?.data.data.user.email,
      }));
    },
    (error) => {
      toast.error(error);
    }
  );

  const { mutate: mutateEditUser } = useMutationTodos(
    {
      method: 'PUT',
      url: '/accounts/profile',
    },
    (data) => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      toast.success(data?.data.message);
    },
    (error) => {
      toast.error(error);
    }
  );

  let inputForm;
  if (editForm) {
    inputForm = [
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
        label: 'Confirm Password',
        type: 'password',
        name: 'password',
      },
    ];
  } else {
    inputForm = [
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
    ];
  }

  const cancelEditHandler = () => {
    setEditForm(false);
    setInput((prevState) => {
      return {
        ...prevState,
        username: dataUserDetail?.data.data.user.username,
        email: dataUserDetail?.data.data.user.email,
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
        password,
      };

      mutateEditUser(updatedProfile);

      setEditForm(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <section className="mx-auto flex min-h-screen max-w-lg flex-col gap-y-6 py-6">
        <h1 className="font-bold">Profile</h1>
        <div className="flex flex-col items-center justify-center gap-y-3">
          <ProfilePicture />
          <span className="text-lg font-bold">
            @{dataUserDetail?.data.data.user.username}
          </span>
        </div>
        <form onSubmit={formSubmitHandler} className="flex flex-col gap-y-6">
          {inputForm.map((input, index) => {
            let newProfileData;
            if (editForm) {
              newProfileData =
                index === 0
                  ? username
                  : index === 1
                  ? email
                  : index === 2
                  ? password
                  : '';
            } else {
              newProfileData =
                index === 0 ? username : index === 1 ? email : '';
            }

            return (
              <div key={index} className="flex flex-col gap-y-1">
                <label
                  htmlFor={input.label}
                  className="text-xs font-medium text-neutral-600"
                >
                  {input.label}
                </label>
                <input
                  id={input.label}
                  type={input.type}
                  name={input.name}
                  className={`border-b border-b-neutral-400 p-1 text-sm outline-none ${
                    editForm
                      ? 'text-neutral-900 focus:border-b-orange-100'
                      : 'text-neutral-500'
                  }`}
                  value={newProfileData}
                  readOnly={!editForm ? true : false}
                  onChange={onChangeInputHandler}
                  required
                />
              </div>
            );
          })}
          <button className="block cursor-pointer rounded bg-orange-100 p-3 text-xs font-semibold text-white disabled:bg-orange-50">
            {editForm ? 'Save Profile' : 'Edit Profile'}
          </button>
          {editForm && (
            <button
              type="button"
              className="block cursor-pointer rounded p-2 text-xs font-semibold text-orange-100 disabled:bg-orange-50"
              onClick={cancelEditHandler}
            >
              Cancel
            </button>
          )}
        </form>
      </section>
    </>
  );
};

export default Profile;
