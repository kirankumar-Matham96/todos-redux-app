import { useEffect } from "react";
import { Item } from "../Item";
import { itemsSelector, getTodos } from "../../redux/reducers/itemsSlice";
import { useSelector, useDispatch } from "react-redux";
import itemsContainerStyles from "./index.module.css";

/**
 * ItemsContainer component that fetches and displays a list of todo items.
 * It uses Redux to manage the state of the todos, loading status, and errors.
 *
 * @returns {JSX.Element} The rendered list of todo items or loading/error message.
 */
export const ItemsContainer = () => {
  const { todos, loading, error } = useSelector(itemsSelector);
  const dispatch = useDispatch();

  /**
   * useEffect hook that dispatches the getTodos action to fetch the todos when the component mounts.
   */
  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  return (
    <div className={itemsContainerStyles.bgContainer}>
      {loading ? "Loading... " : null}
      {error
        ? `Error: ${error}`
        : todos.map((todo, id) => <Item key={id} todo={todo} />)}
    </div>
  );
};
