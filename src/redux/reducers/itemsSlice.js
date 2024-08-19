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

export const addTodo = createAsyncThunk(
  "items/addTodo",
  async (title, thunkApi) => {
    try {
      const data = {
        userId: 1,
        title,
        completed: false,
      };

      const options = {
        headers: {
          "content-type": "application/json",
        },
      };

      const resp = await axios.post(
        "https://jsonplaceholder.typicode.com/todos",
        data,
        options
      );
      return resp.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const updateTodo = createAsyncThunk(
  "items/updateTodo",
  async (item, thunkApi) => {
    try {
      const options = {
        headers: {
          "content-type": "application/json",
        },
      };

      const data = {
        id: item.id,
        title: item.title,
        userId: item.userId,
        completed: item.completed,
      };

      const resp = await axios.put(
        `https://jsonplaceholder.typicode.com/todos/${item.id}`,
        item,
        options
      );

      return resp.data;
    } catch (error) {
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
      })
      .addCase(addTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todos.push(action.payload);
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = state.todos.map((item) => {
          if (
            item.id === action.payload.id &&
            item.userId === action.payload.userId
          ) {
            return action.payload;
          }
          return item;
        });
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }),
});

export const itemsReducer = itemsSlice.reducer;
export const itemsSelector = (state) => state.itemsReducer;
