import React, { useState } from 'react';
import axios from 'axios';

interface Task {
    idTasks: number;
    title: string;
    description: string;
    dueDate: string;
    status: 'pending' | 'in progress' | 'completed';
    assignedUser: number;
}

interface NewTaskCardProps {
    onTaskCreated: () => void,
    userId? : number
}

export default function NewTaskCard({ onTaskCreated, userId }: NewTaskCardProps) {
    const [title, setTitle] = useState<string | null>('')
    const [description, setDescription] = useState<string | null>('')
    const [dueDate, setDueDate] = useState<string | null>('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!title || !description || !dueDate || userId === undefined) {
            alert('Please fill out all fields.');
            return;
        }

        const newTask: Omit<Task, 'idTasks'> = {
            title,
            description,
            dueDate,
            status: 'pending',
            assignedUser : userId,
        };

        try {
            const response = await axios.post('http://localhost:3001/api/tasks', newTask);
            console.log('Task created:', response.data);
            onTaskCreated();
        } catch (error) {
            console.error('Error creating task', error);
        }
    };

    return (
        <div className="card bg-base-100 w-1/3 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">Create a New Task</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-control mb-2">
                        <label className="label">
                            <span className="label-text">Title</span>
                        </label>
                        <input
                            type="text"
                            className="input input-bordered"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-control mb-2">
                        <label className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <textarea
                            className="textarea textarea-bordered"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <div className="form-control mb-2">
                        <label className="label">
                            <span className="label-text">Due Date</span>
                        </label>
                        <input
                            type="date"
                            className="input input-bordered"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            required
                        />
                    </div>
                    <div className="card-actions justify-end">
                        <button type="submit" className="btn btn-primary">
                            Create Task
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
