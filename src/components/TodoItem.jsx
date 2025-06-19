export default function TodoItem({ todo, taskNumber, onDelete, onEdit }) {
    return (
        <div className={`todo-card ${todo.completed ? 'completed' : ''}`}>
            <div className="todo-header">
                <h3 className="todo-title">{todo.title}</h3>
                <span className="todo-id">#{taskNumber}</span>
            </div>
            
            {todo.description && (
                <p className="todo-description">{todo.description}</p>
            )}
            
            <div className="todo-meta">
                <div className="meta-item">
                    <span className="meta-label">Status</span>
                    <span className={`status-badge ${todo.completed ? 'status-completed' : 'status-pending'}`}>
                        {todo.completed ? 'Completed' : 'Pending'}
                    </span>
                </div>
                <div className="meta-item">
                    <span className="meta-label">Group</span>
                    <span className="meta-value">{todo.groupName || 'None'}</span>
                </div>
                {todo.due_date && (
                    <div className="meta-item">
                        <span className="meta-label">Due Date</span>
                        <span className="meta-value">{todo.formattedDueDate}</span>
                    </div>
                )}
                <div className="meta-item">
                    <span className="meta-label">Time Remaining</span>
                    <span className={`meta-value ${todo.timeLeft.includes('Overdue') ? 'overdue' : ''}`}>
                        {todo.timeLeft}
                    </span>
                </div>
            </div>
            
            <div className="todo-actions">
                {onEdit && (
                    <button className="action-btn edit-btn" onClick={() => onEdit(todo.id)}>
                        Edit
                    </button>
                )}
                {onDelete && (
                    <button className="action-btn delete-btn" onClick={() => onDelete(todo.id)}>
                        Delete
                    </button>
                )}
            </div>
        </div>
    );
}