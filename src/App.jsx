import { useState, useEffect } from 'react';
import './App.css';
import { TodoService } from './service/todoService';
import TodoItem from './components/TodoItem';

function App() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState({ title: '', completed: false, due_date: '', groupName: '', description: '' });

    useEffect(() => {
        TodoService.getAllTodos().then(setTodos).catch(console.error);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const fullDueDate = newTodo.due_date ? `${newTodo.due_date}T00:00:00Z` : '';
        TodoService.createTodo({ ...newTodo, due_date: fullDueDate })
            .then(todo => setTodos([...todos, todo]))
            .catch(console.error);
        setNewTodo({ title: '', completed: false, due_date: '', groupName: '', description: '' });
    };

    const handleDelete = (id) => {
        TodoService.deleteTodo(id).then(() => setTodos(todos.filter(todo => todo.id !== id))).catch(console.error);
    };

    const handleEdit = (id) => {
        // Implement edit logic later
        console.log(`Edit todo with id: ${id}`);
    };

    return (
        <>
            <h1>TASK TRACKER</h1>
            <form onSubmit={handleSubmit}>
                <input value={newTodo.title} onChange={e => setNewTodo({ ...newTodo, title: e.target.value })} placeholder="Title" required />
                <input type="date" value={newTodo.due_date} onChange={e => setNewTodo({ ...newTodo, due_date: e.target.value })} />
                <input value={newTodo.groupName} onChange={e => setNewTodo({ ...newTodo, groupName: e.target.value })} placeholder="Group" />
                <input value={newTodo.description} onChange={e => setNewTodo({ ...newTodo, description: e.target.value })} placeholder="Description" />
                <button type="submit">Add Todo</button>
            </form>
            <div className="container">
                {todos.map(todo => (
                    <TodoItem key={todo.id} todo={todo} onDelete={handleDelete} onEdit={handleEdit} />
                ))}
            </div>
        </>
    );
}

export default App;