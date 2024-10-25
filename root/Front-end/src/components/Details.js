import React from 'react';
import { useAuth } from '../context/AuthContext';

const Details = () => {
  const { user } = useAuth();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div
        key={user._id}
        className={`p-8 border rounded-lg shadow-lg transition-transform duration-500 ease-in-out transform hover:scale-105 hover:shadow-xl ${
          user.role === 'student' ? 'bg-blue-100' : 'bg-green-100'
        }`}
      >
        <div className="flex items-center space-x-4 mb-6">
          
          <img
            src={user.profilePhoto || 'path/to/default-image.jpg'} 
            alt={`${user.username}'s profile`}
            className="w-24 h-24 rounded-full border-4 border-gray-300 shadow-md"
          />
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              {user.role === 'student' ? 'Student Details' : 'Teacher Details'}
            </h2>
            <p className="text-gray-600"><strong>Username:</strong> {user.username}</p>
            <p className="text-gray-600"><strong>Email:</strong> {user.email}</p>
            <p className="text-gray-600"><strong>Contact No:</strong> {user.contactNo || 'N/A'}</p>
          </div>
        </div>
     
        {user.role === 'student' && (
          <div className="mt-2 space-y-1">
            <p className="text-gray-600"><strong>Registration No:</strong> {user.regno}</p>
            <p className="text-gray-600"><strong>Department:</strong> {user.dept}</p>
            <p className="text-gray-600"><strong>Section:</strong> {user.section}</p>
            <p className="text-gray-600"><strong>Year:</strong> {user.year}</p>
            <p className="text-gray-600"><strong>Biography:</strong> {user.biography || 'No biography available.'}</p>
          </div>
        )}

        {user.role === 'teacher' && (
          <div className="mt-2 space-y-1">
            <p className="text-gray-600"><strong>Department:</strong> {user.dept}</p>
            <p className="text-gray-600"><strong>Biography:</strong> {user.biography || 'No biography available.'}</p>
          </div>
        )}

        <div className="mt-4">
          <h3 className="text-xl font-semibold text-gray-700">Connect with Me:</h3>
          <div className="flex space-x-4 mt-2">
            {user.socialLinks?.linkedin && (
              <a href={user.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                LinkedIn
              </a>
            )}
            {user.socialLinks?.github && (
              <a href={user.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:underline">
                GitHub
              </a>
            )}
            {user.socialLinks?.twitter && (
              <a href={user.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                Twitter
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
