import axios from "axios";
import {Todo} from "../model/Todo.js";

const API_URL = 'http://localhost:3001/api';

export class TodoService {
    static async createTodo(todoData) {
        const response = await axios.post(`${API_URL}/todos`, todoData);
        return new Todo(response.data);
    }
    
    static async getAllTodos() {
        const response = await axios.get(`${API_URL}/todos`);
        return response.data.map(todo => new Todo(todo));
    }
    
    static async getTodo(id) {
        const response = await axios.get(`${API_URL}/todos/${id}`);
        return new Todo(response.data);
    }
    
    static async deleteTodo(id) {
        await axios.delete(`${API_URL}/todos/${id}`);
    }
    
    static async updateTodo(id, todoData) {
        const response = await axios.put(`${API_URL}/todos/${id}`, todoData);
        return new Todo(response.data);
    }
}