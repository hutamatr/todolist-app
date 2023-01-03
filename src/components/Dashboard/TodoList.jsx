import React from 'react';
import DashboardCard from './DashboardCard';

const TodoList = ({ todosData, onSetShowModal }) => {
  return (
    <ul className="grid grid-cols-1 gap-y-4">
      {todosData?.map((todo, index) => {
        return (
          <li key={index}>
            <DashboardCard
              {...todo}
              onTodoEdit={todo}
              onSetShowModal={onSetShowModal}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default TodoList;
