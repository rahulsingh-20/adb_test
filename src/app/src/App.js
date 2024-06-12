import React, { useState } from "react";
import "./App.css";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";

export function App() {
  const [refresh, setRefresh] = useState(false);

  const handleAddTodo = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="App">
      <TodoList refresh={refresh} />
      <TodoForm onAdd={handleAddTodo} />
    </div>
  );
}

export default App;
