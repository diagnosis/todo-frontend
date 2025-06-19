import { useState, useEffect } from 'react';

export default function TaskModal({ isOpen, onClose, onSubmit, editingTodo }) {
    const [formData, setFormData] = useState({
        title: '',
        completed: false,
        due_date: '',
        due_time: '',
        groupName: '',
        description: ''
    });

    // Update form data when editingTodo changes
    useEffect(() => {
        if (editingTodo) {
            setFormData({
                title: editingTodo.title || '',
                completed: editingTodo.completed || false,
                due_date: editingTodo.due_date || '',
                due_time: editingTodo.due_time || '',
                groupName: editingTodo.groupName || '',
                description: editingTodo.description || ''
            });
        } else {
            // Reset form for new task
            setFormData({
                title: '',
                completed: false,
                due_date: '',
                due_time: '',
                groupName: '',
                description: ''
            });
        }
    }, [editingTodo, isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    if (!isOpen) return null;

    // Get today's date in YYYY-MM-DD format for min attribute
    const today = new Date().toISOString().split('T')[0];

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2 className="modal-title">
                        {editingTodo ? 'Edit Task' : 'Add New Task'}
                    </h2>
                    <button className="modal-close" onClick={onClose}>×</button>
                </div>

                <form className="modal-form" onSubmit={handleSubmit}>
                    <div className="form-grid">
                        <div className="input-group">
                            <label className="input-label">Task Title</label>
                            <input 
                                className="form-input"
                                value={formData.title} 
                                onChange={e => handleInputChange('title', e.target.value)} 
                                placeholder="What needs to be done?" 
                                required 
                            />
                        </div>
                        <div className="input-group">
                            <label className="input-label">Due Date (Optional)</label>
                            <input 
                                className="form-input"
                                type="date" 
                                min={today}
                                value={formData.due_date} 
                                onChange={e => handleInputChange('due_date', e.target.value)} 
                                placeholder="Defaults to Jan 1st next year"
                            />
                            <small className="input-hint">
                                Select any date from today onwards. Defaults to January 1st, {new Date().getFullYear() + 1}
                            </small>
                        </div>
                        <div className="input-group">
                            <label className="input-label">Due Time (Optional)</label>
                            <input 
                                className="form-input"
                                type="time" 
                                value={formData.due_time} 
                                onChange={e => handleInputChange('due_time', e.target.value)} 
                                placeholder="Defaults to 11:59 PM"
                            />
                            <small className="input-hint">
                                Defaults to 11:59 PM
                            </small>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="input-group">
                            <label className="input-label">Group</label>
                            <input 
                                className="form-input"
                                value={formData.groupName} 
                                onChange={e => handleInputChange('groupName', e.target.value)} 
                                placeholder="Work, Personal, etc." 
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="input-group">
                            <label className="input-label">Description</label>
                            <textarea 
                                className="form-input form-textarea"
                                value={formData.description} 
                                onChange={e => handleInputChange('description', e.target.value)} 
                                placeholder="Add more details about this task..." 
                                rows="3"
                            />
                        </div>
                    </div>
                    {editingTodo && (
                        <div className="form-row">
                            <div className="input-group">
                                <label className="checkbox-label">
                                    <input 
                                        type="checkbox"
                                        checked={formData.completed}
                                        onChange={e => handleInputChange('completed', e.target.checked)}
                                    />
                                    <span className="checkbox-text">Mark as completed</span>
                                </label>
                            </div>
                        </div>
                    )}
                    <div className="modal-actions">
                        <button type="button" className="cancel-btn" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="submit-btn">
                            {editingTodo ? 'Update Task' : 'Add Task'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}