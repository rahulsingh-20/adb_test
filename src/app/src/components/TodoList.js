import React, { useEffect, useState } from "react";

const TodoList = ({ refresh }) => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/todos/")
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((error) => console.error("Error fetching todos:", error));
  }, [refresh]);

  return (
    <div>
      <h1>List of TODOs</h1>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </div>
  );
};

export default TodoList;
