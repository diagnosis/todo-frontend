

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
            const remaining = this.due_date - new Date();
            return remaining < 0 ? 'Overdue' : `${Math.ceil(remaining / (1000 * 60 * 60))} hours`;
        }
    }