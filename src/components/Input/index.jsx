import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../../redux/reducers/itemsSlice";

export const Input = () => {
  const [inputText, setInputText] = useState("");
  const dispatch = useDispatch();

  const inputChangeHandle = (e) => {
    setInputText(e.target.value);
  };

  const submitHandle = (e) => {
    e.preventDefault();

    /* need to upload the todo here */
    dispatch(addTodo(inputText));

    // reset the input
    setInputText("");
  };

  return (
    <form onSubmit={submitHandle}>
      <p>{inputText}</p>
      <input
        type="text"
        value={inputText}
        onChange={inputChangeHandle}
        placeholder="Add a todo here..."
      />
      <button type="submit">Add</button>
    </form>
  );
};
