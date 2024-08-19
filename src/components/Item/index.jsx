import { useState, useEffect } from "react";
import itemStyles from "./index.module.css";
import { updateTodo, deleteTodo } from "../../redux/reducers/itemsSlice";
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

  const deleteTodoHandle = () => {
    // todo.id, todo.userId
    dispatch(deleteTodo(todo.id));
  };

  return (
    <div className={itemStyles.bgContainer}>
      {edit ? (
        <form className={itemStyles.formContainer} onSubmit={submitHandle}>
          <input
            className={itemStyles.input}
            type="text"
            value={updatedTitle}
            onChange={changeTitleHandle}
          />
          <button className={itemStyles.formButton} type="submit">
            Update
          </button>
        </form>
      ) : (
        <div className={itemStyles.itemContainer}>
          <p className={itemStyles.itemText}>{todo.title}</p>
          <div className={itemStyles.btnsContainer}>
            <button
              className={
                todo.completed ? itemStyles.completedBtn : itemStyles.pendingBtn
              }
              onClick={togleCompleteHandle}
            ></button>
            <button
              className={itemStyles.editBtn}
              onClick={editHandle}
            ></button>
            <button
              className={itemStyles.deleteBtn}
              onClick={deleteTodoHandle}
            ></button>
          </div>
        </div>
      )}
    </div>
  );
};
