import React from 'react';

import DashboardSort from './DashboardSort';

import { ReactComponent as Spinner } from '../../../assets/icons/uil_spinner-alt.svg';
import { ReactComponent as Check } from '../../../assets/icons/uil_check.svg';
import { ReactComponent as Stopwatch } from '../../../assets/icons/uil_stopwatch.svg';

const DashboardFilter = () => {
  return (
    <section className="flex items-center justify-between">
      <div className="flex gap-x-1">
        <button className="flex items-center justify-center gap-x-1 rounded-md bg-blue-10 p-1 text-xs">
          <Spinner className="w-3" fill="#6599FE" />
          <span className="text-blue-100">In Progress</span>
        </button>
        <button className="flex items-center justify-center gap-x-1 rounded-md bg-green-10 p-1 text-xs">
          <Check className="w-3" fill="#5BE26A" />
          <span className="text-green-100">Done</span>
        </button>
        <button className="flex items-center justify-center gap-x-1 rounded-md bg-red-10 p-1 text-xs text-red-100">
          <Stopwatch className="w-3" fill="#FE6565" />
          <span>Overtime</span>
        </button>
      </div>
      <DashboardSort />
    </section>
  );
};

export default DashboardFilter;
