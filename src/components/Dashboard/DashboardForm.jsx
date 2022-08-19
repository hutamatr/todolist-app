import React, { useState, useRef, useEffect } from 'react';

import { ReactComponent as Plus } from '../../assets/icons/uil_plus.svg';

import Modal from '../UI/Modal';
import useTodos from '../../hooks/useTodos';

const generateID = () => {
  return Date.now();
};

const DashboardForm = () => {
  const titleRef = useRef();
  const { addTodo, updateTodo, todoEdit, editTodo } = useTodos();

  const [newTodoInput, setNewTodoInput] = useState({
    title: '',
    message: '',
    date: '',
  });
  const [isInputEmpty, setIsInputEmpty] = useState(false);
  const [category, setCategory] = useState('');

  const categoryList = [
    'Coursework',
    'Workout',
    'Coding Web',
    'Plant',
    'List August',
    'test-1',
    'test-2',
    'test-3',
    'test-4',
  ];

  useEffect(() => {
    titleRef.current.focus();
    if (todoEdit.id) {
      setNewTodoInput({
        title: todoEdit.title,
        message: todoEdit.message,
        date: todoEdit.date,
      });
    }
  }, [todoEdit]);

  const titleChangeHandler = (event) => {
    setNewTodoInput((prevState) => ({
      ...prevState,
      title: event.target.value,
    }));
  };

  const messageChangeHandler = (event) => {
    setNewTodoInput((prevState) => ({
      ...prevState,
      message: event.target.value,
    }));
  };

  const dateChangeHandler = (event) => {
    setNewTodoInput((prevState) => ({
      ...prevState,
      date: event.target.value,
    }));
  };

  const todoCancelHandler = () => {
    setNewTodoInput({
      title: '',
      message: '',
      date: '',
    });
    editTodo({});
  };

  const categoryHandler = (value) => {
    setCategory(value);
  };

  const addCategoryHandler = () => {};

  const newTodoSubmitHandler = (event) => {
    event.preventDefault();

    if (
      newTodoInput.title.length < 1 ||
      newTodoInput.message.length < 1 ||
      newTodoInput.date.length === 0
    ) {
      setIsInputEmpty(true);
      return;
    }

    if (todoEdit.id) {
      const updatedTodo = {
        id: todoEdit.id,
        title: newTodoInput.title,
        message: newTodoInput.message,
        date: newTodoInput.date,
        isCompleted: todoEdit.isCompleted,
        category: category ? category : todoEdit.category,
      };

      updateTodo(updatedTodo);
    } else {
      const newTodo = {
        id: generateID(),
        title: newTodoInput.title,
        message: newTodoInput.message,
        date: newTodoInput.date,
        isCompleted: false,
        category: category,
      };

      addTodo(newTodo);
    }
    setNewTodoInput({
      title: '',
      message: '',
      date: '',
    });
    editTodo({});
  };

  return (
    <Modal>
      <h1 className="mb-4 font-bold">Create List</h1>
      <form onSubmit={newTodoSubmitHandler} className="flex flex-col gap-y-4">
        <label
          htmlFor="todo-title"
          className="text-sm after:ml-1 after:text-red-500 after:content-['*']"
        >
          Title
        </label>
        <input
          type="text"
          ref={titleRef}
          onChange={titleChangeHandler}
          value={newTodoInput.title}
          placeholder="what do you want to do..."
          className="rounded bg-neutral-200 p-2 outline-none placeholder:text-sm"
        />
        <label
          htmlFor="todo-message"
          className="text-sm after:ml-1 after:text-red-500 after:content-['*']"
        >
          Todo
        </label>
        <textarea
          name="todo-message"
          id="todo-message"
          cols="30"
          rows="5"
          onChange={messageChangeHandler}
          value={newTodoInput.message}
          placeholder="tell me more detail about your task..."
          className="rounded bg-neutral-200 p-2 outline-none placeholder:text-sm"
        ></textarea>
        <label
          htmlFor="date"
          className="text-sm after:ml-1 after:text-red-500 after:content-['*']"
        >
          Deadline
        </label>
        <input
          type="date"
          onChange={dateChangeHandler}
          value={newTodoInput.date}
          placeholder="mm/dd/yyyy"
          className="max-w-fit rounded bg-neutral-200 p-2 outline-none"
        />
        <label htmlFor="category" className="text-sm">
          Category
        </label>
        <ul className="grid max-h-40 w-full grid-cols-2 gap-2 overflow-y-auto p-2">
          {categoryList.map((category, index) => {
            return (
              <li key={index}>
                <button
                  type="button"
                  className="w-full rounded bg-neutral-200 py-3 text-xs font-medium ring-1 ring-neutral-400 focus:bg-orange-10 focus:text-orange-100 focus:ring-orange-100"
                  onClick={categoryHandler.bind(this, category)}
                >
                  {category}
                </button>
              </li>
            );
          })}
          <button
            className="flex w-full items-center justify-center gap-x-1 rounded border-2 border-dashed border-neutral-400 bg-neutral-200 py-3 text-xs"
            type="button"
            onClick={addCategoryHandler}
          >
            <Plus fill="#707175" /> Add Category
          </button>
        </ul>
        <button>
          <label
            htmlFor="my-modal-6"
            className="block cursor-pointer rounded bg-orange-100 p-2 font-semibold text-white disabled:bg-orange-50"
            disabled={isInputEmpty}
          >
            {todoEdit.id ? 'Update List' : 'Create List'}
          </label>
        </button>

        <button type="button" onClick={todoCancelHandler}>
          <label
            htmlFor="my-modal-6"
            className="block cursor-pointer rounded p-2 font-semibold text-orange-100 disabled:bg-orange-50"
            disabled={isInputEmpty}
          >
            Cancel
          </label>
        </button>
      </form>
    </Modal>
  );
};

export default DashboardForm;
