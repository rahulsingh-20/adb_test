import React from "react";
import useForm from "../hooks/useForm";

const TodoForm = ({ onAdd }) => {
  const [values, handleChange, reset] = useForm({ text: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(values.text).then(() => reset());
  };

  return (
    <div>
      <h1>Create a ToDo</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="todo">ToDo: </label>
          <input
            type="text"
            name="text"
            value={values.text}
            onChange={handleChange}
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
