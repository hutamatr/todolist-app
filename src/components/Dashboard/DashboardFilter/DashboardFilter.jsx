import React from 'react';

import DashboardSort from './DashboardSort';

import spinner from '../../../assets/icons/uil_spinner-alt.svg';
import check from '../../../assets/icons/uil_check.svg';
import overtime from '../../../assets/icons/uil_stopwatch.svg';

const DashboardFilter = () => {
  return (
    <section className="flex items-center justify-between">
      <div className="flex gap-x-1">
        <button className="flex items-center justify-center gap-x-1 rounded-md bg-blue-10 p-1 text-xs">
          <img src={spinner} alt="spinner" className="w-3" />
          <span className="text-blue-100">In Progress</span>
        </button>
        <button className="flex items-center justify-center gap-x-1 rounded-md bg-green-10 p-1 text-xs">
          <img src={check} alt="spinner" className="w-3" />
          <span className="text-green-100">Done</span>
        </button>
        <button className="flex items-center justify-center gap-x-1 rounded-md bg-red-10 p-1 text-xs text-red-100">
          <img src={overtime} alt="spinner" className="w-3" />
          <span>Overtime</span>
        </button>
      </div>
      <DashboardSort />
    </section>
  );
};

export default DashboardFilter;
