import React, { useState } from 'react';

import { ReactComponent as Spinner } from '../../../assets/icons/uil_spinner-alt.svg';
import { ReactComponent as Check } from '../../../assets/icons/uil_check.svg';
import { ReactComponent as Stopwatch } from '../../../assets/icons/uil_stopwatch.svg';

import DashboardSort from './DashboardSort';

const DashboardFilter = () => {
  const [isTodoInprogress, setIsTodoInProgress] = useState(false);
  const [isTodoCompleted, setIsTodoCompleted] = useState(false);

  const viewTodosCompletedHandler = () => {
    setIsTodoInProgress((prevState) => !prevState);
  };

  const viewTodosNotCompletedHandler = () => {
    setIsTodoCompleted((prevState) => !prevState);
  };

  return (
    <section className="flex items-center justify-between">
      <div className="flex gap-x-1">
        <button
          className={`flex items-center justify-center gap-x-1 rounded-md p-1 text-xs ${
            isTodoInprogress ? 'bg-neutral-300' : 'bg-blue-10'
          }`}
          onClick={viewTodosCompletedHandler}
        >
          <Spinner className="w-3" fill="#6599FE" />
          <span
            className={`${
              isTodoInprogress ? 'text-neutral-500' : 'text-blue-100'
            }`}
          >
            In Progress
          </span>
        </button>
        <button
          className={`flex items-center justify-center gap-x-1 rounded-md p-1 text-xs ${
            isTodoCompleted ? 'bg-neutral-300' : 'bg-green-10'
          }`}
          onClick={viewTodosNotCompletedHandler}
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
        <button
          className="flex items-center justify-center gap-x-1 rounded-md bg-red-10 p-1 text-xs"
          onClick={viewTodosCompletedHandler}
        >
          <Stopwatch className="w-3" fill="#FE6565" />
          <span className="text-red-100">Overtime</span>
        </button>
      </div>
      <DashboardSort />
    </section>
  );
};

export default DashboardFilter;
