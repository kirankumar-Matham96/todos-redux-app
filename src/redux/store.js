import { configureStore } from "@reduxjs/toolkit";
import { itemsReducer } from "./reducers/itemsSlice";

/**
 * Configures and creates the Redux store for the application.
 *
 * The store is configured with a single reducer, `itemsReducer`,
 * which manages the state for the todo items.
 *
 * @type {Store}
 */
export const store = configureStore({
  reducer: { itemsReducer },
});
