'use client';

import { useState } from 'react';
import { User, Mail, Ghost, Heart, Moon, Sun } from 'lucide-react';

export default function TestOne() {
    const [name, setName] = useState('John Doe');
    const [email, setEmail] = useState('john@example.com');
    const [isEditing, setIsEditing] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    return (
        <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} py-12 px-4`}>
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-end mb-6">
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="p-3 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700"
                    >
                        {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
                    </button>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                    <div className="flex items-center space-x-6 mb-8">
                        <div className="w-32 h-32 bg-blue-500 rounded-full flex items-center justify-center text-5xl font-bold text-white">
                            {name.charAt(0)}
                        </div>
                        <div>
                            {isEditing ? (
                                <div className="space-y-4">
                                    <input
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="text-3xl font-bold bg-transparent border-b-2 border-blue-500 focus:outline-none"
                                    />
                                    <input
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="text-xl text-gray-600 dark:text-gray-400 bg-transparent border-b-2 border-blue-500 focus:outline-none"
                                    />
                                </div>
                            ) : (
                                <>
                                    <h1 className="text-3xl font-bold">{name}</h1>
                                    <p className="text-xl text-gray-600 dark:text-gray-400 flex items-center gap-2">
                                        <Mail className="w-5 h-5" /> {email}
                                    </p>
                                </>
                            )}
                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                {isEditing ? 'Save' : 'Edit Profile'}
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-6">
                        <div className="text-center p-6 bg-gray-100 dark:bg-gray-700 rounded-lg">
                            <Ghost className="w-10 h-10 mx-auto mb-2 text-blue-500" />
                            <p className="text-2xl font-bold">42</p>
                            <p className="text-gray-600 dark:text-gray-400">Posts</p>
                        </div>
                        <div className="text-center p-6 bg-gray-100 dark:bg-gray-700 rounded-lg">
                            <User className="w-10 h-10 mx-auto mb-2 text-green-500" />
                            <p className="text-2xl font-bold">1.2k</p>
                            <p className="text-gray-600 dark:text-gray-400">Followers</p>
                        </div>
                        <div className="text-center p-6 bg-gray-100 dark:bg-gray-700 rounded-lg">
                            <Heart className="w-10 h-10 mx-auto mb-2 text-red-500" />
                            <p className="text-2xl font-bold">8.5k</p>
                            <p className="text-gray-600 dark:text-gray-400">Likes</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}