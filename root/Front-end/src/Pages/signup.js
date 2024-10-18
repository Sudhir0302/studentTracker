import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email,setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const[dept,setDept]=useState("");
  const[regno,setRegno]=useState("");
  const[section,setSection]=useState("");
  const[year,setYear]=useState("");
  const [error, setError] = useState('');

  const navigate=useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Usermail:", email);
    console.log("Username:", username);
    console.log("Password:", password);
    console.log("dept: ",dept);
    console.log("section: ",section);
    console.log("regno: ",regno);
    console.log("year: ",year);
    console.log("Role:", role); 
    setUsername("");
    setPassword("");
    setDept("");
    setRegno("");
    setEmail("");
    setSection("");
    setYear("");

    try{
      const res=await axios.post('http://localhost:3003/user',{email,username,regno,password,role,dept,section,year})
      setTimeout(() => {  
        // handleLogin();
        navigate('/');
      }, 1500);
    }catch(err){
      console.log(err);
      if (err.response && err.response.data) {
        setError(err.response.data.message);
      } else {
        setError('Login failed. Please try again.');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">Signup</h2>
        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-600">Email</label>
            <input
            type="text"
            placeholder="Enter your mailid"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500"
            required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-600">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-600">Department</label>
            <input
              type="text"
              value={dept}
              onChange={(e) => setDept(e.target.value)}
              className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {role==='student'&&<>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-600">Section</label>
            <input
              type="text"
              value={section}
              onChange={(e) => setSection(e.target.value)}
              className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500"
             // required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-600">Year</label>
            <input
              type="text"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500"
              //required
            />
          </div>
          
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-600">Regno</label>
            <input
              type="text"
              value={regno}
              onChange={(e) => setRegno(e.target.value)}
              className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500"
             // required
            />
          </div>
          </>
            }
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-600">Signup as</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 bg-gray-200 rounded focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              {/* <option value="parent">Parent</option> */}
            </select>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
          >
            Create Account
          </button>
          {error && <div className="text-red-500 text-center">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default Signup;
