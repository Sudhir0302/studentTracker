import React, { useEffect, useState } from 'react';
import profile from '../src/pro.png';
import Timetable from './components/Timetable';
import Collections from './components/Collections';
import axios from 'axios';
import { useAuth } from './context/AuthContext';

function TeacherDashboard() {
  const [works, setWorks] = useState([]);
  const { user} = useAuth();
  const [profileImg, setProfileImg] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get('http://localhost:3003/todo');
      setWorks(res.data);

      // const savedUser = sessionStorage.getItem('user');
      // if (savedUser) {
      //   setUser(JSON.parse(savedUser));
      // }
    };
    fetch();
  }, []);

   const fetchProfile = () => {
      if (user && user.username) {
        const storedImage = localStorage.getItem(`profileImage_${user.username}`);
        if (storedImage) {
          setProfileImg(storedImage);
        } 
      }
    };
  
    useEffect(() => {
      if (user && user.username) {
        fetchProfile();
      }
    }, [user]);
  
    const handleFileChange = (e) => {
      setSelectedFile(e.target.files[0]);
    };
  
    const handleUpload = async () => {
      if (!selectedFile || !user){ 
        alert("upload img") 
        return
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result;
        localStorage.setItem(`profileImage_${user.username}`, base64Image);
        setProfileImg(base64Image);
        alert("Profile updated successfully!");
      };
  
      reader.onerror = () => {
        alert("Error uploading profile image.");
      };
      reader.readAsDataURL(selectedFile);
    };
  

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between w-full h-auto bg-gray-50 p-6 rounded-lg shadow-lg space-y-6 md:space-y-0">
        <div className="flex flex-col w-full md:w-[30%] bg-white p-4 rounded-lg shadow-md">
        <img
            src={profileImg ? profileImg : "/pro.png"}
            alt="profile"
            className="w-[60%] h-auto rounded-full mx-auto border-2 border-gray-300"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-4"
          />
          <button
            className="mt-2 bg-blue-500 text-white py-2 px-4 rounded"
            onClick={handleUpload}
          >
            {profileImg ? "Update Profile" :"Set Profile"}
          </button>
          <div className="mt-4 text-left">
            <h1 className="text-xl font-semibold text-gray-800 mb-2">Teacher Details</h1>
            <h2 className="text-md text-gray-600 mb-1">
              <span className="font-medium">Name:</span> {user ? user.username.toUpperCase() : "teacher"}
            </h2>
            <h2 className="text-md text-gray-600 mb-1">
              <span className="font-medium">Department:</span> Computer Science
            </h2>
            {/* <h2 className="text-md text-gray-600">
              <span className="font-medium">Timetable:</span> Updated
            </h2> */}
          </div>
        </div>
        <div className="flex flex-col w-full md:w-[65%] bg-white p-6 rounded-lg shadow-md">
          <Timetable />
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between w-full h-auto gap-6 mt-6">
        <div className="flex-1 bg-white p-4 rounded-lg shadow-md">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">Works Todo</h1>
          <div className="mt-2">
            <ul className=" list-inside mt-3 text-gray-700 list-none">
              {works.map((data) => (
                <li
                  className="py-2 px-4 bg-gray-100 hover:bg-green-400 hover:text-white transition duration-200 rounded cursor-pointer text-xl"
                  key={data._id}
                >
                  {data.item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex-1 bg-white p-4 rounded-lg shadow-md">
          <Collections />
        </div>
      </div>
    </>
  );
}

export default TeacherDashboard;
