import { Provider } from "react-redux";
import { Input } from "./components/Input";
import { ItemsContainer } from "./components/ItemsContainer";
import { store } from "./redux/store";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Todo App</h1>
      <Provider store={store}>
        <Input />
        <ItemsContainer />
      </Provider>
    </div>
  );
}

export default App;
