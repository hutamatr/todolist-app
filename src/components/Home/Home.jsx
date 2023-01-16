import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import ProfilePicture from 'components/UI/ProfilePicture';
import filterIconName from 'utils/filterIconName';
import useBaffle from 'hooks/useBaffle.js';
import { useTodos } from 'hooks/useStoreContext';

import todoGif from 'assets/gif/checklist.gif';
import todoImage from 'assets/images/Consulting-bro.webp';

const Home = ({ username }) => {
  const { totalAllTodos } = useTodos();
  const { newBaffle } = useBaffle('.homeBaffle');

  useEffect(() => {
    newBaffle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { totalDone, totalInProgress, totalTodos } = totalAllTodos;

  return (
    <section className="flex min-h-screen flex-col gap-y-6 py-6">
      <div className="flex items-center justify-start gap-x-4">
        <Link to={'/profile'}>
          <ProfilePicture classPhoto={'btn'} classAvatar="w-12" />
        </Link>
        <div className="flex flex-col">
          <h1 className="font-bold">
            Hello, <span className="homeBaffle">{username}</span>
          </h1>
          <p className="text-xs">what do you want to do today?</p>
        </div>
      </div>
      <div className="flex flex-col gap-y-4">
        <div className="flex max-w-full flex-row items-center justify-between rounded-md bg-white p-6 shadow-material-shadow-3">
          <div className="flex flex-col gap-y-3">
            <img src={todoGif} alt="" className="max-w-[3rem]" loading="lazy" />
            <h2 className="font-semibold text-neutral-800 sm:text-xl">
              You have <span className="text-orange-100">{totalTodos}</span>{' '}
              list{' '}
              <span className="rounded-sm bg-orange-100 px-1 font-Poiret-One text-xl font-bold text-material-background sm:text-2xl">
                todo
              </span>
            </h2>
          </div>
          <img src={todoImage} alt="todo" className="w-40" />
        </div>
        <ul className="grid grid-cols-2 gap-4">
          {filterIconName.map((item, index) => {
            return (
              <li
                key={index}
                className={`flex flex-col-reverse items-center justify-between rounded-md p-4 shadow-material-shadow-3 sm:flex-row ${
                  index === 0 ? 'bg-blue-10' : index === 1 ? 'bg-green-10' : ''
                }`}
              >
                <div
                  className={`flex flex-col items-center justify-start gap-y-1 sm:items-start sm:gap-y-2`}
                >
                  <div className="flex flex-row items-center gap-x-2">
                    <item.icon className="h-6 w-6" fill={item.color} />
                    <span
                      className={`font-bold sm:text-lg ${
                        index === 0
                          ? 'text-blue-500'
                          : index === 1
                          ? 'text-green-500'
                          : ''
                      }`}
                    >
                      {item.name}
                    </span>
                  </div>
                  <p
                    className={`text font-semibold ${
                      index === 0
                        ? 'text-blue-500'
                        : index === 1
                        ? 'text-green-500'
                        : ''
                    }`}
                  >
                    <span
                      className={`${
                        index === 0
                          ? 'text-blue-700'
                          : index === 1
                          ? 'text-green-600'
                          : ''
                      }`}
                    >
                      {index === 0
                        ? totalInProgress
                        : index === 1
                        ? totalDone
                        : 0}
                    </span>{' '}
                    list todo
                  </p>
                </div>
                <img
                  src={item.image}
                  alt={item.name}
                  className="m-0 w-28 p-0 sm:w-36"
                />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Home;
