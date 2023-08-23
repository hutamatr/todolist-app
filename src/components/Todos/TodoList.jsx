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
    <ul className="flex min-h-fit flex-col gap-y-4">
      {todosData?.map((todo) => {
        return (
          <li key={todo}>
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
