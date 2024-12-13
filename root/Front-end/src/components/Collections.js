import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';


const Collections = () => {
  // ()=>navigate('/Notifications')
  const { stud } = useAuth();

  const navigate=useNavigate();

  function handleAttend() {
    if (stud === 'student') {
      navigate('/AttendanceStud');
    } else {
      navigate('/Attendance');
    }
  }
  
  function handleAssign() {
    if (stud === 'student') {
      navigate('/Assingments');
    } else {
      navigate('/TeacherAssing');
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

      <div className='bg-gray-100 w-[45%] p-4 text-center m-2 hover:scale-105 hover:ring-green-400 hover:ring-2 rounded-xl hover:shadow-green-200 shadow-xl'>
        <button 
          onClick={handleAttend}>
          Attendance
        </button>
      </div>
      {/* noteifystud */}
      <div className='bg-gray-100 w-[45%] p-4 text-center m-2 hover:scale-105 hover:ring-green-400 hover:ring-2 rounded-xl hover:shadow-green-200 shadow-xl'>
        <button 
          onClick={handleNote}>  
          Notifications
          </button>
      </div>

      <div className='bg-gray-100 w-[45%] p-4 text-center m-2 hover:scale-105 hover:ring-green-400 hover:ring-2 rounded-xl hover:shadow-green-200 shadow-xl'>
        <button 
          onClick={()=>navigate('/Postmarks')}>  
          Post Marks
        </button>
      </div>
      
      <div className='bg-gray-100 w-[45%] p-4 text-center m-2 hover:scale-105 hover:ring-green-400 hover:ring-2 rounded-xl hover:shadow-green-200 shadow-xl'> 
        <button 
          onClick={()=>alert('meet')}>
          MEET
        </button>
      </div>

      <div className='bg-gray-100 w-[45%] p-4 text-center m-2 hover:scale-105 hover:ring-green-400 hover:ring-2 rounded-xl hover:shadow-green-200 shadow-xl'>
        <button
          onClick={()=>alert('meet')}>
          To-Do
        </button>
      </div>

      <div className='bg-gray-100 w-[45%] p-4 text-center m-2 hover:scale-105 hover:ring-green-400 hover:ring-2 rounded-xl hover:shadow-green-200 shadow-xl'>
        <button  
          onClick={handleAssign}>
          {stud ==='student' ? 'Post assignments' :"Review assignments"}
        </button>
      </div>
      
      <div className='bg-gray-100 w-[45%] p-4 text-center m-2 hover:scale-105 hover:ring-green-400 hover:ring-2 rounded-xl hover:shadow-green-200 shadow-xl'>
        <button 
          onClick={()=>navigate('/Details')}>
          Details
        </button>
      </div>

      <div className='bg-gray-100 w-[45%] p-4 text-center m-2 hover:scale-105 hover:ring-green-400 hover:ring-2 rounded-xl hover:shadow-green-200 shadow-xl'>
        <button 
          onClick={()=>alert('meet')}>
          Explore
        </button>
      </div>
  </div>  
  
  )
}

export default Collections