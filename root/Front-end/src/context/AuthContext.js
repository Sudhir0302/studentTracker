import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLogin, setLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [stud,setStud]=useState('student');

  const values = {
    isLogin,
    setLogin,
    user,
    setUser,
    stud,
    setStud
  };

  return (
    <AuthContext.Provider value= {values}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };
