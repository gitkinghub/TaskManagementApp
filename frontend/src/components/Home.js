import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import Layout from "../layout/layout";

export const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState(""); // State for search input
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

  // Filtered tasks based on search input
  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description.toLowerCase().includes(search.toLowerCase()) ||
      new Date(task.created_at).toLocaleString().includes(search) ||
      new Date(task.updated_at).toLocaleString().includes(search) ||
      (task.completed ? "completed" : "ongoing").includes(search.toLowerCase())
  );

  return (
    <Layout>
      <div className="container mt-4">
        <h1>Task Overview</h1>

        {/* Search input */}
        <input
          type="text"
          className="form-control mb-4"
          placeholder="Search tasks"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task) => (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{new Date(task.created_at).toLocaleString()}</td>
                <td>{new Date(task.updated_at).toLocaleString()}</td>
                <td>{task.completed ? "Completed" : "Ongoing"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};
