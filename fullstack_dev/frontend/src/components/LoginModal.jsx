import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const LoginModal = ({ isOpen, onClose, sendDataToParent }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [id, setID] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://topprofessor.onrender.com/api/login/', {
        username,
        password,
      });
      const studentID = response.data.identifier;
      setID(studentID);
      
      const token = response.data.access;
      localStorage.setItem('token', token);
      localStorage.setItem('id', JSON.stringify(studentID));
      localStorage.setItem('role', JSON.stringify(response.data.role));
      onClose();
      console.log('Login successful!'); 
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Login failed:', error.response.data.error);
    }
  };

  useEffect(() =>{
    if(id){
      if(JSON.parse(localStorage.getItem("role")) == "student"){
        sendDataToParent(isLoggedIn);
        window.location.href = `/home/${id}`;
      }else if(JSON.parse(localStorage.getItem("role")) == "admin") {
        sendDataToParent(isLoggedIn);
        window.location.href = `/dashboard/admin/${id}`;
      }else if(JSON.parse(localStorage.getItem("role")) == "professor") {
        window.location.href = `/`;
      }
    }
  }, [isLoggedIn]);

  return (
    <>
      {isOpen && (
        <div className="login-modal-overlay">
          <div className="login-modal">
            <div className="modal-header pl-6 pr-6">
              <h2 className="text-penn-blue text-2xl font-bold">Login</h2>
              <FontAwesomeIcon
                icon={faTimes}
                className="cursor-pointer text-jet hover:text-gray"
                onClick={onClose}
              />
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center px-6 py-8">
              <div className="mb-4 w-full">
                <label htmlFor="username" className="block mb-2 text-sm font-montserrat">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="border rounded w-full px-4 py-2"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-4 w-full">
                <label htmlFor="password" className="block mb-2 text-sm font-montserrat">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="border rounded w-full px-4 py-2"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="w-full flex justify-center">
                <button type="submit" className="bg-penn-blue text-anti-flash hover:bg-mustard hover:text-penn-blue font-montserrat px-6 py-2 rounded-md text-md font-semibold">Login</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginModal;
