import { useState, useEffect } from 'react';
import './App.css';
import { TodoService } from './service/todoService';
import TodoItem from './components/TodoItem.jsx';
import TodoListItem from './components/TodoListItem.jsx';
import TaskModal from './components/TaskModal.jsx';

function App() {
    const [todos, setTodos] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTodo, setEditingTodo] = useState(null);
    const [viewMode, setViewMode] = useState(() => {
        // Default to list view on mobile, card view on desktop
        return window.innerWidth <= 768 ? 'list' : 'card';
    });

    useEffect(() => {
        TodoService.getAllTodos().then(setTodos).catch(console.error);
    }, []);

    // Handle window resize to update default view
    useEffect(() => {
        const handleResize = () => {
            // Only auto-switch if user hasn't manually changed view
            const currentWidth = window.innerWidth;
            if (currentWidth <= 768 && viewMode === 'card') {
                setViewMode('list');
            } else if (currentWidth > 768 && viewMode === 'list') {
                setViewMode('card');
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [viewMode]);

    const handleAddTask = () => {
        setEditingTodo(null);
        setIsModalOpen(true);
    };

    const handleEditTask = (id) => {
        const todoToEdit = todos.find(todo => todo.id === id);
        if (todoToEdit) {
            // Convert the todo back to form format
            const formData = {
                title: todoToEdit.title,
                completed: todoToEdit.completed,
                due_date: todoToEdit.due_date ? todoToEdit.due_date.toISOString().split('T')[0] : '',
                due_time: todoToEdit.due_date ? todoToEdit.due_date.toTimeString().slice(0, 5) : '',
                groupName: todoToEdit.groupName || '',
                description: todoToEdit.description || ''
            };
            setEditingTodo({ ...todoToEdit, ...formData });
            setIsModalOpen(true);
        }
    };

    const handleToggleStatus = (id, newStatus) => {
        const todoToUpdate = todos.find(todo => todo.id === id);
        if (todoToUpdate) {
            const updateData = {
                title: todoToUpdate.title,
                completed: newStatus,
                due_date: todoToUpdate.due_date ? todoToUpdate.due_date.toISOString() : null,
                groupName: todoToUpdate.groupName || '',
                description: todoToUpdate.description || ''
            };

            TodoService.updateTodo(id, updateData)
                .then(updatedTodo => {
                    setTodos(todos.map(todo => 
                        todo.id === id ? updatedTodo : todo
                    ));
                })
                .catch(console.error);
        }
    };

    const handleModalSubmit = (todoData) => {
        let fullDueDate = '';
        
        if (todoData.due_date) {
            // If user provided a date, use it
            const time = todoData.due_time || '23:59';
            const localDateTime = `${todoData.due_date}T${time}:00`;
            const dateObj = new Date(localDateTime);
            fullDueDate = dateObj.toISOString();
        } else {
            // If no date provided, default to January 1st of next year at 23:59
            const nextYear = new Date().getFullYear() + 1;
            const time = todoData.due_time || '23:59';
            const defaultDate = new Date(`${nextYear}-01-01T${time}:00`);
            fullDueDate = defaultDate.toISOString();
        }

        const finalTodoData = { 
            ...todoData, 
            due_date: fullDueDate 
        };

        if (editingTodo) {
            // Update existing todo
            TodoService.updateTodo(editingTodo.id, finalTodoData)
                .then(updatedTodo => {
                    setTodos(todos.map(todo => 
                        todo.id === editingTodo.id ? updatedTodo : todo
                    ));
                    setIsModalOpen(false);
                    setEditingTodo(null);
                })
                .catch(console.error);
        } else {
            // Create new todo
            TodoService.createTodo(finalTodoData)
                .then(todo => {
                    setTodos([...todos, todo]);
                    setIsModalOpen(false);
                })
                .catch(console.error);
        }
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setEditingTodo(null);
    };

    const handleDelete = (id) => {
        TodoService.deleteTodo(id)
            .then(() => setTodos(todos.filter(todo => todo.id !== id)))
            .catch(console.error);
    };

    // Sort todos by due date (earliest first, then by creation date)
    const sortedTodos = [...todos].sort((a, b) => {
        // If both have due dates, sort by due date
        if (a.due_date && b.due_date) {
            return new Date(a.due_date) - new Date(b.due_date);
        }
        // If only one has a due date, prioritize it
        if (a.due_date && !b.due_date) return -1;
        if (!a.due_date && b.due_date) return 1;
        // If neither has due date, sort by creation date (newest first)
        return new Date(b.created_at) - new Date(a.created_at);
    });

    return (
        <div className="app">
            <header className="app-header">
                <h1 className="app-title">Task Tracker</h1>
                <p className="app-subtitle">Organize your life, one task at a time</p>
            </header>

            <div className="add-task-section">
                <button className="add-task-btn" onClick={handleAddTask}>
                    + Add New Task
                </button>
            </div>

            <div className="todos-container">
                <div className="todos-header">
                    <h2 className="todos-title">Your Tasks</h2>
                    <div className="todos-controls">
                        <span className="todos-count">{todos.length} tasks</span>
                        <div className="view-toggle">
                            <button 
                                className={`view-btn ${viewMode === 'card' ? 'active' : ''}`}
                                onClick={() => setViewMode('card')}
                                title="Card View"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 0h6v6h-6v-6z"/>
                                </svg>
                            </button>
                            <button 
                                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                                onClick={() => setViewMode('list')}
                                title="List View"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                
                {todos.length === 0 ? (
                    <div className="empty-state">
                        <h3>No tasks yet!</h3>
                        <p>Click "Add New Task" above to get started.</p>
                    </div>
                ) : (
                    <div className={viewMode === 'card' ? 'todos-grid' : 'todos-list'}>
                        {sortedTodos.map((todo, index) => 
                            viewMode === 'card' ? (
                                <TodoItem 
                                    key={todo.id} 
                                    todo={todo} 
                                    taskNumber={index + 1}
                                    onDelete={handleDelete} 
                                    onEdit={handleEditTask}
                                    onToggleStatus={handleToggleStatus}
                                />
                            ) : (
                                <TodoListItem 
                                    key={todo.id} 
                                    todo={todo} 
                                    taskNumber={index + 1}
                                    onDelete={handleDelete} 
                                    onEdit={handleEditTask}
                                    onToggleStatus={handleToggleStatus}
                                />
                            )
                        )}
                    </div>
                )}
            </div>

            <TaskModal 
                isOpen={isModalOpen}
                onClose={handleModalClose}
                onSubmit={handleModalSubmit}
                editingTodo={editingTodo}
            />
        </div>
    );
}

export default App;