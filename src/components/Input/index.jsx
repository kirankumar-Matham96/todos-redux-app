import { useState } from "react";

export const Input = () => {
  const [inputText, setInputText] = useState("");

  const inputChangeHandle = (e) => {
    setInputText(e.target.value);
  };

  const submitHandle = (e) => {
    e.preventDefault();
    
    /* need to upload the todo here */

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
