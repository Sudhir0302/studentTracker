import axios from "axios";
import React, { useEffect, useState } from "react";

const Explore = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get("http://localhost:3003/student");
        const sortedData = res.data.sort((a, b) => a.regno.localeCompare(b.regno));
        setData(sortedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetch();
  }, []);

  return (
    <div className="flex flex-col items-center my-10 space-y-6">
      <h1 className="text-3xl font-bold bg-slate-900 text-white w-2/3 p-3 rounded-lg text-center shadow-md">
        Student's Details
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-11/12">
        {data.length > 0 ? (
          data.map((user) => <Box user={user} key={user._id} />)
        ) : (
          <div className="text-xl font-semibold text-gray-700">
            No student data available.
          </div>
        )}
      </div>
    </div>
  );
};

const Box = ({ user }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6 transition-transform duration-300 hover:scale-105 hover:shadow-lg">
      <div className="flex items-center mb-4 space-x-4">
        <img
          src={"/pro.png"}
          alt={`${user.name}'s profile`}
          className="w-20 h-20 rounded-full border-2 border-blue-400 shadow-sm"
        />
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            {user.name || "Unknown"}
          </h2>
          <p className="text-sm text-gray-500">
            <strong>Registration No:</strong> {user.regno}
          </p>
        </div>
      </div>
      <div className="space-y-2 text-gray-600">
        <p>
          <strong>Class:</strong> {user.className || "N/A"}
        </p>
        <p>
          <strong>Biography:</strong>{" "}
          {user.biography || "No biography available."}
        </p>
      </div>
    </div>
  );
};

export default Explore;
