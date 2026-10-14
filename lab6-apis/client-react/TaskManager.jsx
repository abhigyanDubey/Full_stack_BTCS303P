import React, { useState, useEffect } from "react";

const API_URL = "http://localhost:5000";
const API_KEY = "mysecretkey123";

export default function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const loadTasks = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${API_URL}/api/tasks`);
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || `Request failed: ${response.status}`);
      }
      const data = await response.json();
      setTasks(data);
    } catch (err) {
      setError(err.message || "Unable to load tasks.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    try {
      const response = await fetch(`${API_URL}/api/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY
        },
        body: JSON.stringify({ title: newTaskTitle, completed: false })
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || `Failed to add task (${response.status})`);
      }

      const created = await response.json();
      setTasks([...tasks, created]);
      setNewTaskTitle("");
    } catch (err) {
      setError(err.message || "Failed to add task.");
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      const response = await fetch(`${API_URL}/api/tasks/${id}`, {
        method: "DELETE",
        headers: {
          "x-api-key": API_KEY
        }
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || `Failed to delete task (${response.status})`);
      }

      setTasks(tasks.filter((t) => t.id !== id));
    } catch (err) {
      setError(err.message || "Failed to delete task.");
    }
  };

  const handleTest404 = async () => {
    try {
      setError("");
      const response = await fetch(`${API_URL}/api/tasks/9999`);
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || `Resource Not Found (HTTP ${response.status})`);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Task Manager</h1>

      <form onSubmit={handleAddTask} style={styles.form}>
        <input
          type="text"
          placeholder="Enter new task"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Add Task
        </button>
      </form>

      <div style={styles.btnRow}>
        <button onClick={loadTasks} style={styles.secondaryBtn}>
          Reload with Axios
        </button>
        <button onClick={handleTest404} style={styles.secondaryBtn}>
          Test 404
        </button>
      </div>

      {loading && <p style={styles.loading}>Loading tasks...</p>}
      {error && <p style={styles.error}>{error}</p>}

      <ul style={styles.list}>
        {tasks.map((task) => (
          <li key={task.id} style={styles.item}>
            <span>
              {task.title} - {task.completed ? "Completed" : "Pending"}
            </span>
            <button
              onClick={() => handleDeleteTask(task.id)}
              style={styles.deleteBtn}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "40px auto",
    padding: "24px",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    backgroundColor: "#ffffff",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    fontFamily: "Arial, sans-serif"
  },
  heading: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px"
  },
  form: {
    display: "flex",
    gap: "10px",
    marginBottom: "12px"
  },
  input: {
    flex: 1,
    padding: "8px 12px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "14px"
  },
  button: {
    padding: "8px 16px",
    border: "1px solid #999",
    borderRadius: "4px",
    backgroundColor: "#f5f5f5",
    cursor: "pointer",
    fontSize: "14px"
  },
  btnRow: {
    display: "flex",
    gap: "10px",
    marginBottom: "16px"
  },
  secondaryBtn: {
    padding: "6px 12px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    backgroundColor: "#fafafa",
    cursor: "pointer",
    fontSize: "13px"
  },
  loading: {
    color: "#666",
    fontStyle: "italic"
  },
  error: {
    color: "#b00020",
    backgroundColor: "#ffebee",
    padding: "8px 12px",
    borderRadius: "4px",
    fontSize: "14px"
  },
  list: {
    listStyleType: "none",
    padding: 0,
    margin: 0
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 12px",
    border: "1px solid #eee",
    borderRadius: "4px",
    marginBottom: "8px"
  },
  deleteBtn: {
    padding: "4px 10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    backgroundColor: "#fff",
    cursor: "pointer",
    fontSize: "13px"
  }
};
