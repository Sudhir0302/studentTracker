import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {

  const {stud,isLogin}=useAuth();
  const navigate = useNavigate();

  return (
    <nav className="bg-green-500 w-full h-12 flex justify-between items-center px-6 shadow-md">

      <div className="text-white font-bold text-xl">
        {stud === 'student' ? <h1>StudentDashboard</h1> :  <h1>TeacherDashboard</h1>} 
      </div>

      <ul className="flex gap-6 list-none items-center">
        <li
          className="text-white hover:bg-green-600 px-4 py-2 rounded-md cursor-pointer transition duration-300"
          onClick={() => navigate('/Home')}
        >
          Home
        </li>
        <li
          className="text-white hover:bg-green-600 px-4 py-2 rounded-md cursor-pointer transition duration-300"
          onClick={() => navigate('/Todo')}
        >
          Todo
        </li>
        {/* <li
          className="text-white hover:bg-green-600 px-4 py-2 rounded-md cursor-pointer transition duration-300"
        >
          Contact
        </li> */}
        {stud !== 'student'&&
          <li
            className="text-white hover:bg-green-600 px-4 py-2 rounded-md cursor-pointer transition duration-300"
            onClick={()=>navigate('/Student')}
          >
            Add
          </li>
        }
        {isLogin ? 
          <li
            className="text-white hover:bg-green-600 px-4 py-2 rounded-md cursor-pointer transition duration-300"
            onClick={()=>navigate('/')}
          >
            Logout
           </li>
        :
          <li
            className="text-white hover:bg-green-600 px-4 py-2 rounded-md cursor-pointer transition duration-300"
            onClick={()=>navigate('/')}
          >
            Login
          </li>
        }
      </ul>
    </nav>
  );
};

export default Navbar;
