import React, { useState } from "react";

const TodoForm = ({ onAdd }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:8000/todos/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    })
      .then((response) => response.json())
      .then((data) => {
        onAdd();
        setText("");
      })
      .catch((error) => console.error("Error adding todo:", error));
  };

  return (
    <div>
      <h1>Create a ToDo</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="todo">ToDo: </label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter todo"
            required
          />
        </div>
        <div style={{ marginTop: "5px" }}>
          <button type="submit">Add ToDo!</button>
        </div>
      </form>
    </div>
  );
};

export default TodoForm;
