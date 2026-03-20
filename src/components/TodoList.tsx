import { useState } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface Props {
  initialTodos?: Todo[];
}

export function TodoList({ initialTodos = [] }: Props) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([
        ...todos,
        { id: Date.now(), text: newTodo.trim(), completed: false }
      ]);
      setNewTodo("");
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  return (
    <div>
      <h1>Todo List</h1>

      <input
        data-testid="todo-input"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />

      <button data-testid="add-button" onClick={addTodo}>
        Add
      </button>

      <ul>
        {todos.map(todo => (
          <li key={todo.id} data-testid="todo-item" className={todo.completed ? "completed" : ""}>
            <input
              type="checkbox"
              data-testid="todo-checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span>{todo.text}</span>
            <button
              data-testid="delete-button"
              onClick={() => deleteTodo(todo.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      <div data-testid="todo-count">
        {todos.length} todos ({todos.filter(t => t.completed).length} completed)
      </div>
    </div>
  );
}