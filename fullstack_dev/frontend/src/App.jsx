// src/App.jsx

import React, {useState, useEffect} from 'react';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Dashboard from './pages/Home/Dashboard';
import ProfessorProfile from './pages/Faculty/ProfessorProfile';
import ProfessorProfileAdmin from './pages/Faculty/ProfessorProfileAdmin';
import Default from './pages/Home/Default';
import Login from './pages/Login/Login';
import Faculty from './pages/Faculty/Faculty';
import MetricContextProvider from './context/MetricContext';

function App() {
  return (
    <MetricContextProvider>
        <div className='flex flex-col h-screen'>
          <Navbar />
          <div className="flex-grow"> {/* Adjust the class name to `flex-grow` for flexibility */}
            <Routes>
              <Route path="/home/:id" element={<Home />} />
              <Route path="/dashboard/admin/:id" element={<Dashboard />} /> {/*Admin View*/}
              <Route path="/professor/:id/:classCode" element={<ProfessorProfile/>} />
              <Route path="/professor/admin/:id" element={<ProfessorProfileAdmin/>} />
              <Route path="/faculty/:id" element={<Faculty />} />
              <Route path="/" element={<Default />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
          <footer className="bg-anti-flash p-4">
          </footer>
        </div>
    </MetricContextProvider>
  );
}

export default App;
