import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

/**
 * Wraping the App component in a Redux
 * `Provider` to give the access to the store.
 */
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
