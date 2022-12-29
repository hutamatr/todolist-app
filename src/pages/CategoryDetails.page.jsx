import React from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import emptyTodo from '../assets/images/Calendar.webp';

import DashboardCard from '../components/Dashboard/DashboardCard';
import DashboardForm from '../components/Dashboard/DashboardForm';
import useQueryTodos from '../hooks/useQueryTodos';
import { useModal } from '../hooks/useStoreContext';

const CategoryDetails = () => {
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

  return (
    <section className="flex min-h-screen flex-col gap-y-6 py-6">
      <h1 className="font-bold">{categoryName?.name}</h1>
      <ul className="grid grid-cols-1 gap-y-4">
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
          dataDetailCategory?.data.category.map((data) => {
            return (
              <li key={data.id}>
                <DashboardCard
                  {...data}
                  onTodoEdit={data}
                  onSetShowModal={setShowModal}
                />
              </li>
            );
          })
        )}
      </ul>
      <DashboardForm onShowModal={isModalShow} onSetShowModal={setShowModal} />
    </section>
  );
};

export default CategoryDetails;
