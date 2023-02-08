import { useState } from 'react';
import { usePagination, DOTS } from 'hooks/usePagination';

import { MdNavigateNext, MdNavigateBefore, MdAccessTime } from 'react-icons/md';

const Pagination = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  onSkipPage,
  pageSize,
  onSetPageSize,
  onSetScrollPosition,
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  const [isAnimate, setIsAnimate] = useState(false);

  const onNextHandler = () => {
    onPageChange(currentPage + 1);
    onSkipPage((prevState) => prevState + +pageSize);
  };

  const onPreviousHandler = () => {
    onPageChange(currentPage - 1);
    onSkipPage((prevState) => prevState - +pageSize);
  };

  const onNumberClickHandler = (pageNumber) => {
    onPageChange(pageNumber);
    onSkipPage(pageNumber * +pageSize - +pageSize);
  };

  const pageSizeHandler = (event) => {
    onSetPageSize(event.target.value);
    setIsAnimate(true);
    onSetScrollPosition(0);
    setTimeout(() => {
      setIsAnimate(false);
    }, 1500);
  };

  let lastPage = paginationRange[paginationRange?.length - 1];

  return (
    <div className="flex flex-col items-center justify-end gap-y-3 gap-x-4 md:flex-row">
      <div className="flex flex-row items-center justify-center gap-x-1">
        <span className="font-medium text-neutral-800 dark:text-material-green">
          Todo per page:
        </span>
        <select
          name="pages-value"
          id="pages-value"
          value={pageSize}
          onChange={pageSizeHandler}
          className="rounded ring-2 ring-orange-100 dark:bg-neutral-700 dark:text-material-green"
        >
          <option value="5">5</option>
          {totalCount > 10 && <option value="10">10</option>}
          {totalCount > 15 && <option value="15">15</option>}
        </select>
        <MdAccessTime
          className={`text-xl dark:text-material-green ${
            isAnimate ? 'animate-spin' : '-z-20'
          } `}
        />
      </div>
      <ul className="flex w-fit cursor-pointer flex-row items-center justify-center gap-x-3 rounded-md bg-material-green p-1 dark:bg-neutral-700 sm:gap-x-7 sm:p-2">
        <li>
          <button
            onClick={onPreviousHandler}
            disabled={currentPage === 1}
            className="rounded-md pt-2 disabled:hidden"
          >
            <MdNavigateBefore className="text-2xl dark:text-material-green" />
          </button>
        </li>
        {paginationRange.map((pageNumber, index) => {
          if (pageNumber === DOTS) {
            return (
              <li
                className="text-neutral-800 dark:text-material-green"
                key={index}
              >
                &#8230;
              </li>
            );
          }

          return (
            <li
              className={`rounded-full bg-slate-100 px-2 font-medium dark:bg-neutral-700 dark:text-material-green sm:font-semibold ${
                currentPage === pageNumber
                  ? 'border-2 !border-orange-100 hover:bg-orange-100 hover:text-material-green'
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
            className="rounded-md pt-2 disabled:hidden"
          >
            <MdNavigateNext className="text-2xl dark:text-material-green" />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
