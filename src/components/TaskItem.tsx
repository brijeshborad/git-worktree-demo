'use client';

import { useState } from 'react';

type Task = {
    id: number;
    text: string;
    completed: boolean;
    priority: 'Low' | 'Medium' | 'High';
};

type TaskItemProps = {
    task: Task;
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
    onEdit: (id: number, text: string) => void;
};

export default function TaskItem({ task, onToggle, onDelete, onEdit }: TaskItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(task.text);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const handleEdit = () => {
        if (editText.trim()) {
            onEdit(task.id, editText.trim());
            setIsEditing(false);
        }
    };

    const handleDelete = () => {
        if (showDeleteConfirm) {
            onDelete(task.id);
        } else {
            setShowDeleteConfirm(true);
            setTimeout(() => setShowDeleteConfirm(false), 3000);
        }
    };

    const getPriorityColor = (p: string) => {
        switch (p) {
            case 'High': return 'bg-red-100 text-red-900 border-red-300';
            case 'Medium': return 'bg-yellow-100 text-yellow-900 border-yellow-300';
            default: return 'bg-green-100 text-green-900 border-green-300';
        }
    };

    return (
        <li className={`flex items-center gap-3 p-4 bg-white rounded-lg border-2 border-gray-200 transition-all hover:shadow-md hover:border-blue-300 ${task.completed ? 'opacity-70' : ''}`}>
            <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggle(task.id)}
                className="w-5 h-5 text-blue-600 bg-white border-2 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
            />
            
            {isEditing ? (
                <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') handleEdit();
                        if (e.key === 'Escape') setIsEditing(false);
                    }}
                    onBlur={handleEdit}
                    className="flex-1 px-3 py-2 text-gray-900 bg-white border-2 border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    style={{ color: '#1f2937', backgroundColor: '#ffffff' }}
                    autoFocus
                />
            ) : (
                <span 
                    className={`flex-1 cursor-pointer font-medium ${
                        task.completed 
                            ? 'line-through text-gray-500' 
                            : 'text-gray-900 hover:text-blue-600'
                    }`}
                    onClick={() => setIsEditing(true)}
                    style={{ color: task.completed ? '#6b7280' : '#1f2937' }}
                >
                    {task.text}
                </span>
            )}
            
            <span className={`px-3 py-1 rounded-full text-xs font-bold border-2 ${getPriorityColor(task.priority)}`}>
                {task.priority}
            </span>
            
            <button
                onClick={handleDelete}
                className={`px-3 py-2 rounded-lg text-sm font-bold transition-all ${
                    showDeleteConfirm 
                        ? 'bg-red-500 text-white hover:bg-red-600 shadow-md' 
                        : 'text-red-600 bg-red-50 hover:bg-red-100 border border-red-200'
                }`}
            >
                {showDeleteConfirm ? 'Confirm' : '✕'}
            </button>
        </li>
    );
}