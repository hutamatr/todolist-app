import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardSort = ({ onIsSortedTodos }) => {
  const navigate = useNavigate();

  const [sortTodos, setSortTodos] = useState('');

  const sortTodoHandler = (event) => {
    setSortTodos(event.target.value);
    navigate({
      search: `?sort=${onIsSortedTodos ? 'desc' : 'asc'}`,
    });
  };

  return (
    <form className="text-xs">
      <select
        name="sort"
        id="sort"
        className="max-w-xs rounded-md px-2"
        onChange={sortTodoHandler}
        value={sortTodos}
      >
        {onIsSortedTodos ? (
          <>
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </>
        ) : (
          <>
            <option value="oldest">Oldest first</option>
            <option value="newest">Newest first</option>
          </>
        )}
      </select>
    </form>
  );
};

export default DashboardSort;
