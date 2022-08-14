import React, { useState, useRef, useEffect } from "react";
import { MdCancel } from "react-icons/md";

import Modal from "../UI/Modal";
import useTodos from "../../hooks/useTodos";

const generateID = () => {
  return Date.now();
};

const DashboardForm = () => {
  const [newTodoInput, setNewTodoInput] = useState({
    title: "",
    message: "",
    date: "",
  });
  const [isInputEmpty, setIsInputEmpty] = useState(false);

  const { addTodos, todoEdit, editTodo } = useTodos();
  const titleRef = useRef();

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

  const cancelEditHandler = () => {
    setNewTodoInput({
      title: "",
      message: "",
      date: "",
    });
    editTodo({});
  };

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
      };

      addTodos(updatedTodo);
    } else {
      const newTodo = {
        id: generateID(),
        title: newTodoInput.title,
        message: newTodoInput.message,
        date: newTodoInput.date,
      };

      addTodos(newTodo);
    }
    setNewTodoInput({
      title: "",
      message: "",
      date: "",
    });
    editTodo({});
  };

  return (
    <Modal>
      <label htmlFor="my-modal-6" onClick={cancelEditHandler}>
        <MdCancel className="absolute top-3 right-6 cursor-pointer text-3xl text-custom-orange" />
      </label>
      <form onSubmit={newTodoSubmitHandler} className="flex flex-col gap-y-3">
        <label htmlFor="todo-title">Title</label>
        <input
          type="text"
          ref={titleRef}
          onChange={titleChangeHandler}
          value={newTodoInput.title}
          className="rounded-md p-2 ring-1 ring-custom-black"
        />
        <label htmlFor="todo-message">Todo</label>
        <textarea
          name="todo-message"
          id="todo-message"
          cols="30"
          rows="5"
          onChange={messageChangeHandler}
          value={newTodoInput.message}
          className="rounded-md p-2 outline-none ring-1 ring-custom-black"
        ></textarea>
        <input
          type="date"
          onChange={dateChangeHandler}
          value={newTodoInput.date}
          className="max-w-min rounded-md p-1 ring-1 ring-custom-black"
        />

        <button
          className="mx-auto max-w-fit rounded-md bg-custom-green px-4 py-1 text-custom-white duration-300 hover:bg-custom-orange disabled:cursor-not-allowed"
          disabled={isInputEmpty ? true : false}
        >
          <label
            htmlFor="my-modal-6"
            className="cursor-pointer disabled:cursor-not-allowed"
            disabled={isInputEmpty ? true : false}
          >
            {todoEdit.id ? "Update" : "Submit"}
          </label>
        </button>
      </form>
    </Modal>
  );
};

export default DashboardForm;
