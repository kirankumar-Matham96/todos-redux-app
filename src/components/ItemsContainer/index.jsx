import { useEffect } from "react";
import { Item } from "../Item";
import { itemsSelector, getTodos } from "../../redux/reducers/itemsSlice";
import { useSelector, useDispatch } from "react-redux";

export const ItemsContainer = () => {
  const { todos, loading, error } = useSelector(itemsSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  return (
    <div>
      {loading ? "Loading... " : null}
      {error
        ? `Error: ${error}`
        : todos.map((todo, id) => <Item key={id} todo={todo} />)}
    </div>
  );
};
