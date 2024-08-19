import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../../redux/reducers/itemsSlice";
import inputStyles from "./index.module.css";

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
    <form className={inputStyles.formContainer} onSubmit={submitHandle}>
      <input
        className={inputStyles.input}
        type="text"
        value={inputText}
        onChange={inputChangeHandle}
        placeholder="Add a todo here..."
      />
      <button className={inputStyles.button} type="submit">
        Add
      </button>
    </form>
  );
};
