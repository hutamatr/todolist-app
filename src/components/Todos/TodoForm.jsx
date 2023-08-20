import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

import DashboardFormCategory from '@components/Dashboard/DashboardFormCategory';
import Modal from '@components/UI/Modal';

import useHttp from '@hooks/useHttp';
import useInputState from '@hooks/useInputState';
import { useTodos } from '@hooks/useStoreContext';
import errorQuery from '@utils/errorQuery';

const titleLong = 100;
const descriptionLong = 500;

const TodoForm = ({ onShowModal, onSetShowModal }) => {
  const { todoEdit, editTodo } = useTodos();
  const queryClient = useQueryClient();
  const { requestHttp } = useHttp();

  const [categoryId, setCategoryId] = useState(0);
  const [isCategoryNotAdded, setIsCategoryNotAdded] = useState(false);
  const { input, setInput, onChangeInputHandler } = useInputState({
    titleInput: '',
    descriptionInput: '',
    deadlineInput: '',
  });

  const { titleInput, descriptionInput, deadlineInput } = input;

  const {
    data: dataCategories,
    isError: isErrorCategories,
    isLoading: isLoadingCategories,
    error: errorCategories,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: () => {
      return requestHttp({
        method: 'GET',
        url: '/categories?order_by=DESC&limit=100',
      });
    },
  });

  const allCategoriesData = dataCategories?.data.data.rows;

  const { mutate: mutateNewTodo } = useMutation({
    mutationFn: (newTodoData) => {
      return requestHttp({
        method: 'POST',
        url: '/todos',
        data: newTodoData,
      });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      queryClient.invalidateQueries({ queryKey: ['total-todos'] });
      toast.success(data?.data.message);
    },
    onError: (error) => {
      errorQuery(error);
    },
  });

  const { mutate: mutateEditTodo } = useMutation({
    mutationFn: (editTodoData) => {
      return requestHttp({
        method: 'PUT',
        url: `/todos/${todoEdit.id}`,
        data: editTodoData,
      });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      queryClient.invalidateQueries({ queryKey: ['categories-todos'] });
      toast.success(data?.data.message);
    },
    onError: (error) => {
      errorQuery(error);
    },
  });

  useEffect(() => {
    const date = moment(todoEdit.deadline)
      .locale('id')
      .format('YYYY-MM-DDTHH:mm');

    if (todoEdit.id) {
      setInput({
        titleInput: todoEdit.title,
        descriptionInput: todoEdit.description,
        deadlineInput: date,
      });
    }
    setIsCategoryNotAdded(false);
  }, [todoEdit, setInput]);

  let inputStatus = false;

  if (titleInput && descriptionInput && deadlineInput) {
    inputStatus = true;
  }

  const titleChangeHandler = (event) => {
    setInput((prevState) => {
      return {
        ...prevState,
        titleInput:
          event.target.value.length <= titleLong
            ? event.target.value
            : prevState.titleInput,
      };
    });
  };

  const descriptionChangeHandler = (event) => {
    setInput((prevState) => {
      return {
        ...prevState,
        descriptionInput:
          event.target.value.length <= descriptionLong
            ? event.target.value
            : prevState.descriptionInput,
      };
    });
  };

  const todoCancelHandler = () => {
    onSetShowModal(false);
    setInput({
      titleInput: '',
      descriptionInput: '',
      deadlineInput: '',
    });
    editTodo({});
    setCategoryId(0);
  };

  const newTodoSubmitHandler = (event) => {
    event.preventDefault();

    const date = new Date(deadlineInput).toISOString();

    if (todoEdit.id) {
      const updatedTodo = {
        ...todoEdit,
        title: titleInput,
        description: descriptionInput,
        deadline: date,
      };

      mutateEditTodo(updatedTodo);
    } else {
      if (!categoryId) {
        setIsCategoryNotAdded(true);
        return;
      }
      const newTodo = {
        title: titleInput,
        description: descriptionInput,
        deadline: date,
        is_completed: false,
        category_id: categoryId,
      };

      mutateNewTodo(newTodo);
    }

    onSetShowModal(false);
    setInput({
      titleInput: '',
      descriptionInput: '',
      deadlineInput: '',
    });
    editTodo({});
    setCategoryId(0);
  };

  return (
    <>
      {onShowModal && (
        <Modal onCloseModalHandler={todoCancelHandler}>
          <h1 className="mb-4 font-bold dark:text-material-green">
            {todoEdit.id ? 'Edit List' : 'Create List'}
          </h1>
          <form
            onSubmit={newTodoSubmitHandler}
            className="flex flex-col gap-y-4"
          >
            <div className="flex flex-row items-center justify-between dark:text-material-green">
              <label
                htmlFor="todo-title"
                className="text-sm after:ml-1 after:text-red-500 after:content-['*'] "
              >
                Title
              </label>
              <span className="text-xs font-semibold">
                {0 + titleInput.length}/{titleLong}
              </span>
            </div>
            <input
              required
              id="todo-title"
              type="text"
              name="titleInput"
              onChange={titleChangeHandler}
              value={titleInput}
              placeholder="what do you want to do..."
              className="rounded bg-neutral-200 p-2 outline-none placeholder:text-sm dark:bg-neutral-800 dark:text-material-green"
            />
            <div className="flex flex-row items-center justify-between dark:text-material-green">
              <label
                htmlFor="todo-description"
                className="text-sm after:ml-1 after:text-red-500 after:content-['*']"
              >
                Todo
              </label>
              <span className="text-xs font-semibold">
                {0 + descriptionInput.length}/{descriptionLong}
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
              className="rounded bg-neutral-200 p-2 outline-none placeholder:text-sm dark:bg-neutral-800 dark:text-material-green"
            ></textarea>
            <label
              htmlFor="deadLine"
              className="text-sm after:ml-1 after:text-red-500 after:content-['*'] dark:text-material-green"
            >
              Deadline
            </label>
            <input
              required
              type="datetime-local"
              name="deadlineInput"
              onChange={onChangeInputHandler}
              value={deadlineInput}
              className="max-w-fit rounded bg-neutral-200 p-2 outline-none dark:bg-neutral-800 dark:text-material-green"
            />

            {!todoEdit.id && (
              <DashboardFormCategory
                isCategoryNotAdded={isCategoryNotAdded}
                setIsCategoryNotAdded={setIsCategoryNotAdded}
                isErrorCategories={isErrorCategories}
                isLoadingCategories={isLoadingCategories}
                errorCategories={errorCategories}
                dataCategories={allCategoriesData}
                todoEdit={todoEdit}
                categoryId={categoryId}
                onSetCategoryId={setCategoryId}
              />
            )}
            <button
              disabled={!inputStatus}
              className="block cursor-pointer rounded bg-orange-100 p-2 font-semibold text-material-green disabled:cursor-not-allowed disabled:bg-orange-50 dark:text-neutral-800"
            >
              {todoEdit.id ? 'Update' : 'Create'}
            </button>

            <button
              type="button"
              className="font-medium text-orange-100"
              onClick={todoCancelHandler}
            >
              Cancel
            </button>
          </form>
        </Modal>
      )}
    </>
  );
};

export default TodoForm;
