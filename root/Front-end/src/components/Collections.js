import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Collections = () => {
  const { stud } = useAuth();
  const navigate = useNavigate();

  function handleAttend() {
    if (stud === 'student') {
      navigate('/AttendanceStud');
    } else {
      navigate('/Attendance');
    }
  }

  function handleAssign() {
    if (stud === 'student') {
      navigate('/Assignments');
    } else {
      navigate('/TeacherAssign');
    }
  }

  function handleNote() {
    if (stud === 'student') {
      navigate('/noteifystud');
    } else {
      navigate('/Notifications');
    }
  }

  return (
    <div className='flex flex-wrap justify-between items-center bg-gray-300 p-4'>
      {[
        { label: 'Attendance', handler: handleAttend },
        { label: 'Notifications', handler: handleNote },
        { label: 'Post Marks', handler: () => navigate('/Postmarks') },
        { label: 'MEET', handler: () => alert('meet') },
        { label: 'To-Do', handler: () => alert('meet') },
        { label: stud === 'student' ? 'Post Assignments' : 'Review Assignments', handler: handleAssign },
        { label: 'Details', handler: () => navigate('/Details') },
        { label: 'Explore', handler: () => alert('meet') },
      ].map((item, index) => (
        <motion.div
          key={index}
          className='bg-gray-100 w-[45%] p-4 text-center m-2'
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <button onClick={item.handler}>
            {item.label}
          </button>
        </motion.div>
      ))}
    </div>
  );
};

export default Collections;
