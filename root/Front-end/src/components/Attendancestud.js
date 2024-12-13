import React, { useState } from 'react';
import axios from 'axios';

const Attendancestud = () => {
  const [className, setClassName] = useState('');
  const [regno, setRegno] = useState('');
  const [subject, setSubject] = useState('');
  const [attendanceData, setAttendanceData] = useState(null);
  const [error, setError] = useState('');
  const [startdate,setStartdate]=useState('');
  const [enddate,setEnddate]=useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setAttendanceData(null);
    console.log(startdate+" "+enddate);
    try {
      
      const response = await axios.get('http://localhost:3003/attendance/percentage', {
        params: {
          className,
          regno,
          subject,
          startdate,
          enddate
        }
      });
      setAttendanceData(response.data);
    } catch (err) {
      if (err.response) {    
        setError(err.response.data.message || 'Error fetching attendance');
      } else {
        setError('Error fetching attendance');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-5">Student Attendance Percentage</h1>
   
      <form onSubmit={handleSubmit} className="mb-5">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Class Name</label>
          <input 
            type="text"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Reg No</label>
          <input 
            type="text"
            value={regno}
            onChange={(e) => setRegno(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Subject</label>
          <input 
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">StartDate</label>
          <input 
            type="text"
            value={startdate}
            onChange={(e) => setStartdate(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">EndDate</label>
          <input 
            type="text"
            value={enddate}
            onChange={(e) => setEnddate(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Get Attendance Percentage
        </button>
      </form>

      {error && (
        <div className="bg-red-100 text-red-700 px-3 py-2 rounded mb-4">
          {error}
        </div>
      )}

      {attendanceData && (
        <div className="bg-green-100 text-green-700 px-3 py-2 rounded">
          <h2 className="text-xl font-semibold mb-2">Attendance Details</h2>
          <p><strong>Reg No:</strong> {attendanceData.regno}</p>
          <p><strong>Class:</strong> {attendanceData.className}</p>
          <p><strong>Subject:</strong> {attendanceData.subject}</p>
          <p><strong>Total Classes:</strong> {attendanceData.totalClasses}</p>
          <p><strong>Present Count:</strong> {attendanceData.presentCount}</p>
          <p><strong>Attendance Percentage:</strong> {attendanceData.attendancePercentage}%</p>
        </div>
      )}
    </div>
  );
};


export default Attendancestud