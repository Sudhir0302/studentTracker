import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';

const TeacherAssing = () => {
  const [work, setWork] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");
  

  const [department, setDepartment] = useState("");
  const [section, setSection] = useState("");
  const [sub, setSub] = useState("");
  
  const departments = ["cse", "ece", "eee"];
  const sections = ["a", "b", "c"]; 
  const subjects = ["java", "mern", "mca"]; 
  
  useEffect(() => {
    if (department && section) {
      const fetchFiles = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`http://localhost:3003/api/pdfs/teacher`, {
            params: { department, section ,sub}
          });
          if (response.data.length === 0) {
            setWork([]); 
            // console.log('No PDFs found for the selected department and section.');
          } else {
            setWork(response.data); 
          }
        } catch (err) {
          console.error('Error fetching files:', err);
        } finally {
          setLoading(false);
        }
      };
      
      fetchFiles();
    }
  }, [department, section,sub]); // Dependency array includes department and section

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
      
      {/* Dropdowns for selecting department and section */}
      <div className="flex justify-center space-x-4 mb-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Department</label>
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="block w-full px-4 py-2 border rounded-md"
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-gray-700 font-medium mb-2">Section</label>
          <select
            value={section}
            onChange={(e) => setSection(e.target.value)}
            className="block w-full px-4 py-2 border rounded-md"
          >
            <option value="">Select Section</option>
            {sections.map((sec) => (
              <option key={sec} value={sec}>{sec}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Subject</label>
          <select
            value={sub}
            onChange={(e) => setSub(e.target.value)}
            className="block w-full px-4 py-2 border rounded-md"
          >
            <option value="">Select Subject</option>
            {subjects.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
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

export default TeacherAssing;
