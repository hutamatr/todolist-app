import React from 'react';
import { useParams } from 'react-router-dom';

const CategoryDetails = () => {
  const { categoryId } = useParams();

  return (
    <section className="flex min-h-screen flex-col gap-y-6 py-6">
      <h1>{categoryId}</h1>
    </section>
  );
};

export default CategoryDetails;
