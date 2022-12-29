import React, { useState, useEffect } from 'react';

import TodoList from '../Dashboard/TodoList';

import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md';

const Pagination = ({
  data,
  pageLimit,
  dataLimit,
  totalPages,
  onSetShowModal,
}) => {
  const [pages] = useState(Math.round(data?.length / dataLimit));
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    window.scrollTo({ behavior: 'smooth', top: 0 });
  }, [currentPage]);

  const firstPageHandler = () => {
    setCurrentPage(1);
  };

  const lastPageHandler = () => {
    // setCurrentPage(Math.floor(data.length / dataLimit));
    setCurrentPage(12);
  };

  const nextPageHandler = () => {
    setCurrentPage((prevState) => prevState + 1);
  };

  const prevPageHandler = () => {
    setCurrentPage((prevState) => prevState - 1);
  };

  const changePageHandler = (event) => {
    const pageNumber = +event.target.textContent;
    setCurrentPage(pageNumber);
  };

  const getPaginationDataHandler = () => {
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    return data?.slice(startIndex, endIndex);
  };

  const getPaginationGroupHandler = () => {
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    return new Array(pageLimit).fill().map((_, index) => start + index + 1);
  };

  return (
    <>
      <TodoList
        todosData={getPaginationDataHandler}
        onSetShowModal={onSetShowModal}
      />

      <div className="my-6 flex flex-row items-center justify-center gap-x-2">
        <button
          onClick={firstPageHandler}
          className={`btn btn-sm border-2 border-orange-100 bg-orange-100 text-sm hover:border-orange-100 hover:bg-white hover:text-neutral-700 ${
            currentPage < 5 ? 'hidden' : ''
          }`}
        >
          first
        </button>
        <button
          onClick={prevPageHandler}
          className={`hover:bg-primary ${currentPage === 1 ? 'hidden' : ''}`}
        >
          <MdNavigateBefore />
        </button>

        {getPaginationGroupHandler().map((item, index) => (
          <button
            key={index}
            onClick={changePageHandler}
            className={`btn btn-ghost btn-circle btn-sm ${
              currentPage === item
                ? 'btn-outline'
                : currentPage >= 12
                ? 'hidden'
                : ''
            }`}
          >
            <span>{item}</span>
          </button>
        ))}
        <button
          onClick={nextPageHandler}
          className={`hover:bg-primary ${currentPage === 13 ? 'hidden' : ''}`}
        >
          <MdNavigateNext />
        </button>

        <button
          onClick={lastPageHandler}
          className={`btn btn-sm border-2 border-orange-100 bg-orange-100 text-sm hover:border-orange-100 hover:bg-white hover:text-neutral-700 ${
            currentPage === pages ? 'hidden' : ''
          }`}
        >
          last
        </button>
      </div>
    </>
  );
};

export default Pagination;
