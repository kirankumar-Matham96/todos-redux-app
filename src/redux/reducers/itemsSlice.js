import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { notifySuccess, notifyDanger } from "../../components/Notify";

/**
 * Async thunk to fetch todos from the API.
 *
 * @function getTodos
 * @async
 * @param {undefined} arg - No argument is required.
 * @param {object} thunkApi - The thunk API object.
 * @returns {Promise<object[]>} The list of todos fetched from the API.
 * @throws {Error} If the API request fails.
 */
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

/**
 * Async thunk to add a new todo via the API.
 *
 * @function addTodo
 * @async
 * @param {string} title - The title of the new todo.
 * @param {object} thunkApi - The thunk API object.
 * @returns {Promise<object>} The new todo added to the API.
 * @throws {Error} If the API request fails.
 */
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

/**
 * Async thunk to update an existing todo via the API.
 *
 * @function updateTodo
 * @async
 * @param {object} item - The todo item to be updated, including id, title, completed status, and userId.
 * @param {object} thunkApi - The thunk API object.
 * @returns {Promise<object>} The updated todo item.
 * @throws {Error} If the API request fails.
 */
export const updateTodo = createAsyncThunk(
  "items/updateTodo",
  async (item, thunkApi) => {
    try {
      const options = {
        headers: {
          "content-type": "application/json",
        },
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

/**
 * Async thunk to delete a todo via the API.
 *
 * @function deleteTodo
 * @async
 * @param {number} id - The ID of the todo to be deleted.
 * @param {object} thunkApi - The thunk API object.
 * @returns {Promise<number>} The ID of the deleted todo.
 * @throws {Error} If the API request fails.
 */
export const deleteTodo = createAsyncThunk(
  "items/deleteTodo",
  async (id, thunkApi) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
      return id;
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

/**
 * Redux slice for managing todo items, including fetching, adding, updating, and deleting todos.
 * Notification is triggered at every success and failure levels.
 * @name itemsSlice
 */
const itemsSlice = createSlice({
  name: "items",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) =>
    builder
      /**
       * Handles the pending state of the getTodos async thunk.
       *
       * @param {object} state - The current state of the slice.
       */
      .addCase(getTodos.pending, (state) => {
        state.loading = true;
      })

      /**
       * Handles the fulfilled state of the getTodos async thunk.
       *
       * @param {object} state - The current state of the slice.
       * @param {object} action - The action object containing the payload with the fetched todos.
       */
      .addCase(getTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
      })

      /**
       * Handles the rejected state of the getTodos async thunk.
       *
       * @param {object} state - The current state of the slice.
       * @param {object} action - The action object containing the error message.
       */
      .addCase(getTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        notifyDanger("Unable to get the data...");
      })

      /**
       * Handles the pending state of the addTodo async thunk.
       *
       * @param {object} state - The current state of the slice.
       */
      .addCase(addTodo.pending, (state) => {
        state.loading = true;
      })

      /**
       * Handles the fulfilled state of the addTodo async thunk.
       *
       * @param {object} state - The current state of the slice.
       * @param {object} action - The action object containing the payload with the added todo.
       */
      .addCase(addTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todos.unshift(action.payload);
        notifySuccess("Todo added successfully");
      })

      /**
       * Handles the rejected state of the addTodo async thunk.
       *
       * @param {object} state - The current state of the slice.
       * @param {object} action - The action object containing the error message.
       */
      .addCase(addTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        notifyDanger("Failed to add...");
      })

      /**
       * Handles the pending state of the updateTodo async thunk.
       *
       * @param {object} state - The current state of the slice.
       */
      .addCase(updateTodo.pending, (state) => {
        state.loading = true;
      })

      /**
       * Handles the fulfilled state of the updateTodo async thunk.
       *
       * @param {object} state - The current state of the slice.
       * @param {object} action - The action object containing the payload with the updated todo.
       */
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
        notifySuccess("Todo updated successfully");
      })

      /**
       * Handles the rejected state of the updateTodo async thunk.
       *
       * @param {object} state - The current state of the slice.
       * @param {object} action - The action object containing the error message.
       */
      .addCase(updateTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        notifyDanger("Failed to update...");
      })

      /**
       * Handles the pending state of the deleteTodo async thunk.
       *
       * @param {object} state - The current state of the slice.
       */
      .addCase(deleteTodo.pending, (state) => {
        state.loading = true;
      })

      /**
       * Handles the fulfilled state of the deleteTodo async thunk.
       *
       * @param {object} state - The current state of the slice.
       * @param {object} action - The action object containing the ID of the deleted todo.
       */
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = state.todos.filter((item) => item.id !== action.payload);
        notifySuccess("Todo deleted successfully");
      })

      /**
       * Handles the rejected state of the deleteTodo async thunk.
       *
       * @param {object} state - The current state of the slice.
       * @param {object} action - The action object containing the error message.
       */
      .addCase(deleteTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        notifyDanger("Failed to delete...");
      }),
});

/**
 * The reducer function generated by the items slice.
 *
 * @type {function}
 */
export const itemsReducer = itemsSlice.reducer;

/**
 * Selector to retrieve the state of the items slice.
 *
 * @function itemsSelector
 * @param {object} state - The Redux state.
 * @returns {object} The state of the items slice.
 */
export const itemsSelector = (state) => state.itemsReducer;
