import React from 'react';

import DashboardSort from './DashboardSort';

import filterIconName from '../../../utils/filterIconName';

const DashboardFilter = () => {
  return (
    <section className="flex items-center justify-between">
      <div className="flex gap-x-1">
        {filterIconName.map((icon, index) => {
          return (
            <button
              className={`flex items-center justify-center gap-x-1 rounded-md p-1 text-xs ${
                index === 0
                  ? 'bg-blue-10'
                  : index === 1
                  ? 'bg-green-10'
                  : index === 2
                  ? 'bg-red-10'
                  : ''
              }`}
              key={index}
            >
              <icon.icon className="w-3" fill={icon.color} />
              <span
                className={`${
                  index === 0
                    ? 'text-blue-100'
                    : index === 1
                    ? 'text-green-100'
                    : index === 2
                    ? 'text-red-100'
                    : ''
                }`}
              >
                {icon.name}
              </span>
            </button>
          );
        })}
      </div>
      <DashboardSort />
    </section>
  );
};

export default DashboardFilter;
