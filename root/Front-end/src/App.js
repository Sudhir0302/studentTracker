import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
// import Todo from './Todo/src/App';
import Todo from './components/Todo'
import Home from './home';
import TeacherDashboard from './TeacherDashboard';
import Timetable from './Timetable';
import Navbar from './components/Navbar';
import Login from './Pages/login';
import Signup from './Pages/signup';
import Assingments from './components/Assingments';
import Attendance from './components/Attendance';
import Attendancestud from './components/Attendancestud';
import TeacherAssing from './components/TeacherAssing';
import { AuthProvider } from './context/AuthContext';

const App = () => {
  const location = useLocation();
  // console.log(location);
  const hidebar=location.pathname ==='/'||location.pathname==='/Signup';

  return (
    <AuthProvider> 
      <div>
        {!hidebar && <Navbar />}
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Todo" element={<Todo />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/TeacherDashboard" element={<TeacherDashboard/>} />
          <Route path="/Attendance" element={<Attendance />} />
          <Route path="/AttendanceStud" element={<Attendancestud />} />
          <Route path="/Assingments" element={<Assingments />} />
          <Route path="/TeacherAssing" element={<TeacherAssing />} />
          <Route path="/Timetable" element={<Timetable />} />
        </Routes>
        {/* <h1>{props.id} : {props.name}</h1> */}
      </div>
    </AuthProvider>
  );
};

export default App;
