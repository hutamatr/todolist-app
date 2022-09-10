import React, { useReducer, useCallback, useState } from 'react';

import { CategoryContext } from './Context';

const initCategory = {
  categories: [],
};

const categoryReducer = (state, action) => {
  switch (action.type) {
    case 'INIT_CATEGORY':
      const allCategory = action.payload;
      return {
        ...state,
        categories: allCategory,
      };
    case 'ADD_CATEGORY':
      const addedCategory = [...state.categories, action.payload];

      return {
        ...state,
        categories: addedCategory,
      };
    case 'REMOVE_CATEGORY':
      const removedCategory = state.categories.filter(
        (category) => category.id !== action.payload
      );

      return {
        ...state,
        categories: removedCategory,
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
  const [alertCategory, setAlertCategory] = useState({
    isSuccess: false,
    successMessage: '',
  });

  const getAllCategoryHandler = useCallback((categoriesItems) => {
    dispatchCategory({ type: 'INIT_CATEGORY', payload: categoriesItems });
  }, []);

  const addCategoryHandler = (categoryItem) => {
    dispatchCategory({ type: 'ADD_CATEGORY', payload: categoryItem?.data });
    setAlertCategory({
      isSuccess: categoryItem?.status,
      successMessage: categoryItem?.message,
    });
  };

  const deleteCategoryHandler = (categoryDelete, categoryId) => {
    dispatchCategory({ type: 'REMOVE_CATEGORY', payload: categoryId });
    setAlertCategory({
      isSuccess: categoryDelete?.status,
      successMessage: categoryDelete?.message,
    });
  };

  const value = {
    categories: categoryState.categories,
    alertCategory,
    setAlertCategory,
    getAllCategory: getAllCategoryHandler,
    addCategory: addCategoryHandler,
    deleteCategory: deleteCategoryHandler,
  };

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryProvider;
