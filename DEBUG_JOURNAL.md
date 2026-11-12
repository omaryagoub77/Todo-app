# Debug journal

## File

`src/storage.js`

- What I saw: The list could fail to load cleanly when localStorage was empty, blank, or contained invalid JSON. I also noticed the app was reusing stored objects instead of safe copies.
- Why it happened: The storage loader tried to parse whatever was in localStorage without guarding for missing/blank values or malformed data, and it returned the original objects rather than cloned versions.
- What I changed: I added a safe fallback that restores the starter list when storage is empty or invalid, and I clone each todo object before returning it so the saved state does not get mutated by accident.
- How I checked it: I reviewed the loading logic and confirmed it now falls back to a clean array instead of crashing or returning broken data when the saved value is missing or invalid.

## File

`src/components/TodoForm.jsx`

- What I saw: The app was allowing blank or whitespace-only tasks to be added, which created empty entries and disrupted the list.
- Why it happened: The submit handler only checked whether the raw input string had any length, so strings like spaces still passed through.
- What I changed: I kept the form in React, prevented the default submit action, trimmed the input, and ignored any task that became empty after trimming.
- How I checked it: I checked the submit flow and verified that only valid text is added while blank input is discarded.

## File

`src/components/TodoFilters.jsx`

- What I saw: The chosen filter button did not always match the active state shown to the user, so the UI could look out of sync with the list.
- Why it happened: The filter buttons were rendered without making their selected class and pressed state depend on the current filter value in a consistent way.
- What I changed: I tied the selected styling and `aria-pressed` state directly to the active filter value so each filter button clearly reflects the current view.
- How I checked it: I compared the active filter value with each button state and confirmed the selected chip updates when the filter changes.

## File

`src/useTodos.js`

- What I saw: The todo state could become unreliable when items were added, toggled, updated, or cleared because some updates were mutating arrays and objects rather than creating new ones.
- Why it happened: The state setters were returning modified versions in place or reusing object references, which can cause React to miss updates and lead to inconsistent render behavior.
- What I changed: I switched to immutable updates, used `crypto.randomUUID()` for new task IDs, and replaced the mutation-prone logic with fresh arrays and objects for every change.
- How I checked it: I reviewed each state update and confirmed they now return new objects/arrays instead of mutating the existing todo list.

## File

`src/components/TodoItem.jsx`

- What I saw: Editing a task was inconsistent when Escape was pressed or when the input lost focus, and deletion could trigger during render instead of from a click.
- Why it happened: The edit flow reused a cancellation flag that could remain stuck, and the delete action was not deliberately deferred until the user clicked the button.
- What I changed: I reset the cancel flag when editing starts, kept the draft synced with the current task text, ensured invalid blank names revert to the previous value, and moved deletion to the click handler so it only runs as intended.
- How I checked it: I traced the edit lifecycle and verified the cancel/commit flow restores the last valid text and the delete button only fires when clicked.

## File

`src/App.jsx`

- What I saw: The searched list and the remaining count did not always reflect the current view correctly, especially for case-insensitive searches and active tasks.
- Why it happened: The component was comparing raw task text without normalizing it and the remaining counter was not based on the actual number of unfinished tasks.
- What I changed: I normalized the query and note text with `toLowerCase()` and trimming, applied the active/completed filter before the search, and calculated the remaining value from the active task count.
- How I checked it: I reviewed the memoized filtering logic and confirmed the visible list, empty-state message, and item count match the current filter and query.
