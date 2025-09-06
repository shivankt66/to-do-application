import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/tasks");
    }else{
      navigate("/login");
    }
  }, [navigate]);

  const fetchTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!title) return;
    const res = await API.post("/tasks", { title });
    setTasks([...tasks, res.data]);
    fetchTasks();
    setTitle("");
  };

  const toggleTask = async (id, completed) => {
    const res = await API.put(`/tasks/${id}`, { completed: !completed });
    setTasks(tasks.map((t) => (t._id === id ? res.data : t)));
  };

  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    setTasks(tasks.filter((t) => t._id !== id));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-2 sm:px-4">
      <div className="bg-white shadow-lg rounded-2xl p-4 sm:p-6 w-full max-w-md sm:max-w-lg md:max-w-2xl">
        <h2 className="text-xl sm:text-2xl font-bold text-center text-blue-600 mb-4 sm:mb-6">
          Your Tasks ✅
        </h2>

        {/* Add Task Form */}
        <form
          onSubmit={addTask}
          className="flex flex-col sm:flex-row gap-2 mb-4 sm:mb-6"
        >
          <input
            placeholder="Enter a new task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 px-3 sm:px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm sm:text-base"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg transition text-sm sm:text-base"
          >
            Add
          </button>
        </form>

        {/* Tasks List */}
        <ul className="space-y-2 sm:space-y-3">
          {tasks.length > 0 ? (
            tasks.map((t) => (
              <li
                key={t._id}
                className="flex justify-between items-center bg-gray-50 px-3 sm:px-4 py-2 rounded-lg shadow-sm"
              >
                <span
                  onClick={() => toggleTask(t._id, t.completed)}
                  className={`cursor-pointer break-words ${
                    t.completed ? "line-through text-gray-400" : "text-gray-800"
                  }`}
                >
                  {t.title}
                </span>
                <button
                  onClick={() => deleteTask(t._id)}
                  className="text-red-500 hover:text-red-600 transition text-lg sm:text-xl"
                >
                  ❌
                </button>
              </li>
            ))
          ) : (
            <p className="text-center text-gray-500 text-sm sm:text-base">
              No tasks yet. Add one above!
            </p>
          )}
        </ul>
      </div>
    </div>
  );
}
