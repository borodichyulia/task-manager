import React, { useState, useEffect } from 'react';

const TaskForm = ({ onSubmit, onCancel, task }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'pending',
    });

    useEffect(() => {
        if (task) {
            setFormData({
                title: task.title,
                description: task.description || '',
                status: task.status,
            });
        }
    }, [task]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        if (!task) {
            setFormData({ title: '', description: '', status: 'pending' });
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="mb-5 p-6 border border-gray-300 rounded-lg bg-white shadow-sm"
        >
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>
            <div className="mb-4">
                <textarea
                    placeholder="Description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical min-h-20"
                />
            </div>
            <div className="mb-4">
                <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="done">Done</option>
                </select>
            </div>
            <div className="flex gap-2">
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-200 font-medium"
                >
                    {task ? 'Update' : 'Create'} Task
                </button>
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition duration-200 font-medium"
                    >
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
};

export default TaskForm;