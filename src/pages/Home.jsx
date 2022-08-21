import React from 'react';

import notice from '../assets/images/Notice.webp';

import ProfilePicture from '../components/UI/ProfilePicture';
import filterIconName from '../utils/filterIconName';

const Home = () => {
  return (
    <section className="flex min-h-screen flex-col gap-y-6 py-6">
      <div className="flex items-center justify-start gap-x-4">
        <ProfilePicture classPhoto={'btn'} />
        <div className="flex flex-col">
          <h1 className="font-bold">Hello, John!</h1>
          <p className="text-xs">what do you want to do today?</p>
        </div>
      </div>
      <div className="flex flex-col gap-y-4">
        <div className="flex max-w-full flex-col gap-y-3 rounded-md bg-purple-100 p-6">
          <img src={notice} alt="" className="max-w-[3rem]" />
          <h2 className="text-xl font-semibold text-white">
            You have 7 list to do
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
              >
                <item.icon className="h-6 w-6" fill={item.color} />
                <span
                  className={`text-sm font-medium ${
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
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Home;
