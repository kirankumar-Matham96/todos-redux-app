import { useEffect } from "react";
import { Item } from "../Item";
import { itemsSelector, getTodos } from "../../redux/reducers/itemsSlice";
import { useSelector, useDispatch } from "react-redux";
import itemsContainerStyles from "./index.module.css"

export const ItemsContainer = () => {
  const { todos, loading, error } = useSelector(itemsSelector);
  const dispatch = useDispatch();

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
