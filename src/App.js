import { Input } from "./components/Input";
import { ItemsContainer } from "./components/ItemsContainer";
import { Loader } from "./components/Loader";
import { useSelector } from "react-redux";
import { itemsSelector } from "./redux/reducers/itemsSlice";
import "./App.css";
import { Notify } from "./components/Notify";

/**
 * The main component of the Todo application.
 *
 * This component sets up the structure of the app, including the title, input form,
 * and the container for displaying todo items.
 *
 * @component
 * @returns {JSX.Element} The JSX code for the Todo application's main component.
 */
function App() {
  const { loading } = useSelector(itemsSelector);
  return (
    <div className="App">
      <Notify />
      <h1>Todo App</h1>
      {loading ? (
        <div className="loader-container">
          <Loader />
        </div>
      ) : null}
      <Input />
      <ItemsContainer />
    </div>
  );
}

export default App;
