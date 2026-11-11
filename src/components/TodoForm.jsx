import React, { useState } from "react";

export default function TodoForm({ onAdd }) {
  const [text, setText] = useState("");

  function handleSubmit(event) {
    // Keep form submission in React and discard whitespace-only tasks.
    event.preventDefault();
    if (!text.trim()) return;

    onAdd(text.trim());
    setText("");
  }

  return (
    <form className="composer" onSubmit={handleSubmit}>
      <label className="field">
        <span className="field-label">New task</span>
        <input
          type="text"
          name="task"
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Add a task"
          autoComplete="off"
        />
      </label>
      <button className="primary" type="submit">
        Add
      </button>
    </form>
  );
}
