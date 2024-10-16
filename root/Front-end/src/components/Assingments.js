import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Assignments = () => {
    const [work, setWork] = useState([]);
    const [assg, setAssg] = useState("");
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

  
    useEffect(() => {
        const fetchFiles = async () => {
            setLoading(true);
            setError("");
            try {
                const response = await axios.get('http://localhost:3003/api/pdfs'); 
                setWork(response.data); 
            } catch (err) {
                console.error('Error fetching files:', err);
                setError('Error fetching files. Please try again later.'); 
            } finally {
                setLoading(false);
            }
        };

        fetchFiles();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        if (file) {
            formData.append('pdf', file);
        }

        if (assg.trim()) {
            formData.append('title', assg); 
        }

        try {
            const response = await axios.post('http://localhost:3003/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setWork([...work, response.data]); 
            setFile(null);
            setAssg("");
        } catch (err) {
            console.error('Error uploading file:', err);
            setError('Error uploading file. Please try again.'); 
        }
    };

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Assignments</h1>

            <div className="text-center my-5">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex justify-center">
                        <input
                            placeholder="Add new assignments"
                            className="bg-gray-200 text-gray-700 px-4 py-2 w-80 rounded-md border border-gray-300 focus:outline-none focus:border-blue-400"
                            value={assg}
                            onChange={(e) => setAssg(e.target.value)}
                            type="text"
                        />
                        <input
                            type="file"
                            accept=".pdf"
                            className="ml-2 py-2 px-4 bg-blue-50 border border-blue-400 rounded-md cursor-pointer text-gray-700"
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                        <button className="bg-green-500 text-white px-4 py-2 rounded-md ml-4 hover:bg-green-600 transition duration-300">
                            ADD
                        </button>
                    </div>
                </form>
                {error && <p className="text-red-500 mt-2">{error}</p>} 
            </div>

            <div className="flex justify-center mt-8">
                <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
                    {loading ? (
                        <p className="text-gray-600 text-center">Loading...</p>
                    ) : work.length > 0 ? (
                        <ul className="space-y-4">
                            {work.map((data) => (
                                <li key={data._id} className="flex justify-between items-center bg-gray-100 p-4 rounded-md shadow-sm">
                                    <span className="text-gray-800 text-lg font-medium">{data.title || "Untitled"}</span>
                                    <a
                                        href={`http://localhost:3003/api/pdfs/${data._id}`} 
                                        download
                                        className="text-blue-600 hover:underline"
                                    >
                                        Download
                                    </a>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <h1 className="text-xl text-gray-600 text-center">No assignments available</h1>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Assignments;
