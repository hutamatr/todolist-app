import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import moment from 'moment';

import { ReactComponent as Plus } from '../../assets/icons/uil_plus.svg';

import Modal from '../UI/Modal';
import useInputState from '../../hooks/useInputState';
import useQueryTodos from '../../hooks/useQueryTodos';
import useMutationTodos from '../../hooks/useMutationTodos';
import { useTodos } from '../../hooks/useStoreContext';

const DashboardForm = ({ onShowModal, onSetShowModal }) => {
  const { todoEdit, editTodo } = useTodos();
  const queryClient = useQueryClient();

  const [category, setCategory] = useState('');
  const { input, setInput, onChangeInputHandler } = useInputState({
    titleInput: '',
    descriptionInput: '',
    deadLineInput: '',
  });

  const { titleInput, descriptionInput, deadLineInput } = input;

  const {
    data: dataCategories,
    isError: isErrorCategories,
    isLoading: isLoadingCategories,
    error: errorCategories,
  } = useQueryTodos('categories', {
    method: 'GET',
    url: '/categories',
  });

  const { mutate: mutateNewTodo } = useMutationTodos(
    { method: 'POST', url: '/todos' },
    (data) => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      toast.success(data?.data.message);
    },
    (error) => {
      toast.error(error);
    }
  );

  const { mutate: mutateEditTodo } = useMutationTodos(
    { method: 'PUT', url: `/todos/${todoEdit.id}` },
    (data) => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      queryClient.invalidateQueries({ queryKey: ['categories-todos'] });
      toast.success(data?.data.message);
    },
    (error) => {
      toast.error(error);
    }
  );

  useEffect(() => {
    const date = moment(todoEdit.deadline)
      .locale('id')
      .format('YYYY-MM-DDTHH:mm');

    if (todoEdit.id) {
      setInput({
        titleInput: todoEdit.title,
        descriptionInput: todoEdit.description,
        deadLineInput: date,
      });
    }
  }, [todoEdit, setInput]);

  let isInputEmpty = false;

  if (titleInput && descriptionInput && deadLineInput) {
    isInputEmpty = true;
  }

  const titleChangeHandler = (event) => {
    setInput((prevState) => {
      return {
        ...prevState,
        titleInput:
          event.target.value.length <= 50 ? event.target.value : prevState,
      };
    });
  };

  const descriptionChangeHandler = (event) => {
    setInput((prevState) => {
      return {
        ...prevState,
        descriptionInput:
          event.target.value.length <= 50 ? event.target.value : prevState,
      };
    });
  };

  const todoCancelHandler = () => {
    onSetShowModal(false);
    setInput({
      titleInput: '',
      descriptionInput: '',
      deadLineInput: '',
    });
    editTodo({});
  };

  const categoryHandler = (id) => {
    if (!category) {
      setCategory(id);
    } else {
      setCategory('');
    }
  };

  const newTodoSubmitHandler = (event) => {
    event.preventDefault();

    const date = new Date(deadLineInput).toISOString();

    if (todoEdit.id) {
      const updatedTodo = {
        ...todoEdit,
        title: titleInput,
        description: descriptionInput,
        deadline: date,
      };

      mutateEditTodo(updatedTodo);
    } else {
      const newTodo = {
        title: titleInput,
        description: descriptionInput,
        deadline: date,
        is_completed: false,
        category_id: category,
      };

      mutateNewTodo(newTodo);
    }

    onSetShowModal(false);
    setInput({
      titleInput: '',
      descriptionInput: '',
      deadLineInput: '',
    });
    editTodo({});
  };

  return (
    <>
      {onShowModal && (
        <Modal onCloseModalHandler={() => onSetShowModal(false)}>
          <h1 className="mb-4 font-bold">
            {todoEdit.id ? 'Edit List' : 'Create List'}
          </h1>
          <form
            onSubmit={newTodoSubmitHandler}
            className="flex flex-col gap-y-4"
          >
            <div className="flex flex-row items-center justify-between">
              <label
                htmlFor="todo-title"
                className="text-sm after:ml-1 after:text-red-500 after:content-['*']"
              >
                Title
              </label>
              <span className="text-xs font-semibold">
                {0 + titleInput.length}/50
              </span>
            </div>
            <input
              required
              type="text"
              name="titleInput"
              onChange={titleChangeHandler}
              value={titleInput}
              placeholder="what do you want to do..."
              className="rounded bg-neutral-200 p-2 outline-none placeholder:text-sm"
            />
            <div className="flex flex-row items-center justify-between">
              <label
                htmlFor="todo-description"
                className="text-sm after:ml-1 after:text-red-500 after:content-['*']"
              >
                Todo
              </label>
              <span className="text-xs font-semibold">
                {0 + descriptionInput.length}/300
              </span>
            </div>
            <textarea
              required
              name="todo-description"
              id="todo-description"
              cols="30"
              rows="5"
              onChange={descriptionChangeHandler}
              value={descriptionInput}
              placeholder="tell me more detail about your task..."
              className="rounded bg-neutral-200 p-2 outline-none placeholder:text-sm"
            ></textarea>
            <label
              htmlFor="deadLine"
              className="text-sm after:ml-1 after:text-red-500 after:content-['*']"
            >
              Deadline
            </label>
            <input
              required
              type="datetime-local"
              name="deadLineInput"
              onChange={onChangeInputHandler}
              value={deadLineInput}
              className="max-w-fit rounded bg-neutral-200 p-2 outline-none"
            />

            {!todoEdit.id && (
              <>
                <label htmlFor="category" className="flex flex-col text-sm">
                  Category
                </label>
                {isErrorCategories && (
                  <p className="text-center font-medium text-red-600">
                    {errorCategories instanceof AxiosError &&
                      errorCategories.response?.data.message}
                  </p>
                )}
                {isLoadingCategories && (
                  <p className="text-center font-medium">Loading...</p>
                )}
                <ul className="grid max-h-40 w-full grid-cols-2 gap-2 overflow-y-auto p-2">
                  {dataCategories?.data.data.categories.map((categories) => {
                    return (
                      <li key={categories.id}>
                        <button
                          type="button"
                          onFocus={() => todoEdit.category_id === categories.id}
                          className={`w-full rounded bg-neutral-200 py-3 text-xs font-medium ring-1 ring-neutral-400 ${
                            todoEdit.category_id === categories.id
                              ? 'bg-orange-10 text-orange-100 ring-orange-100'
                              : ''
                          } ${
                            category
                              ? 'focus:bg-orange-10 focus:text-orange-100 focus:ring-orange-100'
                              : ''
                          }`}
                          onClick={categoryHandler.bind(null, categories.id)}
                          required
                        >
                          {categories.name}
                        </button>
                      </li>
                    );
                  })}
                  <Link to={'/category'}>
                    <button
                      className="flex w-full items-center justify-center gap-x-1 rounded border-2 border-dashed border-neutral-400 bg-neutral-200 py-3 text-xs"
                      type="button"
                    >
                      <Plus fill="#707175" /> Add Category
                    </button>
                  </Link>
                </ul>
              </>
            )}

            <button
              disabled={!isInputEmpty}
              className="block cursor-pointer rounded bg-orange-100 p-2 font-semibold text-white disabled:cursor-not-allowed disabled:bg-orange-50"
            >
              {todoEdit.id ? 'Update List' : 'Create List'}
            </button>

            <button type="button" onClick={todoCancelHandler}>
              Cancel
            </button>
          </form>
        </Modal>
      )}
    </>
  );
};

export default DashboardForm;
