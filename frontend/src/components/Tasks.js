import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import Layout from "../layout/layout";

export const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [editingTask, setEditingTask] = useState(null);
  const [editTaskData, setEditTaskData] = useState({
    title: "",
    description: ""
  });
  const token = Cookies.get("tokenCookie");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/tasks/", {
        headers: {
          Authorization: `Token ${token}`
        }
      });
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast.error("Failed to fetch tasks");
    }
  };

  const handleInputChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/api/tasks/", newTask, {
        headers: {
          Authorization: `Token ${token}`
        }
      });
      setNewTask({ title: "", description: "" });
      fetchTasks();
      toast.success("Task added successfully");
    } catch (error) {
      console.error("Error adding task:", error);
      toast.error("Failed to add task");
    }
  };

  const handleToggleComplete = async (taskId, completed) => {
    try {
      await axios.patch(
        `http://127.0.0.1:8000/api/tasks/${taskId}/`,
        { completed: !completed },
        {
          headers: {
            Authorization: `Token ${token}`
          }
        }
      );
      fetchTasks();
      toast.success("Task updated successfully");
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Failed to update task");
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/tasks/${taskId}/`, {
        headers: {
          Authorization: `Token ${token}`
        }
      });
      fetchTasks();
      toast.success("Task deleted successfully");
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task");
    }
  };

  const handleEditInputChange = (e) => {
    setEditTaskData({ ...editTaskData, [e.target.name]: e.target.value });
  };

  const handleEditTask = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        `http://127.0.0.1:8000/api/tasks/${editingTask.id}/`,
        editTaskData,
        {
          headers: {
            Authorization: `Token ${token}`
          }
        }
      );
      setEditingTask(null);
      setEditTaskData({ title: "", description: "" });
      fetchTasks();
      toast.success("Task updated successfully");
    } catch (error) {
      console.error("Error editing task:", error);
      toast.error("Failed to edit task");
    }
  };

  return (
    <Layout>
      <div className="container mt-4">
        <h1>Manage Tasks</h1>
        <form onSubmit={handleAddTask} className="mb-4">
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              name="title"
              value={newTask.title}
              onChange={handleInputChange}
              placeholder="Task Title"
              required
            />
          </div>
          <div className="mb-3">
            <textarea
              className="form-control"
              name="description"
              value={newTask.description}
              onChange={handleInputChange}
              placeholder="Task Description"
              required
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">
            Add Task
          </button>
        </form>

        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>
                  <button
                    className={`btn btn-sm ${
                      task.completed ? "btn-success" : "btn-secondary"
                    }`}
                    onClick={() =>
                      handleToggleComplete(task.id, task.completed)
                    }
                    disabled={task.completed} // Disable the button if the task is completed
                  >
                    {task.completed ? "Completed" : "Mark Complete"}
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-sm btn-warning ms-2"
                    onClick={() => {
                      setEditingTask(task);
                      setEditTaskData({
                        title: task.title,
                        description: task.description
                      });
                    }}
                    disabled={task.completed} // Disable the button if the task is completed
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {editingTask && (
          <div className="edit-task-form">
            <h2>Edit Task</h2>
            <form onSubmit={handleEditTask}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={editTaskData.title}
                  onChange={handleEditInputChange}
                  placeholder="Task Title"
                  required
                />
              </div>
              <div className="mb-3">
                <textarea
                  className="form-control"
                  name="description"
                  value={editTaskData.description}
                  onChange={handleEditInputChange}
                  placeholder="Task Description"
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">
                Update Task
              </button>
              <button
                type="button"
                className="btn btn-secondary ms-2"
                onClick={() => setEditingTask(null)}
              >
                Cancel
              </button>
            </form>
          </div>
        )}
      </div>
    </Layout>
  );
};
