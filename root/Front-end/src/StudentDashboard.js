import React, { useEffect, useState } from "react";
import axios from "axios";
import Timetable from "./components/Timetable";
import Collections from "./components/Collections";
import { useAuth } from "./context/AuthContext";

function StudentDashboard() {
  const [works, setWorks] = useState([]);
  const [profileImg, setProfileImg] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const { user } = useAuth();

  useEffect(() => {
    const fetchWorks = async () => {
      const res = await axios.get("http://localhost:3003/todo");
      setWorks(res.data);
    };
    fetchWorks();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await axios.get("http://localhost:3003/user/profile1", {
        params: { username: user.username },
      });
      console.log(res.data.profile);
      setProfileImg(res.data.profile);
    } catch (error) {
      console.error("Error fetching profile image:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile || !user) return;

    const formData = new FormData();
    formData.append("profileImage", selectedFile);
    formData.append("username", user.username);

    try {
      const res = await axios.post("http://localhost:3003/user/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setProfileImg(res.data.profile);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error uploading profile image:", error);
      alert("Failed to upload profile image.");
    }
  };

  return (
    <>
      <div className="flex justify-between flex-row w-full h-auto bg-gray-50 p-6 rounded-lg shadow-lg">
        <div className="flex flex-col w-full md:w-[30%] bg-white p-4 rounded-lg shadow-md">
          <img
            src={profileImg ? `http://localhost:3003${profileImg}` : "/default-profile.png"}
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
            Upload
          </button>
          <div className="mt-4 text-left">
            <h1 className="text-xl font-semibold text-gray-800 mb-2">Student Details</h1>
            <h2 className="text-md text-gray-600 mb-1">
              <span className="font-medium">Name:</span>{" "}
              {user ? user.username.toUpperCase() : "student"}
            </h2>
            <h2 className="text-md text-gray-600 mb-1">
              <span className="font-medium">Department:</span> Computer Science
            </h2>
          </div>
        </div>
        <div className="flex flex-col w-full md:w-[85%] bg-white p-6 rounded-lg shadow-md">
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
                  className="py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded transition duration-200 list-none text-xl"
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

export default StudentDashboard;
