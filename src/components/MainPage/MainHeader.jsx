// Navbar.js

import React, { useState } from 'react';
import './Navbar.css';
import Sidebar from './MainSidebar';
import { FaHome, FaSearch } from 'react-icons/fa';
import LogoutButton from './Logout';
import { HiMenuAlt3 } from 'react-icons/hi';

const Navbar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isNavbarOpen, setNavbarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const toggleNavbar = () => {
    setNavbarOpen(!isNavbarOpen);
  };

  return (
    <>
      <div className={`bg-slate-500 container ${isNavbarOpen ? 'navbar-open' : ''}`}>
        <div className="navbar">
          <div className="navbar-content">
            <button className="menu-button" onClick={toggleNavbar}>
              <HiMenuAlt3 size={30} />
            </button>
            <ul className={`nav-list ${isNavbarOpen ? 'open' : ''}`}>
              <li>
                <div className="logo">
                  <a href="#">
                    <FaHome className="text-white" size={30} />
                  </a>
                </div>
              </li>
              <li>home</li>
              <li>about</li>
              <li>services</li>
              <li>blog</li>
              <li>
                <LogoutButton />
              </li>
              <li>
              <div className="flex items-center mt-2">
              <input
                type="text"
                placeholder="Search..."
                className="mr-2 border h-2 mb-2 border-white rounded"
              />
              <button type="submit" className="bg-green-500 text-white mb-2 rounded">
                <FaSearch size={20} />
              </button>
            </div>
              </li>
            </ul>
            
          </div>
        </div>

        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </div>
    </>
  );
};

export default Navbar;
