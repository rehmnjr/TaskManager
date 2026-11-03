import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5055/api/Tasks",
  headers: {
    "Content-Type": "application/json",
  },
});

// GET: Fetch all tasks or filtered tasks
export const getTasks = (status, priority) => {
  return API.get("/", {
    params: {
      ...(status && { status }),
      ...(priority && { priority }),
    },
  });
};

// POST: Create task
export const createTask = (task) => {
  return API.post("/", task);
};

// PUT: Update complete task
export const updateTask = (id, task) => {
  return API.put(`/${id}`, task);
};

// PATCH: Update only task status
export const updateTaskStatus = (id, status) => {
  return API.patch(`/${id}/status`, { status });
};

// DELETE: Delete task
export const deleteTask = (id) => {
  return API.delete(`/${id}`);
};