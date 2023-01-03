import { usePagination, DOTS } from '../../hooks/usePagination';

import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md';

const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul className="flex cursor-pointer flex-row items-center justify-center gap-x-4 sm:gap-x-6">
      <li>
        <button
          onClick={onPrevious}
          disabled={currentPage === 1}
          className="rounded-md hover:ring-2 hover:ring-orange-100 disabled:hidden sm:btn-sm"
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
            onClick={() => onPageChange(pageNumber)}
            key={index}
          >
            {pageNumber}
          </li>
        );
      })}
      <li className={''}>
        <button
          onClick={onNext}
          disabled={currentPage === lastPage}
          className="rounded-md hover:ring-2 hover:ring-orange-100 disabled:hidden sm:btn-sm"
        >
          <MdNavigateNext className="text-2xl" />
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
