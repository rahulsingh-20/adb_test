import React, { useState } from "react";
import styles from "./App.module.css";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import useTodos from "./hooks/useTodos";

export function App() {
  const [refresh, setRefresh] = useState(false);
  const { todos, addTodo } = useTodos(refresh);

  const handleAddTodo = (text) => {
    return addTodo(text).then(() => setRefresh(!refresh));
  };

  return (
    <div className={styles.App}>
      <TodoList todos={todos} />
      <TodoForm onAdd={handleAddTodo} />
    </div>
  );
}

export default App;
