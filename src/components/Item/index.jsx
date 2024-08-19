import React from "react";
import itemStyles from "./index.module.css";

export const Item = ({ todo }) => {
  return <div className={itemStyles.bgContainer}>{todo.title}</div>;
};
