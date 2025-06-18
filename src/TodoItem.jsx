import './App.css';

function TodoItem({ id, title, description, completed, due_date, groupName }) {
    const dueDateStr = due_date === '0001-01-01T00:00:00Z' ? 'No due date' : new Date(due_date).toLocaleDateString();
    return (
        <div className="todo-item">
            <p>
                {id}. {title} - {description || 'No description'} -{' '}
                {completed ? 'Done' : 'Pending'} - Group: {groupName || 'None'} - Due: {dueDateStr}
            </p>
        </div>
    );
}

export default TodoItem;