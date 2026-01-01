'use client';

import { useState, useEffect } from 'react';
import { Trash2, Plus } from 'lucide-react';

type Task = {
    id: number;
    text: string;
    completed: boolean;
    priority: 'Low' | 'Medium' | 'High';
};

export default function TestTwo() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState('');
    const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>('Medium');

    // Load from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('tasks');
        if (saved) setTasks(JSON.parse(saved));
    }, []);

    // Save to localStorage on change
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = () => {
        if (newTask.trim()) {
            setTasks([...tasks, { id: Date.now(), text: newTask, completed: false, priority }]);
            setNewTask('');
        }
    };

    const toggleTask = (id: number) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    const deleteTask = (id: number) => {
        setTasks(tasks.filter(t => t.id !== id));
    };

    const getPriorityColor = (p: string) => {
        switch (p) {
            case 'High': return 'bg-red-100 text-red-800';
            case 'Medium': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-green-100 text-green-800';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-8">Task Management</h1>

                <div className="bg-white rounded-xl shadow-lg p-8">
                    <div className="flex gap-4 mb-8">
                        <input
                            type="text"
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && addTask()}
                            placeholder="Add a new task..."
                            className="flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <select
                            value={priority}
                            onChange={(e) => setPriority(e.target.value as any)}
                            className="px-4 py-3 border rounded-lg"
                        >
                            <option>Low</option>
                            <option>Medium</option>
                            <option>High</option>
                        </select>
                        <button
                            onClick={addTask}
                            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2"
                        >
                            <Plus className="w-5 h-5" /> Add
                        </button>
                    </div>

                    <ul className="space-y-4">
                        {tasks.map(task => (
                            <li key={task.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => toggleTask(task.id)}
                                    className="w-6 h-6"
                                />
                                <span className={`flex-1 ${task.completed ? 'line-through text-gray-500' : ''}`}>
                  {task.text}
                </span>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(task.priority)}`}>
                  {task.priority}
                </span>
                                <button
                                    onClick={() => deleteTask(task.id)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </li>
                        ))}
                    </ul>

                    {tasks.length === 0 && (
                        <p className="text-center text-gray-500 py-8">No tasks yet. Add one above!</p>
                    )}
                </div>
            </div>
        </div>
    );
}