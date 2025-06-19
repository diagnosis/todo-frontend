import { useState, useEffect } from 'react';
import './App.css';
import { TodoService } from './service/todoService';
import TodoItem from './components/TodoItem';

function App() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState({ 
        title: '', 
        completed: false, 
        due_date: '', 
        due_time: '',
        groupName: '', 
        description: '' 
    });

    useEffect(() => {
        TodoService.getAllTodos().then(setTodos).catch(console.error);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        let fullDueDate = '';
        
        if (newTodo.due_date) {
            // If user provided a date, use it
            const time = newTodo.due_time || '23:59';
            const localDateTime = `${newTodo.due_date}T${time}:00`;
            const dateObj = new Date(localDateTime);
            fullDueDate = dateObj.toISOString();
        } else {
            // If no date provided, default to January 1st of next year at 23:59
            const nextYear = new Date().getFullYear() + 1;
            const time = newTodo.due_time || '23:59';
            const defaultDate = new Date(`${nextYear}-01-01T${time}:00`);
            fullDueDate = defaultDate.toISOString();
        }
        
        TodoService.createTodo({ 
            ...newTodo, 
            due_date: fullDueDate 
        })
            .then(todo => setTodos([...todos, todo]))
            .catch(console.error);
        
        setNewTodo({ 
            title: '', 
            completed: false, 
            due_date: '', 
            due_time: '',
            groupName: '', 
            description: '' 
        });
    };

    const handleDelete = (id) => {
        TodoService.deleteTodo(id)
            .then(() => setTodos(todos.filter(todo => todo.id !== id)))
            .catch(console.error);
    };

    const handleEdit = (id) => {
        // Implement edit logic later
        console.log(`Edit todo with id: ${id}`);
    };

    return (
        <div className="app">
            <header className="app-header">
                <h1 className="app-title">Task Tracker</h1>
                <p className="app-subtitle">Organize your life, one task at a time</p>
            </header>

            <form className="todo-form" onSubmit={handleSubmit}>
                <div className="form-grid">
                    <div className="input-group">
                        <label className="input-label">Task Title</label>
                        <input 
                            className="form-input"
                            value={newTodo.title} 
                            onChange={e => setNewTodo({ ...newTodo, title: e.target.value })} 
                            placeholder="What needs to be done?" 
                            required 
                        />
                    </div>
                    <div className="input-group">
                        <label className="input-label">Due Date (Optional)</label>
                        <input 
                            className="form-input"
                            type="date" 
                            value={newTodo.due_date} 
                            onChange={e => setNewTodo({ ...newTodo, due_date: e.target.value })} 
                            placeholder="Defaults to Jan 1st next year"
                        />
                        <small style={{ color: 'rgba(76, 82, 112, 0.6)', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                            Leave empty to default to January 1st, {new Date().getFullYear() + 1}
                        </small>
                    </div>
                    <div className="input-group">
                        <label className="input-label">Due Time (Optional)</label>
                        <input 
                            className="form-input"
                            type="time" 
                            value={newTodo.due_time} 
                            onChange={e => setNewTodo({ ...newTodo, due_time: e.target.value })} 
                            placeholder="Defaults to 11:59 PM"
                        />
                        <small style={{ color: 'rgba(76, 82, 112, 0.6)', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                            Defaults to 11:59 PM
                        </small>
                    </div>
                </div>
                <div className="form-row">
                    <div className="input-group">
                        <label className="input-label">Group</label>
                        <input 
                            className="form-input"
                            value={newTodo.groupName} 
                            onChange={e => setNewTodo({ ...newTodo, groupName: e.target.value })} 
                            placeholder="Work, Personal, etc." 
                        />
                    </div>
                </div>
                <div className="form-row">
                    <div className="input-group">
                        <label className="input-label">Description</label>
                        <input 
                            className="form-input"
                            value={newTodo.description} 
                            onChange={e => setNewTodo({ ...newTodo, description: e.target.value })} 
                            placeholder="Add more details about this task..." 
                        />
                    </div>
                </div>
                <div className="button-container">
                    <button className="submit-btn" type="submit">Add Task</button>
                </div>
            </form>

            <div className="todos-container">
                <div className="todos-header">
                    <h2 className="todos-title">Your Tasks</h2>
                    <span className="todos-count">{todos.length} tasks</span>
                </div>
                
                {todos.length === 0 ? (
                    <div className="empty-state">
                        <h3>No tasks yet!</h3>
                        <p>Add your first task above to get started.</p>
                    </div>
                ) : (
                    <div className="todos-grid">
                        {todos.map(todo => (
                            <TodoItem 
                                key={todo.id} 
                                todo={todo} 
                                onDelete={handleDelete} 
                                onEdit={handleEdit} 
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;