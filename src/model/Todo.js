export class Todo {
    constructor({ id, title, completed, created_at, updated_at, due_date, groupName, description }) {
        this.id = id;
        this.title = title;
        this.completed = completed;
        this.created_at = new Date(created_at);
        this.updated_at = new Date(updated_at);
        this.due_date = due_date ? new Date(due_date) : null;
        this.groupName = groupName || null;
        this.description = description || null;
    }

    get timeLeft() {
        if (!this.due_date) return 'No due date';
        
        const now = new Date();
        const remaining = this.due_date - now;
        
        if (remaining < 0) {
            const overdue = Math.abs(remaining);
            const days = Math.floor(overdue / (1000 * 60 * 60 * 24));
            const hours = Math.floor((overdue % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((overdue % (1000 * 60 * 60)) / (1000 * 60));
            
            if (days > 0) {
                return `Overdue by ${days}d ${hours}h ${minutes}m`;
            } else if (hours > 0) {
                return `Overdue by ${hours}h ${minutes}m`;
            } else {
                return `Overdue by ${minutes}m`;
            }
        }
        
        const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
        
        if (days > 0) {
            return `${days}d ${hours}h ${minutes}m left`;
        } else if (hours > 0) {
            return `${hours}h ${minutes}m left`;
        } else if (minutes > 0) {
            return `${minutes}m left`;
        } else {
            return 'Due now';
        }
    }

    get formattedDueDate() {
        if (!this.due_date) return 'No due date';
        
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        };
        
        return this.due_date.toLocaleDateString('en-US', options);
    }
}