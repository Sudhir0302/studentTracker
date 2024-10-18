import React from 'react'
// import {Link} from "react-router-dom";
// import { useNavigate } from 'react-router-dom';
import TeacherDashboard from './TeacherDashboard';
import StudentDashboard from './StudentDashboard';
import { useAuth } from './context/AuthContext';
// import Navbar from './components/Navbar';
const Home = () => {

  const {stud} =useAuth();

  return (
    <div>
      {stud === 'student' ? <StudentDashboard /> : <TeacherDashboard />}
    </div>
  )
}
export default Home;