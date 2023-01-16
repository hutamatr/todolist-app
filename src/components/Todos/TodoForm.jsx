import { useState, useEffect } from 'react';
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import moment from 'moment';

import Modal from 'components/UI/Modal';
import DashboardFormCategory from 'components/Dashboard/DashboardFormCategory';
import useHttp from 'hooks/useHttp';
import useInputState from 'hooks/useInputState';
import { useTodos } from 'hooks/useStoreContext';
import errorQuery from 'utils/errorQuery';

const titleLong = 100;
const descriptionLong = 500;

const TodoForm = ({ onShowModal, onSetShowModal }) => {
  const { todoEdit, editTodo } = useTodos();
  const queryClient = useQueryClient();
  const { requestHttp } = useHttp();

  const [category, setCategory] = useState('');
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
        url: '/categories?order_by=ASC&s=',
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
      deadLineInput: '',
    });
    editTodo({});
    setCategory('');
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
      if (!category) {
        setIsCategoryNotAdded(true);
        return;
      }
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
    setCategory('');
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
                {0 + titleInput.length}/{titleLong}
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
              name="deadlineInput"
              onChange={onChangeInputHandler}
              value={deadlineInput}
              className="max-w-fit rounded bg-neutral-200 p-2 outline-none"
            />

            {!todoEdit.id && (
              <DashboardFormCategory
                isCategoryNotAdded={isCategoryNotAdded}
                isErrorCategories={isErrorCategories}
                isLoadingCategories={isLoadingCategories}
                errorCategories={errorCategories}
                dataCategories={allCategoriesData}
                todoEdit={todoEdit}
                category={category}
                onCategoryHandler={categoryHandler}
              />
            )}
            <button
              disabled={!inputStatus}
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

export default TodoForm;
