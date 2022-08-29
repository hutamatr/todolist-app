import React, { useReducer } from 'react';

import { CategoryContext } from './Context';
import { categoryData } from '../utils/dummy-todos';

const initCategory = {
  categories: [...categoryData],
};

const categoryReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_CATEGORY':
      const addedCategory = [...state.categories, action.payload];

      return {
        ...state,
        categories: addedCategory,
      };

    default:
      return initCategory;
  }
};

const CategoryProvider = ({ children }) => {
  const [categoryState, dispatchCategory] = useReducer(
    categoryReducer,
    initCategory
  );

  const addCategoryHandler = (categoryItem) => {
    dispatchCategory({ type: 'ADD_CATEGORY', payload: categoryItem });
  };

  const value = {
    categories: categoryState.categories,
    addCategory: addCategoryHandler,
  };

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryProvider;
