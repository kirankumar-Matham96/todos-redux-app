import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  todos: [
    {
      id: 1,
      text: "First Todo",
      timestamp: new Date().toString(),
      completed: true,
    },
    {
      id: 2,
      text: "Second Todo",
      timestamp: new Date().toString(),
      completed: false,
    },
  ],
};

const itemsSlice = createSlice({
  name: "items",
  initialState: INITIAL_STATE,
  reducers: {},
  //   extraReducers: {},
});

export const itemsReducer = itemsSlice.reducer;
export const itemsSelector = (state) => state.itemsReducer.todos;
