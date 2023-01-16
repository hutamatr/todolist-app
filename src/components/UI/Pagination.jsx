import { useState } from 'react';
import { usePagination, DOTS } from 'hooks/usePagination';

import { MdNavigateNext, MdNavigateBefore, MdAccessTime } from 'react-icons/md';

const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    onSkipPage,
    pageSize,
    onSetPageSize,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  const [isAnimate, setIsAnimate] = useState(false);

  if (currentPage === 0 || paginationRange?.length < 2) {
    return null;
  }

  const onNextHandler = () => {
    onPageChange(currentPage + 1);
    onSkipPage((prevState) => prevState + pageSize);
  };

  const onPreviousHandler = () => {
    onPageChange(currentPage - 1);
    onSkipPage((prevState) => prevState - pageSize);
  };

  const onNumberClickHandler = (pageNumber) => {
    onPageChange(pageNumber);
    onSkipPage(pageNumber * pageSize - pageSize);
  };

  const pageSizeHandler = (event) => {
    onSetPageSize(event.target.value);
    setIsAnimate(true);
    setTimeout(() => {
      setIsAnimate(false);
    }, 1500);
  };

  let lastPage = paginationRange[paginationRange?.length - 1];
  return (
    <div className="flex flex-col items-center justify-center gap-y-3 gap-x-4 sm:flex-row">
      <div className="flex flex-row items-center justify-center gap-x-2">
        <MdAccessTime
          className={`text-xl ${isAnimate ? 'animate-spin' : '-z-20'} `}
        />
        <select
          name="pages-value"
          id="pages-value"
          value={pageSize}
          onChange={pageSizeHandler}
          className="rounded ring-2 ring-orange-100"
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
      </div>
      <ul className="flex cursor-pointer flex-row items-center justify-center gap-x-1 sm:gap-x-6">
        <li>
          <button
            onClick={onPreviousHandler}
            disabled={currentPage === 1}
            className="rounded-md pt-2 hover:ring-2 hover:ring-orange-100 disabled:hidden sm:btn-sm"
          >
            <MdNavigateBefore className="text-2xl" />
          </button>
        </li>
        {paginationRange.map((pageNumber, index) => {
          if (pageNumber === DOTS) {
            return (
              <li className="" key={index}>
                &#8230;
              </li>
            );
          }

          return (
            <li
              className={`btn btn-ghost btn-circle btn-sm  ${
                currentPage === pageNumber
                  ? 'btn-outline border-2 !border-orange-100 hover:bg-orange-100 hover:text-white'
                  : ''
              }`}
              onClick={onNumberClickHandler.bind(null, pageNumber)}
              key={index}
            >
              {pageNumber}
            </li>
          );
        })}
        <li>
          <button
            onClick={onNextHandler}
            disabled={currentPage === lastPage}
            className="rounded-md pt-2 hover:ring-2 hover:ring-orange-100 disabled:hidden sm:btn-sm"
          >
            <MdNavigateNext className="text-2xl" />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
