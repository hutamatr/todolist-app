import React, { useState, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import DashboardForm from '../components/Dashboard/DashboardForm';
import TodoList from '../components/Dashboard/TodoList';
import Pagination from '../components/UI/Pagination';
import useQueryTodos from '../hooks/useQueryTodos';
import { useModal } from '../hooks/useStoreContext';

import emptyTodo from '../assets/images/Calendar.webp';

let PageSize = 5;

const CategoryDetails = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { categoryId } = useParams();
  const { isModalShow, setShowModal } = useModal();

  const queryClient = useQueryClient();

  const categoryName = queryClient
    .getQueryData(['categories'])
    ?.data.data.categories.find(
      (category) => category.id === Number(categoryId)
    );

  const { data: dataDetailCategory } = useQueryTodos('categories-todos', {
    method: 'GET',
    url: `/categories/${categoryId}?limit=100`,
  });

  const currentTodosData = useCallback(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return dataDetailCategory?.data.category.slice(
      firstPageIndex,
      lastPageIndex
    );
  }, [currentPage, dataDetailCategory]);

  return (
    <section className="flex min-h-screen flex-col gap-y-6 py-6">
      <h1 className="font-bold">{categoryName?.name}</h1>
      {dataDetailCategory?.data.category.length === 0 ? (
        <div className="mx-auto flex min-h-[50vh] flex-col items-center justify-center gap-y-3">
          <img
            src={emptyTodo}
            alt=""
            className="max-w-[5rem] md:max-w-[6rem]"
            loading="lazy"
          />
          <p className="text-center text-lg font-medium">Todo Empty</p>
        </div>
      ) : (
        <>
          <TodoList
            onSetShowModal={setShowModal}
            todosData={currentTodosData()}
          />
          {dataDetailCategory?.data.category.length > 5 && (
            <Pagination
              currentPage={currentPage}
              totalCount={dataDetailCategory?.data.category.length}
              pageSize={PageSize}
              onPageChange={(page) => setCurrentPage(page)}
            />
          )}
        </>
      )}
      <DashboardForm onShowModal={isModalShow} onSetShowModal={setShowModal} />
    </section>
  );
};

export default CategoryDetails;
