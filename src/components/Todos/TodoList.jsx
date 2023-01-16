import TodoItem from './TodoItem';

const TodoList = ({
  todosData,
  onSetShowModal,
  dashboardSkipPaginate,
  dashboardPageSize,
  dashboardSortTodos,
  dashboardSearchTodos,
  dashboardTodoStatus,
  categoriesDetailsCategoryId,
  categoriesDetailsSkipPaginate,
  categoriesDetailsPageSize,
  categoriesDetailsSearchValue,
  categoriesDetailsStatus,
  // categoriesDetailsSort,
}) => {
  return (
    <ul className="grid grid-cols-1 gap-y-4">
      {todosData?.map((todo, index) => {
        return (
          <li key={index}>
            <TodoItem
              {...todo}
              onTodoEdit={todo}
              onSetShowModal={onSetShowModal}
              dashboardSkipPaginate={dashboardSkipPaginate}
              dashboardPageSize={dashboardPageSize}
              dashboardSortTodos={dashboardSortTodos}
              dashboardSearchTodos={dashboardSearchTodos}
              dashboardTodoStatus={dashboardTodoStatus}
              categoriesDetailsCategoryId={categoriesDetailsCategoryId}
              categoriesDetailsSkipPaginate={categoriesDetailsSkipPaginate}
              categoriesDetailsPageSize={categoriesDetailsPageSize}
              categoriesDetailsSearchValue={categoriesDetailsSearchValue}
              categoriesDetailsStatus={categoriesDetailsStatus}
              // categoriesDetailsSort={categoriesDetailsSort}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default TodoList;
