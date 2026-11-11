import React from "react";
const OPTIONS = [
  ["all", "All", "all"],
  ["active", "Active", "active"],
  ["completed", "Completed", "completed"],
];

export default function TodoFilters({ filter, counts, onFilter }) {
  // Keep the visual and accessible selection in sync with the current filter.
  return (
    <div className="filters" role="group" aria-label="Filter tasks">
      {OPTIONS.map(([value, label, countKey]) => (
        <button
          key={value}
          type="button"
          className={filter === value ? "chip is-selected" : "chip"}
          aria-pressed={filter === value}
          onClick={() => onFilter(value)}
        >
          <span>{label}</span>
          <span className="count">{counts[countKey]}</span>
        </button>
      ))}
    </div>
  );
}
