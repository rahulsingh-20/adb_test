import { useState, useEffect } from "react";
import { fetchTodos, addTodo as apiAddTodo } from "../services/todoService";

const useTodos = (refresh) => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos()
      .then(setTodos)
      .catch((error) => console.error("Error fetching todos:", error));
  }, [refresh]);

  const addTodo = (text) => {
    return apiAddTodo(text).then((newTodo) => {
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      return newTodo;
    });
  };

  return { todos, addTodo };
};

export default useTodos;
