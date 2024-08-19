import { useState, useEffect } from "react";
import itemStyles from "./index.module.css";
import { updateTodo } from "../../redux/reducers/itemsSlice";
import { useDispatch } from "react-redux";

export const Item = ({ todo }) => {
  const dispatch = useDispatch();

  const [updatedTitle, setUpdatedTitle] = useState("");
  const [edit, setEdit] = useState(false);

  const togleCompleteHandle = () => {
    dispatch(
      updateTodo({
        id: todo.id,
        title: todo.title,
        completed: !todo.completed,
        userId: todo.userId,
      })
    );
  };

  const editHandle = () => {
    setUpdatedTitle(todo.title);
    setEdit(true);
  };

  const changeTitleHandle = (e) => {
    setUpdatedTitle(e.target.value);
  };

  const submitHandle = (e) => {
    e.preventDefault();
    dispatch(
      updateTodo({
        id: todo.id,
        title: updatedTitle,
        completed: todo.completed,
        userId: todo.userId,
      })
    );
    setEdit(false);
  };

  return (
    <div className={itemStyles.bgContainer}>
      {edit ? (
        <form onSubmit={submitHandle}>
          <input
            type="text"
            value={updatedTitle}
            onChange={changeTitleHandle}
          />
          <button type="submit">Update</button>
        </form>
      ) : (
        <div>
          <p>{todo.title}</p>
          <button onClick={togleCompleteHandle}>
            {todo.completed ? "Completed" : "Pending"}
          </button>
          <button onClick={editHandle}>edit</button>
        </div>
      )}
    </div>
  );
};
