import { useState } from 'react';

const Search = ({ name, onSearchValue }) => {
  const [searchInput, setSearchInput] = useState('');

  const searchInputHandler = (event) => {
    setSearchInput(event.target.value);
  };

  const searchSubmitHandler = (event) => {
    event.preventDefault();

    onSearchValue(searchInput);

    setSearchInput('');
  };

  return (
    <form
      className="group flex items-center justify-center"
      onSubmit={searchSubmitHandler}
    >
      <input
        type="text"
        value={searchInput}
        onChange={searchInputHandler}
        placeholder={`Search ${name}`}
        className="rounded-l-full bg-slate-100 px-4 py-2 outline-none placeholder:text-sm dark:bg-neutral-700 dark:text-material-green"
        required
      />
      <button
        className="rounded-r-full bg-orange-100 px-3 py-2 text-sm font-medium text-material-green dark:text-neutral-800"
        type="submit"
      >
        Search
      </button>
    </form>
  );
};

export default Search;
