import React from "react";
import { Item } from "../Item";
import { itemsSelector } from "../../redux/reducers/itemsSlice";
import { useSelector } from "react-redux";

export const ItemsContainer = () => {
  const todos = useSelector(itemsSelector);
  return (
    <div>
      {todos.map((todo, id) => (
        <Item key={id} todo={todo} />
      ))}
    </div>
  );
};
