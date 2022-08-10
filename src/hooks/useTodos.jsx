import { useContext } from "react";

import { TodoContext } from "../context/Context";

const useTodos = () => {
  const contextTodos = useContext(TodoContext);

  return contextTodos;
};

export default useTodos;
