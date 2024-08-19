import { useState } from "react";
import itemStyles from "./index.module.css";
import { updateTodo, deleteTodo } from "../../redux/reducers/itemsSlice";
import { useDispatch } from "react-redux";

/**
 * Item component representing a single todo item.
 * Provides functionality to edit, update, delete, and toggle the completion status of the todo.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.todo - The todo item to be displayed and managed.
 * @returns {JSX.Element} The rendered todo item.
 */
export const Item = ({ todo }) => {
  const dispatch = useDispatch();
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [edit, setEdit] = useState(false);

  /**
   * Toggles the completion status of the todo item.
   * Dispatches the updateTodo action with the updated completion status.
   */
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

  /**
   * Enables the edit mode for the todo item.
   * Sets the updatedTitle state to the current title of the todo.
   */
  const editHandle = () => {
    setUpdatedTitle(todo.title);
    setEdit(true);
  };

  /**
   * Handles changes in the title input field during edit mode.
   * Updates the updatedTitle state with the current value of the input field.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event triggered by the input field.
   */
  const changeTitleHandle = (e) => {
    setUpdatedTitle(e.target.value);
  };

  /**
   * Handles the form submission when updating the todo item.
   * Dispatches the updateTodo action with the updated title and resets the edit mode.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - The submit event triggered by the form.
   */
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

  /**
   * Deletes the todo item.
   * Dispatches the deleteTodo action with the id of the todo to be deleted.
   */
  const deleteTodoHandle = () => {
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
