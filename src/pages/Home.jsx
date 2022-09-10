import React, { useEffect } from 'react';

import notice from '../assets/images/Notice.webp';

import ProfilePicture from '../components/UI/ProfilePicture';
import Alert from '../components/UI/Alert';
import filterIconName from '../utils/filterIconName';
import useAxios from '../hooks/useAxios';
import { useTodos, useAuth, useUser } from '../hooks/useStoreContext';

const Home = () => {
  const { todos, totalTodos, getAllTodo } = useTodos();
  const { authToken, loginSuccess, setLoginSuccess } = useAuth();
  const { getUserDetails, username } = useUser();
  const { requestHttp } = useAxios();

  useEffect(() => {
    requestHttp(
      {
        method: 'GET',
        url: '/todos',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      },
      (data) => {
        getAllTodo(data.data);
      }
    );
    requestHttp(
      {
        method: 'GET',
        url: '/accounts/profile',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      },
      (data) => {
        getUserDetails(data.data?.user);
      }
    );
  }, [authToken, requestHttp, getAllTodo, getUserDetails]);

  const todosInProgress = todos.filter((todo) => !todo.is_completed).length;
  const todosIsDone = todos.filter((todo) => todo.is_completed).length;

  return (
    <>
      {loginSuccess.isSuccess && (
        <Alert
          children={loginSuccess.successMessage}
          icons="success"
          className="alert-success"
          onSuccess={loginSuccess.isSuccess}
          onSetSuccess={setLoginSuccess}
        />
      )}
      <section className="flex min-h-screen flex-col gap-y-6 py-6">
        <div className="flex items-center justify-start gap-x-4">
          <ProfilePicture classPhoto={'btn'} classAvatar="w-12" />
          <div className="flex flex-col">
            <h1 className="font-bold">Hello, {username}!</h1>
            <p className="text-xs">what do you want to do today?</p>
          </div>
        </div>
        <div className="flex flex-col gap-y-4">
          <div className="flex max-w-full flex-col gap-y-3 rounded-md bg-purple-100 p-6">
            <img src={notice} alt="" className="max-w-[3rem]" loading="lazy" />
            <h2 className="text-xl font-semibold text-white">
              You have {totalTodos} list to do
            </h2>
          </div>
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {filterIconName.map((item, index) => {
              return (
                <li
                  className={`flex flex-col items-start justify-start gap-y-2 rounded-md p-4 ring-2 ${
                    index === 0
                      ? 'bg-blue-10 ring-blue-100'
                      : index === 1
                      ? 'bg-green-10 ring-green-100'
                      : index === 2
                      ? 'bg-red-10 ring-red-100'
                      : ''
                  }`}
                  key={index}
                >
                  <item.icon className="h-6 w-6" fill={item.color} />
                  <span
                    className={`text-base font-bold ${
                      index === 0
                        ? 'text-blue-100'
                        : index === 1
                        ? 'text-green-100'
                        : index === 2
                        ? 'text-red-100'
                        : ''
                    }`}
                  >
                    {item.name}
                  </span>
                  <span
                    className={`text-xs font-semibold ${
                      index === 0
                        ? 'text-blue-100'
                        : index === 1
                        ? 'text-green-100'
                        : index === 2
                        ? 'text-red-100'
                        : ''
                    }`}
                  >
                    {index === 0
                      ? todosInProgress
                      : index === 1
                      ? todosIsDone
                      : 0}{' '}
                    list todo
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
};

export default Home;
