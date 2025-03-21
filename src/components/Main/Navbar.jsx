import React, {  useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { User, LogOut } from 'lucide-react';
import logo from "../../assets/logo1.ico";
import { getUser } from '../../Services/users';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const locationUserId = location.state?.id;
  const id = locationUserId;
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  useEffect(() => {
    
    if (!id && !locationUserId) {
      navigate('/login', { replace: true });
    }
  }, [navigate, id, locationUserId]);

  const [userProfile,setuserProfile] =  useState( {
    name: "",  
    email: "",
    avatar: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  });
useEffect(() => {
  const fetchData = async () => {
    try {
      const data = await getUser(id);
      const storedProfile = localStorage.getItem(`user_${id}`);
      const parsedProfile = storedProfile ? JSON.parse(storedProfile) : {};
      setuserProfile({name: data.name, email: data.email, avatar:parsedProfile.profilePic || userProfile.avatar,userid:id,method : data.method});
    } catch (error) {
      console.error('Error fetching company data:', error);
    }
  };
  fetchData();
}, [id]);
  const handleSignOut = () => {
    navigate('/login', { replace: true });
  };  

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/home" state={{id}}>
          <img src={logo} className="me-2" style={{width:"35px"}} />
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
                to="/home/companies" state={{id}}
              >
                Companies
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname === '/home/reviews' ? 'active': ''}`}
                to="/home/reviews" state={{id}}
              >
                Reviews
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname === '/home/salaries' ? 'active' : ''}`}
                to="/home/salaries" state={{id}}
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
                <Link className="dropdown-item d-flex align-items-center" to="profile" state={{name : userProfile.name, email: userProfile.email,id:userProfile.userid,method:userProfile.method}}>
                  <User size={18} className="me-2" />
                  Profile
                </Link>
              </li>
              <li><hr className="dropdown-divider" /></li>
              <li>
                <button className="dropdown-item d-flex align-items-center text-danger" onClick={handleSignOut}>
                  <LogOut size={18} className="me-2" />
                  log Out
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