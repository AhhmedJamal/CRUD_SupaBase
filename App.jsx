import { useEffect, useState } from "react";
import "./App.css";
import supabase from "./supabase-client";
function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(false);

  // red task from supabase
  const getTodos = async () => {
    const { data, error } = await supabase.from("todo").select("*");
    if (error) {
      console.log(error);
    } else {
      setTodos(data);
    }
  };
  // add task to supabase
  const addTodo = async () => {
    setLoading(true);
    if (!newTodo) return;
    const newTodoData = {
      text: newTodo,
      isDone: false,
    };
    const { data, error } = await supabase
      .from("todo")
      .insert([newTodoData])
      .single();
    if (error) {
      console.error(error);
    } else {
      setTodos([...todos, data]);
      setNewTodo("");
    }
    getTodos();
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  // delete task from supabase
  const deleteTodo = async (id) => {
    const { error } = await supabase.from("todo").delete().eq("id", id);
    if (error) {
      console.error(error);
    } else {
      setTodos(todos.filter((todo) => todo.id !== id));
    }
  };
  // update task from supabase
  const updateTodo = async (id, isDone) => {
    const { error } = await supabase
      .from("todo")
      .update({ isDone: !isDone })
      .eq("id", id);
    if (error) {
      console.error(error);
    } else {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, isDone: !isDone } : todo
        )
      );
    }
  };

  useEffect(() => {
    getTodos();
  }, []);
  return (
    <>
      <h1>Todo List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Enter new todo"
      />
      <button onClick={addTodo} disabled={loading}>
        {loading ? "Loading..." : "Add Todo"}
      </button>
      <ul>
        {todos?.map((todo, index) => (
          <li key={index}>
            {todo?.text}
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            <button onClick={() => updateTodo(todo.id, todo?.isDone)}>
              {todo?.isDone ? "Undo" : "Done"}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
