import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';

import ProfilePicture from '@components/UI/ProfilePicture';

import useBaffle from '@hooks/useBaffle';
import useHttp from '@hooks/useHttp';
import useInputState from '@hooks/useInputState';
import errorQuery from '@utils/errorQuery';

const Profile = () => {
  const [editForm, setEditForm] = useState(false);
  const { input, setInput, onChangeInputHandler } = useInputState({
    username: '',
    email: '',
    password: '',
  });

  const queryClient = useQueryClient();
  const { requestHttp } = useHttp();
  const { newBaffle } = useBaffle('.profileBaffle');

  useEffect(() => {
    newBaffle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { username, email, password } = input;

  const { data: dataUserDetail } = useQuery({
    queryKey: ['user'],
    queryFn: () => {
      return requestHttp({
        method: 'GET',
        url: '/accounts/profile',
      });
    },
    onSuccess: (data) => {
      setInput((prevState) => ({
        ...prevState,
        username: data?.data.data.user.username,
        email: data?.data.data.user.email,
      }));
    },
    onError: (error) => {
      errorQuery(error, 'Get User Detail Failed!');
    },
  });

  const { mutate: mutateEditUser } = useMutation({
    mutationFn: (updatedProfile) => {
      return requestHttp({
        method: 'PUT',
        url: '/accounts/profile',
        data: updatedProfile,
      });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      toast.success(data?.data.message);
    },
    onError: (error) => {
      errorQuery(error, 'Edit User Failed!');
    },
  });

  const usernameProfile = dataUserDetail?.data.data.user.username;

  let inputForm = [
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
  if (editForm) {
    inputForm = [
      ...inputForm,
      {
        label: 'Confirm Password',
        type: 'password',
        name: 'password',
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
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 1500,
        }}
      />
      <section className="mx-auto flex min-h-screen max-w-lg flex-col gap-y-6 px-5 py-6 pt-20">
        <h1 className="profileBaffle text-lg font-bold dark:text-material-green">
          Profile
        </h1>
        <div className="flex flex-col items-center justify-center gap-y-3">
          <ProfilePicture />
          <span className="text-lg font-bold dark:text-material-green">
            @{usernameProfile}
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
                  className="text-xs font-medium text-neutral-600 dark:text-material-green"
                >
                  {input.label}
                </label>
                <input
                  id={input.label}
                  type={input.type}
                  name={input.name}
                  className={`border-b border-b-neutral-500 bg-material-background p-1 text-sm outline-none dark:bg-neutral-800 ${
                    editForm
                      ? 'text-neutral-900 focus:border-b-orange-100 dark:text-material-green'
                      : 'text-neutral-500 dark:text-slate-400'
                  }`}
                  value={newProfileData}
                  readOnly={!editForm}
                  onChange={onChangeInputHandler}
                  required
                />
              </div>
            );
          })}
          <button className="block cursor-pointer rounded bg-orange-100 p-3 text-xs font-semibold text-material-green disabled:bg-orange-50">
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
