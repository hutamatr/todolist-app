import { useState } from 'react';

const useInputState = (formState) => {
  const [input, setInput] = useState(formState);

  const onChangeInputHandler = (event) => {
    const { name, value } = event.target;

    setInput((prevState) => ({ ...prevState, [name]: value }));
  };

  return {
    input,
    setInput,
    onChangeInputHandler,
  };
};

export default useInputState;
