import axios from "axios";
import {Todo} from "../model/Todo.js";


const API_URL = 'https://todo-app-4-oz22.onrender.com';


export class TodoService {
    static async createTodo(todoData) {
        const fullDueDate = todoData.due_date ? `${todoData.due_date}T00:00:00Z` : '';
        const response = await axios.post(`${API_URL}/todos`, { ...todoData, due_date: fullDueDate });
        return new Todo(response.data);
    }
    static async getAllTodos() {
        const response = await axios.get(`${API_URL}/todos`);
        return response.data.map(todo=>new Todo(todo));
    }
    static async getTodo(id) {
        const response = await axios.get(`${API_URL}/todos/${id}`);
        const data = await response.data;
        return new Todo(data.data);
    }
   
}