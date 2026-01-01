'use client';

import {useState} from 'react';
import {User, Mail, Ghost, Heart, Moon, Sun, Check, X} from 'lucide-react';

export default function TestOne() {
    const [name, setName] = useState('John Doe');
    const [email, setEmail] = useState('john@example.com');
    const [tempName, setTempName] = useState('John Doe');
    const [tempEmail, setTempEmail] = useState('john@example.com');
    const [isEditing, setIsEditing] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [errors, setErrors] = useState({name: '', email: ''});

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateName = (name: string) => {
        return name.trim().length >= 2;
    };

    const handleSave = () => {
        const newErrors = {name: '', email: ''};

        if (!validateName(tempName)) {
            newErrors.name = 'Name must be at least 2 characters long and upto 100 chars';
        }

        if (!validateEmail(tempEmail)) {
            newErrors.email = 'Please enter a valid email address';
        }

        setErrors(newErrors);

        if (!newErrors.name && !newErrors.email) {
            setName(tempName);
            setEmail(tempEmail);
            setIsEditing(false);
        }
    };

    const handleCancel = () => {
        setTempName(name);
        setTempEmail(email);
        setErrors({name: '', email: ''});
        setIsEditing(false);
    };

    const handleEdit = () => {
        setTempName(name);
        setTempEmail(email);
        setIsEditing(true);
    };

    return (
        <div
            className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} py-4 sm:py-12 px-4`}>
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Profile Dashboard</h1>
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className={`p-3 rounded-lg transition-colors duration-200 ${
                            darkMode
                                ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400'
                                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                        }`}
                        aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
                    >
                        {darkMode ? <Sun className="w-6 h-6"/> : <Moon className="w-6 h-6"/>}
                    </button>
                </div>

                <div
                    className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-4 sm:p-8 transition-colors duration-300`}>
                    <div className="flex flex-col sm:flex-row items-center sm:space-x-6 space-y-4 sm:space-y-0 mb-8">
                        <div
                            className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-3xl sm:text-5xl font-bold text-white shadow-lg">
                            {name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 text-center sm:text-left">
                            {isEditing ? (
                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="name-input" className="sr-only">Name</label>
                                        <input
                                            id="name-input"
                                            value={tempName}
                                            onChange={(e) => setTempName(e.target.value)}
                                            className={`text-2xl sm:text-3xl font-bold bg-transparent border-b-2 focus:outline-none transition-colors w-full ${
                                                errors.name
                                                    ? 'border-red-500'
                                                    : 'border-blue-500 focus:border-blue-600'
                                            } ${darkMode ? 'text-white' : 'text-gray-900'}`}
                                            placeholder="Enter your name"
                                        />
                                        {errors.name && (
                                            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label htmlFor="email-input" className="sr-only">Email</label>
                                        <input
                                            id="email-input"
                                            type="email"
                                            value={tempEmail}
                                            onChange={(e) => setTempEmail(e.target.value)}
                                            className={`text-lg sm:text-xl bg-transparent border-b-2 focus:outline-none transition-colors w-full ${
                                                errors.email
                                                    ? 'border-red-500'
                                                    : 'border-blue-500 focus:border-blue-600'
                                            } ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
                                            placeholder="Enter your email"
                                        />
                                        {errors.email && (
                                            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <h2 className="text-2xl sm:text-3xl font-bold mb-2">{name}</h2>
                                    <p className={`text-lg sm:text-xl flex items-center justify-center sm:justify-start gap-2 ${
                                        darkMode ? 'text-gray-300' : 'text-gray-600'
                                    }`}>
                                        <Mail className="w-5 h-5"/> {email}
                                    </p>
                                </>
                            )}
                            <div className="mt-4 flex gap-2 justify-center sm:justify-start">
                                {isEditing ? (
                                    <>
                                        <button
                                            onClick={handleSave}
                                            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 flex items-center gap-2"
                                            aria-label="Save changes"
                                        >
                                            <Check className="w-4 h-4"/> Save
                                        </button>
                                        <button
                                            onClick={handleCancel}
                                            className={`px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2 ${
                                                darkMode
                                                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                            }`}
                                            aria-label="Cancel editing"
                                        >
                                            <X className="w-4 h-4"/> Cancel
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        onClick={handleEdit}
                                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
                                        aria-label="Edit profile"
                                    >
                                        Edit Profile
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                        <div
                            className={`text-center p-4 sm:p-6 rounded-lg transition-all duration-200 hover:scale-105 ${
                                darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                            }`}>
                            <Ghost className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-2 text-blue-500"/>
                            <p className="text-xl sm:text-2xl font-bold">42</p>
                            <p className={`text-sm sm:text-base ${
                                darkMode ? 'text-gray-300' : 'text-gray-600'
                            }`}>Posts</p>
                        </div>
                        <div
                            className={`text-right p-4 sm:p-6 rounded-lg transition-all duration-200 hover:scale-105 ${
                                darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                            }`}>
                            <User className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-2 text-green-500"/>
                            <p className="text-xl sm:text-2xl font-bold">1.2k</p>
                            <p className={`text-sm sm:text-base ${
                                darkMode ? 'text-gray-300' : 'text-gray-600'
                            }`}>Followers</p>
                        </div>
                        <div
                            className={`text-left p-4 sm:p-6 rounded-lg transition-all duration-200 hover:scale-105 ${
                                darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                            }`}>
                            <Heart className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-2 text-red-500"/>
                            <p className="text-xl sm:text-2xl font-bold">9.5k</p>
                            <p className={`text-sm sm:text-base ${
                                darkMode ? 'text-gray-300' : 'text-gray-600'
                            }`}>Likes</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
