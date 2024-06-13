const API_URL = "http://localhost:8000/todos/";

export const fetchTodos = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Error fetching todos");
  }
  return await response.json();
};

export const addTodo = async (text) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  if (!response.ok) {
    throw new Error("Error adding todo");
  }
  return await response.json();
};
