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

      <div className='bg-gray-100 w-[45%] p-4 text-center m-2'>
        <button 
          onClick={handleAttend}>
          ATTENDENCE
        </button>
      </div>
      {/* noteifystud */}
      <div className='bg-gray-100 w-[45%] p-4 text-center m-2'>
        <button 
          onClick={handleNote}>  
          Notifications
          </button>
      </div>

      <div className='bg-gray-100 w-[45%] p-4 text-center m-2'>
        <button 
          onClick={()=>alert('rewardss')}>  
          Rewards
        </button>
      </div>
      
      <div className='bg-gray-100 w-[45%] p-4 text-center m-2'> 
        <button 
          onClick={()=>alert('meet')}>
          MEET
        </button>
      </div>

      <div className='bg-gray-100 w-[45%] p-4 text-center m-2'>
        <button
          onClick={()=>alert('meet')}>
          To-Do
        </button>
      </div>

      <div className='bg-gray-100 w-[45%] p-4 text-center m-2'>
        <button  
          onClick={handleAssign}>
          Post assignments
        </button>
      </div>
      
      <div className='bg-gray-100 w-[45%] p-4 text-center m-2'>
        <button 
          onClick={()=>alert('meet')}>
          Details
        </button>
      </div>

      <div className='bg-gray-100 w-[45%] p-4 text-center m-2'>
        <button 
          onClick={()=>alert('meet')}>
          Explore
        </button>
      </div>
  </div>  
  
  )
}

export default Collections