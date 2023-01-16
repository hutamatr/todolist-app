import { useNavigate, useLocation } from 'react-router-dom';

const DashboardSort = ({ onSetSort, onSort }) => {
  const navigate = useNavigate();

  const { search } = useLocation();

  const queryParams = new URLSearchParams(search);

  const isSortedTodos = queryParams.get('sort') === 'desc';

  const sortTodoHandler = (event) => {
    onSetSort(event.target.value);
    navigate({
      search: `?sort=${isSortedTodos ? 'asc' : 'desc'}`,
    });
  };

  return (
    <form className="text-sm">
      <select
        name="sort"
        id="sort"
        className="max-w-xs rounded-md bg-material-background px-2"
        onChange={sortTodoHandler}
        value={onSort}
      >
        <option value="ASC">Newest first</option>
        <option value="DESC">Oldest first</option>
      </select>
    </form>
  );
};

export default DashboardSort;
