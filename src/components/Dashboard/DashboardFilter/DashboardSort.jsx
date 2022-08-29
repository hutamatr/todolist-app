import React from 'react';

const DashboardSort = () => {
  const onSortedTodo = true;
  return (
    <form className="text-xs">
      <select name="sort" id="sort" className="max-w-xs rounded-md px-2">
        {onSortedTodo ? (
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
