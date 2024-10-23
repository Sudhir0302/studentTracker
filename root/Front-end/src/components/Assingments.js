import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { FaTrash } from 'react-icons/fa';

const Assignments = () => {
    const [work, setWork] = useState([]);
    // const [reg, setReg] = useState("");
    const [sub, setSub] = useState("");
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pdfUrl, setPdfUrl] = useState("");

    const {user} =useAuth();

    useEffect(() => {
        const fetchFiles = async () => {
            console.log(user)
            setLoading(true);
            setError("");
            try {
                const response = await axios.get('http://localhost:3003/api/pdfs', {
                    params: { regno: user.regno },
                });
                setWork(response.data); 
            } catch (err) {
                console.error('Error fetching files:', err);
                setError('Error fetching files. Please try again later.'); 
            } finally {
                setLoading(false);
            }
        };

        fetchFiles();
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        if (file) {
            formData.append('pdf', file);
        }
        formData.append('regno', user.regno);
        formData.append('dept', user.dept);
        formData.append('section', user.section);
        if (sub.trim()) {
            formData.append('subject', sub); 
        }

        try {
            const response = await axios.post('http://localhost:3003/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setWork([...work, response.data]); 
            setFile(null);
            // setReg("");
            setSub("");
        } catch (err) {
            console.error('Error uploading file:', err);
            setError('Error uploading file. Please try again.'); 
        }
    };

    const handleViewPdf = (url) => {
        setPdfUrl(url);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setPdfUrl("");
    };

    const handledelete = async (_id) => {
        try {
          const res=await axios.delete(`http://localhost:3003/api/pdfs/delete/${_id}`);
          const listworks = work.filter((item) => item._id !== _id);
          setWork(listworks);
          console.log("deleteddd!!! :",res)
        } catch (error) {
          console.log(error);
        }
      };

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Assignments</h1>

            <div className="text-center my-5">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col items-center space-y-4">
                        {/* <input
                            placeholder="Enter regno (last 3 digits)"
                            className="bg-gray-200 text-gray-700 px-4 py-2 w-80 rounded-md border border-gray-300 focus:outline-none focus:border-blue-400"
                            value={assg}
                            onChange={(e) => setAssg(e.target.value)}
                            type="text"
                        /> */}
                        <input
                            placeholder="Subject name"
                            className="bg-gray-200 text-gray-700 px-4 py-2 w-80 rounded-md border border-gray-300 focus:outline-none focus:border-blue-400"
                            value={sub}
                            onChange={(e) => setSub(e.target.value)}
                            type="text"
                        />
                        <input
                            type="file"
                            accept=".pdf"
                            className="bg-blue-50 text-gray-700 px-4 py-2 w-80 rounded-md border border-blue-400 cursor-pointer"
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                        <button className="bg-green-500 text-white px-4 py-2 rounded-md w-80 hover:bg-green-600 transition duration-300">
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
                                    <span className="text-gray-800 text-lg font-medium">{data.regno || "Untitled"} - {data.subject}</span>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleViewPdf(`http://localhost:3003/api/pdfs/view/${data._id}`)}
                                            className="text-blue-600 hover:underline"
                                        >
                                            View
                                        </button>
                                        <a
                                            href={`http://localhost:3003/api/pdfs/download/${data._id}`} 
                                            className="text-blue-600 hover:underline"
                                        >
                                            Download
                                        </a>
                                        <FaTrash
                                            className="text-red-500 cursor-pointer transition-transform transform duration-300 hover:scale-110"
                                            size={23}
                                            onClick={() => handledelete(data._id)}
                                        />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <h1 className="text-xl text-gray-600 text-center">No assignments available</h1>
                    )}
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 top-0">
                    <div className="bg-white rounded-lg overflow-hidden shadow-lg w-full md:w-3/4 lg:w-2/3 h-[95vh] flex flex-col">
                        <div className="flex justify-between items-center p-4 border-b">
                            <h2 className="text-lg font-bold">PDF Viewer</h2>
                            <button onClick={handleCloseModal} className="text-gray-600 hover:text-gray-900">
                                &times;
                            </button>
                        </div>
                        <iframe
                            src={pdfUrl}
                            className="w-full h-[600px]"  
                            title="PDF Viewer"
                        ></iframe>
                        <div className="flex justify-end p-4">
                            <button onClick={handleCloseModal} className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Assignments;
