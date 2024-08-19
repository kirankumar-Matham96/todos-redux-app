import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../../redux/reducers/itemsSlice";
import inputStyles from "./index.module.css";

/**
 * Input component for adding a new todo item.
 * Handles input text and dispatches the addTodo action on form submission.
 *
 * @returns {JSX.Element} The rendered input form for adding todos.
 */
export const Input = () => {
  const [inputText, setInputText] = useState("");
  const dispatch = useDispatch();

  /**
   * Handles changes in the input field.
   * Updates the inputText state with the current value of the input field.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event triggered by the input field.
   */
  const inputChangeHandle = (e) => {
    setInputText(e.target.value);
  };

  /**
   * Handles the form submission.
   * Dispatches the addTodo action with the current input text and resets the input field.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - The submit event triggered by the form.
   */
  const submitHandle = (e) => {
    e.preventDefault();

    // uploading the todo here
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
