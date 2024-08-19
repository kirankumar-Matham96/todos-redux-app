import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getTodos = createAsyncThunk(
  "items/getTodos",
  async (arg, thunkApi) => {
    try {
      const resp = await axios.get(
        "https://jsonplaceholder.typicode.com/todos"
      );
      return resp.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const INITIAL_STATE = {
  loading: false,
  error: null,
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
  extraReducers: (builder) =>
    builder
      .addCase(getTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(getTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }),
});

export const itemsReducer = itemsSlice.reducer;
export const itemsSelector = (state) => state.itemsReducer;
