


export default function TodoItem({ todo, onDelete, onEdit }) {

    const itemStyle = { textDecoration: todo.completed ? 'line-through' : 'none', color: todo.completed ? '#a0a0a0' : '#e0e0e0' };
    return (
        <div className={`todo-item ${todo.completed ? 'completed' : ''}`} style={itemStyle}>
            <p>
                {todo.id}. {todo.title} - {todo.description || `No description`} - {''}
                {todo.completed ? 'Done' : 'Pending'} - Group: {todo.groupName || 'None'} - Due: {todo.timeLeft}
            </p>
            {onEdit && <button onClick={()=>onEdit(todo.id)}>Edit</button>}
            {onDelete && <button onClick={()=>onDelete(todo.id)}>Delete</button>}
        </div>
    )
}