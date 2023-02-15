import { useContext, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { LoginFormContext } from 'context/Context';

import todoImageOne from 'assets/images/Todo-list-pana.webp';
import todoImageTwo from 'assets/images/task-login.webp';

const LayoutWithoutNav = () => {
  const { onLoginScreen } = useContext(LoginFormContext);

  useEffect(() => {}, [onLoginScreen]);

  const imageFunc = (image, description) => {
    return (
      <figure className="flex flex-col items-center justify-center gap-y-3">
        <img
          src={image}
          alt="TODO-LIST"
          className="max-w-[10rem] md:max-w-xs"
          loading="lazy"
        />
        <figcaption className="text-center text-xl font-bold text-neutral-600 dark:text-material-green md:text-lg">
          {description}
        </figcaption>
      </figure>
    );
  };

  const imageContent = onLoginScreen
    ? imageFunc(todoImageOne, 'Start manage your task like a magic 🪄')
    : imageFunc(
        todoImageTwo,
        'Never miss any precious ✨ moments by listing it'
      );

  return (
    <main className="mx-auto min-h-screen bg-neutral-100 bg-ellipse-image bg-contain bg-right-top bg-no-repeat dark:bg-neutral-800">
      <section className="fixed left-0 right-0 top-0 bottom-0 flex max-w-full flex-col items-center justify-center gap-y-4 p-6 lg:flex-row-reverse lg:gap-x-6">
        {imageContent}
        <Outlet />
      </section>
    </main>
  );
};

export default LayoutWithoutNav;
