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
        className="rounded-l-full bg-slate-100 py-2 px-4 outline-none placeholder:text-sm"
        required
      />
      <button
        className="rounded-r-full bg-orange-100 py-2 px-3 text-sm font-medium text-slate-100"
        type="submit"
      >
        Search
      </button>
    </form>
  );
};

export default Search;
