import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Building2, User, Settings, LogOut } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const userProfile = {
    name: "name",
    email: "email",
    avatar: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/home">
          <Building2 className="me-2" />
          JabTalks
        </Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname === '/home/companies' ? 'active' : ''}`}
                to="/home/companies"
              >
                Companies
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname === '/home/reviews' ? 'active' : ''}`}
                to="/home/reviews"
              >
                Reviews
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname === '/home/salaries' ? 'active' : ''}`}
                to="/home/salaries"
              >
                Salaries
              </Link>
            </li>
          </ul>
          <div className="nav-item dropdown">
            <div 
              className="nav-link dropdown-toggle d-flex align-items-center"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            >
              <img 
                src={userProfile.avatar} 
                alt="Profile" 
                className="profile-picture me-2"
              />
            </div>
            <ul className={`dropdown-menu dropdown-menu-end profile-dropdown ${showProfileMenu ? 'show' : ''}`}>
              <li className="px-3 py-2 d-flex align-items-center">
                <img 
                  src={userProfile.avatar} 
                  alt="Profile" 
                  className="profile-picture-lg me-3"
                />
                <div>
                  <h6 className="mb-0">{userProfile.name}</h6>
                  <small className="text-muted">{userProfile.email}</small>
                </div>
              </li>
              <li><hr className="dropdown-divider" /></li>
              <li>
                <Link className="dropdown-item d-flex align-items-center" to="/profile">
                  <User size={18} className="me-2" />
                  Profile
                </Link>
              </li>
              <li>
                <Link className="dropdown-item d-flex align-items-center" to="/settings">
                  <Settings size={18} className="me-2" />
                  Settings
                </Link>
              </li>
              <li><hr className="dropdown-divider" /></li>
              <li>
                <button className="dropdown-item d-flex align-items-center text-danger">
                  <LogOut size={18} className="me-2" />
                  Sign Out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;