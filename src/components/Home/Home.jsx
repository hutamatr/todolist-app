import React from 'react';

import ProfilePicture from '../UI/ProfilePicture';
import filterIconName from '../../utils/filterIconName';

import { useTodos } from '../../hooks/useStoreContext';

import notice from '../../assets/images/Notice.webp';

const Home = ({ username }) => {
  const { totalAllTodos } = useTodos();

  const { totalDone, totalInProgress, totalTodos } = totalAllTodos;

  return (
    <section className="flex min-h-screen flex-col gap-y-6 py-6">
      <div className="flex items-center justify-start gap-x-4">
        <ProfilePicture classPhoto={'btn'} classAvatar="w-12" />
        <div className="flex flex-col">
          <h1 className="font-bold">Hello, {username}!</h1>
          <p className="text-xs">what do you want to do today?</p>
        </div>
      </div>
      <div className="flex flex-col gap-y-4">
        <div className="flex max-w-full flex-col gap-y-3 rounded-md bg-purple-100 p-6 shadow-material-shadow">
          <img src={notice} alt="" className="max-w-[3rem]" loading="lazy" />
          <h2 className="text-xl font-semibold text-white">
            You have {totalTodos} list to do
          </h2>
        </div>
        <ul className="grid grid-cols-2 gap-4">
          {filterIconName.map((item, index) => {
            return (
              <li
                className={`flex flex-col items-start justify-start gap-y-2 rounded-md p-4 shadow-material-shadow ${
                  index === 0 ? 'bg-blue-10' : index === 1 ? 'bg-green-10' : ''
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
                      : ''
                  }`}
                >
                  {index === 0 ? totalInProgress : index === 1 ? totalDone : 0}{' '}
                  list todo
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Home;
