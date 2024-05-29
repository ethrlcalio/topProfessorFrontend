import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import logo from '../Logo.png';
import LoginModal from '../components/LoginModal';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [isUpdate, setIsUpdate] = useState(false);
  const [role, setRole] = useState(JSON.parse(localStorage.getItem('role')) ? JSON.parse(localStorage.getItem('role')) : null);

  useEffect(() => {
    const loggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));
    setIsLoggedIn(loggedIn || false);
  }, []);

  const openLogin = () => {
    setIsLoginOpen(true);
  };

  const closeLogin = () => {
    setIsLoginOpen(false);
    setFormData({
      username: '',
      password: ''
    });
  };

  const logOut = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('id');
    localStorage.removeItem('role');
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleDatafromChild = (data) => {
    if(data){
      setIsLoggedIn(true);
      localStorage.setItem('isLoggedIn', JSON.stringify(true));
      setRole(JSON.parse(localStorage.getItem('role')));
    }
  }

  useEffect(() => {
    const loggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));
    if(!isLoggedIn && !loggedIn && window.location.pathname !== '/'){
      window.location.href = `/`;
    }
  }, [isLoggedIn])
  
  return (
    <nav className="bg-penn-blue shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img src={logo} alt="Your Logo" className="h-10 w-auto" />
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {role == "student" && isLoggedIn && <Link to={`/home/${JSON.parse(localStorage.getItem('id'))}`} className="text-anti-flash hover:bg-mustard hover:text-penn-blue font-montserrat px-3 py-2 rounded-md text-md font-semibold">Home</Link>}
              {role == "student" && isLoggedIn && <Link to={`/faculty/${JSON.parse(localStorage.getItem('id'))}`} className="text-anti-flash hover:bg-mustard hover:text-penn-blue font-montserrat px-3 py-2 rounded-md text-md font-semibold">Faculty</Link>}
              {role == "admin" && isLoggedIn && <Link to={`/dashboard/admin/${JSON.parse(localStorage.getItem('id'))}`} className="text-anti-flash hover:bg-mustard hover:text-penn-blue font-montserrat px-3 py-2 rounded-md text-md font-semibold">Dashboard</Link>}
              {!isLoggedIn && <button onClick={openLogin} className="text-anti-flash hover:bg-mustard hover:text-penn-blue font-montserrat px-3 py-2 rounded-md text-md font-semibold">Log In</button>}
              {isLoggedIn && <button onClick={logOut} className="text-anti-flash hover:bg-mustard hover:text-penn-blue font-montserrat px-3 py-2 rounded-md text-md font-semibold">Log Out</button>}
            </div>
          </div>
        </div>
      </div>
      <LoginModal isOpen={isLoginOpen} onClose={closeLogin} formData={formData} onChange={handleChange} onSubmit={handleSubmit} sendDataToParent={handleDatafromChild}/>
    </nav>
  );
}

export default Navbar;
