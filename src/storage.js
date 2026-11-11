const STORAGE_KEY = "desklist.todos";

export function loadTodos(fallback = []) {
  const getFallback = () =>
    Array.isArray(fallback)
      ? fallback.map((todo) =>
          todo && typeof todo === "object" ? { ...todo } : todo
        )
      : [];

  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    // Missing or blank storage starts with a safe copy of the supplied fallback.
    if (raw === null || raw.trim() === "") return getFallback();

    const parsed = JSON.parse(raw);

    // Ignore valid JSON with an invalid top-level shape.
    if (!Array.isArray(parsed)) return getFallback();

    return parsed.map((todo) =>
      todo && typeof todo === "object" ? { ...todo } : todo
    );
  } catch (error) {
    console.error("Failed to load todos from storage:", error);
    return getFallback();
  }
}

export function saveTodos(todos) {
  // Serialize the array so it can be restored by loadTodos.
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}
