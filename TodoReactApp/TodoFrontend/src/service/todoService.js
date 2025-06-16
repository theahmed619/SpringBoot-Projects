import axios from "axios";

const BASE_URL = "http://localhost:8090"; // Change if needed

export const getAllTodos = () => axios.get(`${BASE_URL}/showall`);
export const addTodo = (todo) => axios.post(`${BASE_URL}/add`, todo);
export const toggleTodo = (id) => axios.put(`${BASE_URL}/toggle/${id}`);
export const deleteTodo = (id) => axios.delete(`${BASE_URL}/delete/${id}`);
