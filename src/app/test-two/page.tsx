'use client';

import { useState, useEffect } from 'react';
import TaskItem from '../../components/TaskItem';

type Task = {
    id: number;
    text: string;
    completed: boolean;
    priority: 'Low' | 'Medium' | 'High';
};

type FilterType = 'all' | 'active' | 'completed';
type SortType = 'priority' | 'created' | 'alphabetical';

export default function TestTwo() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState('');
    const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>('Medium');
    const [filter, setFilter] = useState<FilterType>('all');
    const [sort, setSort] = useState<SortType>('created');

    // Load from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('tasks');
        if (saved) {
            try {
                setTasks(JSON.parse(saved));
            } catch (error) {
                console.error('Failed to load tasks:', error);
                localStorage.removeItem('tasks');
            }
        }
    }, []);

    // Save to localStorage on change
    useEffect(() => {
        if (tasks.length > 0) {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }, [tasks]);

    const addTask = () => {
        if (newTask.trim()) {
            setTasks([...tasks, { id: Date.now(), text: newTask.trim(), completed: false, priority }]);
            setNewTask('');
        }
    };

    const toggleTask = (id: number) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    const deleteTask = (id: number) => {
        setTasks(tasks.filter(t => t.id !== id));
    };

    const editTask = (id: number, text: string) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, text } : t));
    };

    const clearCompleted = () => {
        setTasks(tasks.filter(t => !t.completed));
    };

    const filteredTasks = tasks.filter(task => {
        if (filter === 'active') return !task.completed;
        if (filter === 'completed') return task.completed;
        return true;
    });

    const sortedTasks = [...filteredTasks].sort((a, b) => {
        if (sort === 'priority') {
            const priorityOrder = { High: 3, Medium: 2, Low: 1 };
            return priorityOrder[b.priority] - priorityOrder[a.priority];
        }
        if (sort === 'alphabetical') {
            return a.text.localeCompare(b.text);
        }
        return b.id - a.id; // created (newest first)
    });

    const stats = {
        total: tasks.length,
        completed: tasks.filter(t => t.completed).length,
        active: tasks.filter(t => !t.completed).length
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-6 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Task Manager</h1>
                    <div className="flex justify-center gap-6 text-sm text-gray-600">
                        <span>Total: {stats.total}</span>
                        <span>Active: {stats.active}</span>
                        <span>Completed: {stats.completed}</span>
                    </div>
                </div>

                {/* User Info Form */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">User Information</h2>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your name"
                            className="flex-1 px-4 py-3 text-gray-900 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
                        />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Your email"
                            className="flex-1 px-4 py-3 text-gray-900 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
                        />
                    </div>
                    {(name || email) && (
                        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                            <p className="text-sm text-blue-800">
                                {name && <span>Name: <strong>{name}</strong></span>}
                                {name && email && <span className="mx-2">•</span>}
                                {email && <span>Email: <strong>{email}</strong></span>}
                            </p>
                        </div>
                    )}
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                    {/* Add Task Form */}
                    <div className="flex flex-col sm:flex-row gap-3 mb-6">
                        <input
                            type="text"
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && addTask()}
                            placeholder="What needs to be done?"
                            className="flex-1 px-4 py-3 text-gray-900 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
                            style={{ color: '#1f2937', backgroundColor: '#ffffff' }}
                        />
                        <select
                            value={priority}
                            onChange={(e) => setPriority(e.target.value as any)}
                            className="px-4 py-3 text-gray-900 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            style={{ color: '#1f2937', backgroundColor: '#ffffff' }}
                        >
                            <option value="Low" style={{ color: '#1f2937' }}>🟢 Low Priority</option>
                            <option value="Medium" style={{ color: '#1f2937' }}>🟡 Medium Priority</option>
                            <option value="High" style={{ color: '#1f2937' }}>🔴 High Priority</option>
                        </select>
                        <button
                            onClick={addTask}
                            disabled={!newTask.trim()}
                            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 min-w-[120px] shadow-md"
                        >
                            ➕ Add Task
                        </button>
                    </div>

                    {/* Filters and Controls */}
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 p-4 bg-gray-100 rounded-lg border">
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setFilter('all')}
                                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm ${
                                    filter === 'all' 
                                        ? 'bg-blue-600 text-white shadow-md' 
                                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                                }`}
                            >
                                📋 All ({stats.total})
                            </button>
                            <button
                                onClick={() => setFilter('active')}
                                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm ${
                                    filter === 'active' 
                                        ? 'bg-blue-600 text-white shadow-md' 
                                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                                }`}
                            >
                                ⏳ Active ({stats.active})
                            </button>
                            <button
                                onClick={() => setFilter('completed')}
                                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm ${
                                    filter === 'completed' 
                                        ? 'bg-blue-600 text-white shadow-md' 
                                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                                }`}
                            >
                                ✅ Done ({stats.completed})
                            </button>
                        </div>
                        
                        <div className="flex gap-2 items-center">
                            <select
                                value={sort}
                                onChange={(e) => setSort(e.target.value as SortType)}
                                className="px-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                                style={{ color: '#1f2937', backgroundColor: '#ffffff' }}
                            >
                                <option value="created" style={{ color: '#1f2937' }}>📅 Sort by Created</option>
                                <option value="priority" style={{ color: '#1f2937' }}>⭐ Sort by Priority</option>
                                <option value="alphabetical" style={{ color: '#1f2937' }}>🔤 Sort A-Z</option>
                            </select>
                            
                            {stats.completed > 0 && (
                                <button
                                    onClick={clearCompleted}
                                    className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 text-sm transition-all shadow-md"
                                >
                                    🗑️ Clear Done
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Tasks List */}
                    {sortedTasks.length > 0 ? (
                        <ul className="space-y-3">
                            {sortedTasks.map(task => (
                                <TaskItem
                                    key={task.id}
                                    task={task}
                                    onToggle={toggleTask}
                                    onDelete={deleteTask}
                                    onEdit={editTask}
                                />
                            ))}
                        </ul>
                    ) : (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">📝</div>
                            <p className="text-gray-700 text-lg font-medium">
                                {filter === 'all' ? 'No tasks yet. Add one above!' :
                                 filter === 'active' ? 'No active tasks!' :
                                 'No completed tasks!'}
                            </p>
                        </div>
                    )}
                </div>

                {/* Keyboard Shortcuts Help */}
                <div className="bg-white rounded-lg shadow-md border p-4 text-sm">
                    <p className="font-bold mb-2 text-gray-800">💡 Quick Tips:</p>
                    <ul className="space-y-1 text-gray-700">
                        <li>• Press <kbd className="px-2 py-1 bg-gray-200 rounded text-xs font-mono">Enter</kbd> to add a task</li>
                        <li>• Click on task text to edit</li>
                        <li>• Press <kbd className="px-2 py-1 bg-gray-200 rounded text-xs font-mono">Enter</kbd> to save, <kbd className="px-2 py-1 bg-gray-200 rounded text-xs font-mono">Escape</kbd> to cancel</li>
                        <li>• Click delete twice to confirm removal</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}