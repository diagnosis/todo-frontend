export default function TodoListItem({ todo, taskNumber, onDelete, onEdit, onToggleStatus }) {
    const handleToggleStatus = () => {
        onToggleStatus(todo.id, !todo.completed);
    };

    return (
        <div className={`todo-list-item ${todo.completed ? 'completed' : ''}`}>
            <div className="list-item-main">
                <div className="list-item-content">
                    <div className="list-item-header">
                        <span className="list-item-id">#{taskNumber}</span>
                        <h3 className="list-item-title">{todo.title}</h3>
                    </div>
                    <div className="list-item-meta">
                        <span className="list-meta-item">
                            <span className="list-meta-label">Group:</span>
                            <span className="list-meta-value">{todo.groupName || 'None'}</span>
                        </span>
                        <span className="list-meta-item">
                            <span className="list-meta-label">Time:</span>
                            <span className={`list-meta-value ${todo.timeLeft.includes('Overdue') ? 'overdue' : ''}`}>
                                {todo.timeLeft}
                            </span>
                        </span>
                    </div>
                </div>
                
                <div className="list-item-controls">
                    <div className="list-status-toggle">
                        <label className="toggle-switch">
                            <input 
                                type="checkbox" 
                                checked={todo.completed}
                                onChange={handleToggleStatus}
                            />
                            <span className="toggle-slider"></span>
                        </label>
                    </div>
                    
                    <div className="list-item-actions">
                        {onEdit && (
                            <button 
                                className="list-action-btn edit-btn" 
                                onClick={() => onEdit(todo.id)}
                                title="Edit task"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                                </svg>
                            </button>
                        )}
                        {onDelete && (
                            <button 
                                className="list-action-btn delete-btn" 
                                onClick={() => onDelete(todo.id)}
                                title="Delete task"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                                </svg>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}