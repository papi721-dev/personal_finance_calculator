# Allocation Editing & Persistence

## Features Added

### Editable Allocations

- Users can now edit the name, type (percent, fixed, remainder), and value of each allocation category.
- Users can add new allocation categories.

### Naming Allocations

- Each allocation can be renamed directly in the allocations table.

### Data Persistence

- All allocation changes are saved to the browser's localStorage.
- On reload, the app restores the last saved allocation set.

## Usage

- Edit allocation names, types, or values in the "Edit Allocations" section.
- Click "Save Allocations" to persist changes.
- Click "Add Allocation" to add a new category.

## Implementation Notes

- Data is stored as a JSON string in localStorage under the key `allocations`.
- The UI re-renders after each change to reflect the current state.

---

See also: `features.md` for the full feature list.
