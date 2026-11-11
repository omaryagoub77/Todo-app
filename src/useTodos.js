import { useEffect, useState } from "react";
import { STARTER_TODOS } from "./data";
import { loadTodos, saveTodos } from "./storage";

export function useTodos() {
  const [todos, setTodos] = useState(() => loadTodos(STARTER_TODOS));

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  function addTodo(text) {
    const trimmed = text.trim();
    if (!trimmed) return;

    setTodos((prev) => [
      ...prev,
      {
        // UUIDs remain unique even after tasks are deleted.
        id: crypto.randomUUID(),
        text: trimmed,
        completed: false,
      },
    ]);
  }

  function toggleTodo(id) {
    // Return a new array and a new object for the changed task.
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  function deleteTodo(id) {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }

  function updateTodo(id, text) {
    const trimmed = text.trim();
    if (!trimmed) return;

    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, text: trimmed } : todo))
    );
  }

  function clearCompleted() {
    // Filtering avoids in-place mutation and removes adjacent completed tasks reliably.
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  }

  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
    clearCompleted,
  };
}
