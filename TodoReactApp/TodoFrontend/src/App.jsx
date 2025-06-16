import { useEffect, useState } from "react";
import { BiTrash, BiCheckCircle, BiCircle } from "react-icons/bi";
import { getAllTodos, toggleTodo, addTodo, deleteTodo } from "./service/todoService";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await getAllTodos(); // ⬅️ You missed `()` in your code
      setTodos(response.data);
    } catch (err) {
      console.error("Failed to fetch todos:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const res = await addTodo({ title, completed: false });
      setTodos([...todos, res.data]);
      setTitle("");
    } catch (err) {
      console.error("Failed to add todo:", err);
    }
  };

  const handleToggle = async (id) => {
    try {
      const res = await toggleTodo(id);
      setTodos(todos.map(todo => (todo.id === id ? res.data : todo)));
    } catch (err) {
      console.error("Failed to toggle todo:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (err) {
      console.error("Failed to delete todo:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-4 p-4 bg-white shadow-md rounded-xl max-w-md mx-auto mt-6"
      >
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter Todo"
          className="flex-1 border rounded px-3 py-2 outline-none"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          ADD
        </button>
      </form>

      <div className="max-w-md mx-auto mt-6 space-y-3">
        {todos.length === 0 ? (
          <p className="text-center text-gray-500">No Todos</p>
        ) : (
          todos.map((todo) => (
            <div
              key={todo.id}
              className="flex items-center justify-between p-3 bg-white rounded shadow"
            >
              <div className="flex items-center gap-3">
                <button onClick={() => handleToggle(todo.id)}>
                  {todo.completed ? (
                    <BiCheckCircle className="text-green-600 text-2xl" />
                  ) : (
                    <BiCircle className="text-gray-400 text-2xl" />
                  )}
                </button>
                <span
                  className={`text-base ${
                    todo.completed ? "line-through text-gray-500" : ""
                  }`}
                >
                  {todo.title}
                </span>
              </div>
              <button onClick={() => handleDelete(todo.id)}>
                <BiTrash className="text-red-500 hover:text-red-700 text-xl" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
