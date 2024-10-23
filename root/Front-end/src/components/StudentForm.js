import React, { useState } from 'react';
import axios from 'axios';

const StudentForm = () => {
    const [name, setName] = useState('');
    const [className, setClassName] = useState('');
    const [regno, setRegno] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission

        // Clear previous messages
        setMessage('');
        setError('');
        try {
            // Make API call to add the student
            const response = await axios.post('http://localhost:3003/student', { name, className, regno });
            setMessage(response.data.message); // Success message
            // Reset form fields
            setName('');
            setClassName('');
            setRegno('');
        } catch (err) {
            // Handle errors and display error messages
            if (err.response) {
                setError(err.response.data.message || 'Error saving student');
            } else {
                setError('An unexpected error occurred');
            }
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8">
            <h2 className="text-2xl font-semibold mb-4">Add Student</h2>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="className">
                        Class Name
                    </label>
                    <input
                        type="text"
                        id="className"
                        value={className}
                        onChange={(e) => setClassName(e.target.value)}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="regno">
                        Registration Number
                    </label>
                    <input
                        type="text"
                        id="regno"
                        value={regno}
                        onChange={(e) => setRegno(e.target.value)}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Add Student
                    </button>
                </div>
            </form>
            {message && <div className="text-green-500">{message}</div>}
            {error && <div className="text-red-500">{error}</div>}
        </div>
    );
};

export default StudentForm;
