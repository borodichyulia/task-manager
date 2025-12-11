import React, {useState, useEffect} from 'react';
import {tasksAPI, authAPI, tasksGuestAPI} from '../services/api';
import TaskForm from './TaskForm';
import TaskItem from './TaskItem';

const TaskList = ({user, guestId, onLogout}) => {
    const [tasks, setTasks] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingTask, setEditingTask] = useState(null);

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        try {
            const response = guestId
                ? await tasksGuestAPI.getAll(guestId)
                : await tasksAPI.getAll();

            setTasks(response.data);
        } catch (error) {
            console.error('Failed to load tasks:', error);
        }
    };

    const handleCreateTask = async (taskData) => {
        try {
            guestId
                ? await tasksGuestAPI.create(taskData, guestId)
                : await tasksAPI.create(taskData);

            setShowForm(false);
            loadTasks();
        } catch (error) {
            alert('Failed to create task: ' + error.message);
        }
    };

    const handleUpdateTask = async (id, taskData) => {
        try {
            guestId
                ? await tasksGuestAPI.update(id, taskData, guestId)
                : await tasksAPI.update(id, taskData);
            setEditingTask(null);
            loadTasks();
        } catch (error) {
            alert('Failed to update task: ' + error.message);
        }
    };

    const handleDeleteTask = async (id) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                guestId
                    ? await tasksGuestAPI.delete(id, guestId)
                    : await tasksAPI.delete(id);
                loadTasks();
            } catch (error) {
                alert('Failed to delete task: ' + error.message);
            }
        }
    };

    const handleLogout = async () => {
        try {
            await authAPI.logout();
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            onLogout();
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">My Tasks</h1>
                <div className="flex items-center gap-4">
                    <span className="text-gray-600">Hello, {user.name}</span>
                    {guestId ? null : (
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-200 font-medium"
                        >
                            Logout
                        </button>
                    )}
                </div>
            </div>

            {/* Add Task Button */}
            <button
                onClick={() => setShowForm(!showForm)}
                className={`mb-6 px-6 py-3 rounded-md font-medium transition duration-200 ${
                    showForm
                        ? 'bg-gray-500 hover:bg-gray-600 text-white'
                        : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
            >
                {showForm ? 'Cancel' : 'Add New Task'}
            </button>

            {/* Task Form */}
            {showForm && (
                <TaskForm
                    onSubmit={handleCreateTask}
                    onCancel={() => setShowForm(false)}
                />
            )}

            {/* Task List */}
            <div className="space-y-4">
                {tasks.map(task => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        onEdit={setEditingTask}
                        onUpdate={handleUpdateTask}
                        onDelete={handleDeleteTask}
                        isEditing={editingTask === task.id}
                    />
                ))}
                {tasks.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No tasks yet. Create your first task!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TaskList;