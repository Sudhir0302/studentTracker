import React, { useEffect, useState } from 'react';
import profile from '../src/pro.png';
import Timetable from './components/Timetable';
import Collections from './components/Collections';
import axios from 'axios';
import { useAuth } from './context/AuthContext';

function TeacherDashboard() {
  const [works, setWorks] = useState([]);
  const { user} = useAuth();

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

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between w-full h-auto bg-gray-50 p-6 rounded-lg shadow-lg space-y-6 md:space-y-0">
        <div className="flex flex-col w-full md:w-[30%] bg-white p-4 rounded-lg shadow-md">
          <img
            src={profile}
            alt="profile"
            className="w-[60%] h-auto rounded-full mx-auto border-2 border-gray-300"
          />
          <div className="mt-4 text-left">
            <h1 className="text-xl font-semibold text-gray-800 mb-2">Teacher Details</h1>
            <h2 className="text-md text-gray-600 mb-1">
              <span className="font-medium">Name:</span> {user ? user.username.toUpperCase() : "teacher"}
            </h2>
            <h2 className="text-md text-gray-600 mb-1">
              <span className="font-medium">Department:</span> Computer Science
            </h2>
            <h2 className="text-md text-gray-600">
              <span className="font-medium">Timetable:</span> Updated
            </h2>
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
            <ul className="list-disc list-inside mt-3 text-gray-700">
              {works.map((data) => (
                <li
                  className="py-2 px-4 bg-gray-100 hover:bg-blue-500 hover:text-white transition duration-200 rounded cursor-pointer text-xl"
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
