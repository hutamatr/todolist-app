import React from 'react';

import { ReactComponent as Spinner } from '../../../assets/icons/uil_spinner-alt.svg';
import { ReactComponent as Check } from '../../../assets/icons/uil_check.svg';
import { ReactComponent as Stopwatch } from '../../../assets/icons/uil_stopwatch.svg';

import { useFilter } from '../../../hooks/useStoreContext';

const DashboardFilter = () => {
  const { isTodoInProgress, isTodoCompleted, inProgress, completed } =
    useFilter();

  const viewTodosCompletedHandler = () => {
    inProgress((prevState) => !prevState);
  };

  const viewTodosNotCompletedHandler = () => {
    completed((prevState) => !prevState);
  };

  return (
    <section className="flex gap-x-1">
      <button
        className={`flex items-center justify-center gap-x-1 rounded-md p-1 text-xs disabled:cursor-not-allowed ${
          isTodoInProgress ? 'bg-neutral-300' : 'bg-blue-10'
        }`}
        onClick={viewTodosCompletedHandler}
        disabled={isTodoCompleted ? true : false}
      >
        <Spinner className="w-3" fill="#6599FE" />
        <span
          className={`${
            isTodoInProgress ? 'text-neutral-500' : 'text-blue-100'
          }`}
        >
          In Progress
        </span>
      </button>
      <button
        className={`flex items-center justify-center gap-x-1 rounded-md p-1 text-xs disabled:cursor-not-allowed ${
          isTodoCompleted ? 'bg-neutral-300' : 'bg-green-10'
        }`}
        onClick={viewTodosNotCompletedHandler}
        disabled={isTodoInProgress ? true : false}
      >
        <Check className="w-3" fill="#5BE26A" />
        <span
          className={`${
            isTodoCompleted ? 'text-neutral-500' : 'text-green-100'
          }`}
        >
          Done
        </span>
      </button>
      <button className="flex items-center justify-center gap-x-1 rounded-md bg-red-10 p-1 text-xs">
        <Stopwatch className="w-3" fill="#FE6565" />
        <span className="text-red-100">Overtime</span>
      </button>
    </section>
  );
};

export default DashboardFilter;
