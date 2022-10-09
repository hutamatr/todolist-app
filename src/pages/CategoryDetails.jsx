import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import emptyTodo from '../assets/images/Calendar.webp';

import DashboardCard from '../components/Dashboard/DashboardCard';
import useAxios from '../hooks/useAxios';
import { useAuth } from '../hooks/useStoreContext';

const CategoryDetails = () => {
  const { categoryId } = useParams();
  const { requestHttp } = useAxios();
  const { authToken } = useAuth();

  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    requestHttp(
      {
        method: 'GET',
        url: `/categories/${categoryId}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      },
      (data) => {
        setCategoryData(data?.category);
      }
    );
  }, [authToken, categoryId, requestHttp]);

  return (
    <section className="flex min-h-screen flex-col gap-y-6 py-6">
      <h1 className="font-bold">Dashboard</h1>
      <ul className="grid grid-cols-1 gap-y-4">
        {categoryData.length === 0 ? (
          <div className="mx-auto flex min-h-[50vh] flex-col items-center justify-center gap-y-3">
            <img
              src={emptyTodo}
              alt=""
              className="max-w-[5rem] md:max-w-[6rem]"
              loading="lazy"
            />
            <p className="text-center text-lg font-medium">Category Empty</p>
          </div>
        ) : (
          categoryData.map((data) => {
            return (
              <li key={data.id}>
                <DashboardCard
                  {...data}
                  onTodoEdit={data}
                  // onSetShowModal={setShowModal}
                />
              </li>
            );
          })
        )}
      </ul>
    </section>
  );
};

export default CategoryDetails;
