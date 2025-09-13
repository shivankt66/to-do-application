import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import { io } from "socket.io-client"; // Add this


export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  // Setup socket connection
  useEffect(() => {
    const socket = io(process.env.REACT_APP_SOCKET_URL, {
      auth: { token: localStorage.getItem("token") }
    });

    socket.on("taskUpdated", () => {
      fetchTasks();
    });

    return () => {
      socket.disconnect();
    };
  },);

  const fetchTasks = useCallback(async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      }
    }
  }, [navigate]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addTask = async (e) => {
    e.preventDefault();
    try {
      if (!title) return;
      await API.post("/tasks", { title });
      fetchTasks();
      setTitle("");
      // Optionally, emit event here if backend doesn't do it
      // socket.emit("taskUpdated");
    } catch (err) {
      if (err.response && err.response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      }
    }
  };

  const toggleTask = async (id, completed) => {
    try {
      await API.put(`/tasks/${id}`, { completed: !completed });
      fetchTasks();
    } catch (err) {
      if (err.response && err.response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      }
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      if (err.response && err.response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      }
    }
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
                  className={`cursor-pointer break-words ${t.completed ? "line-through text-gray-400" : "text-gray-800"
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
            <li className="text-center text-gray-500 text-sm sm:text-base">
              No tasks yet. Add one above!
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
