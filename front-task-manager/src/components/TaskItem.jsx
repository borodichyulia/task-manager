import React, { useState } from 'react';
import TaskForm from './TaskForm';

const TaskItem = ({ task, onEdit, onUpdate, onDelete, isEditing }) => {
    const [showDetails, setShowDetails] = useState(false);

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'bg-yellow-200 text-yellow-800';
            case 'in_progress': return 'bg-blue-200 text-blue-800';
            case 'done': return 'bg-green-200 text-green-800';
            default: return 'bg-gray-200 text-gray-800';
        }
    };

    const getStatusBorder = (status) => {
        switch (status) {
            case 'pending': return 'border-yellow-300';
            case 'in_progress': return 'border-blue-300';
            case 'done': return 'border-green-300';
            default: return 'border-gray-300';
        }
    };

    if (isEditing) {
        return (
            <TaskForm
                task={task}
                onSubmit={(taskData) => onUpdate(task.id, taskData)}
                onCancel={() => onEdit(null)}
            />
        );
    }

    return (
        <div className={`border rounded-lg mb-3 p-4 bg-white shadow-sm ${getStatusBorder(task.status)}`}>
            <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2 text-gray-800">{task.title}</h3>
                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                        {task.status.replace('_', ' ')}
                    </div>
                    <div className="text-sm text-gray-500 mt-2">
                        Created: {new Date(task.created_at).toLocaleDateString()}
                    </div>
                </div>
                <div className="flex gap-2 shrink-0">
                    <button
                        onClick={() => onEdit(task.id)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium transition duration-200"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => onDelete(task.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md text-sm font-medium transition duration-200"
                    >
                        Delete
                    </button>
                </div>
            </div>

            {task.description && (
                <div className="mt-3">
                    <button
                        onClick={() => setShowDetails(!showDetails)}
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm transition duration-200"
                    >
                        {showDetails ? 'Hide' : 'Show'} Description
                    </button>
                    {showDetails && (
                        <p className="mt-2 p-3 bg-gray-50 rounded-md text-gray-700 border border-gray-200">
                            {task.description}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default TaskItem;