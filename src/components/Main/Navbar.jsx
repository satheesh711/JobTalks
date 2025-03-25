import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { User, LogOut } from 'lucide-react';
import Swal from 'sweetalert2';
import logo from "../../assets/logo1.ico";
import { getUser } from '../../Services/users';
import { Collapse } from 'bootstrap';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const locationUserId = location.state?.id;
  const id = locationUserId;
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navbarCollapseRef = useRef(null);

  useEffect(() => {
    if (!id && !locationUserId) {
      navigate('/login', { replace: true });
    }
  }, [navigate, id, locationUserId]);

  const [userProfile, setUserProfile] = useState({
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
        setUserProfile({
          name: data.name,
          email: data.email,
          avatar: parsedProfile.profilePic || userProfile.avatar,
          userid: id,
          method: data.method
        });
      } catch (error) {
        console.error('Error fetching company data:', error);
      }
    };
    fetchData();
  }, [id]);

  const handleSignOut = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You will be logged out!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log out!'
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/login', { replace: true });
      }
    });
  };

  const handleLinkClick = () => {
    const collapseElement = navbarCollapseRef.current;
    if (collapseElement && collapseElement.classList.contains('show')) {
      const bsCollapse = new Collapse(collapseElement);
      bsCollapse.hide();
    }
    setShowProfileMenu(false);
  };

  const handleHamburgerClick = () => {
    const collapseElement = navbarCollapseRef.current;
    if (collapseElement) {
      const bsCollapse = new Collapse(collapseElement);
      bsCollapse.toggle();
    }
    setShowProfileMenu(false);
  };
  
  const handleProfileClick = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link
            className="navbar-brand d-flex align-items-center"
            to="/home"
            state={{ id }}
            onClick={handleLinkClick}
            style={{ textDecoration: 'none' }}
          >
            <img src={logo} className="me-2" style={{ width: "35px" }} />
            JabTalks
          </Link>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={handleHamburgerClick}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse"
          id="navbarNav"
          ref={navbarCollapseRef}
          style={{ flexGrow: 1, justifyContent: 'space-between' }}
        >
          <ul className="navbar-nav w-100" style={{ display: 'flex', justifyContent: 'center' }}>
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === '/home' ? 'active' : ''}`}
                to="/home"
                state={{ id }}
                onClick={handleLinkClick}
                style={{
                  display: 'inline-block',
                  padding: '0.5rem 1rem',
                  borderRadius: '5px',
                  transition: 'background 0.3s ease'
                }}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === '/home/companies' ? 'active' : ''}`}
                to="/home/companies"
                state={{ id }}
                onClick={handleLinkClick}
                style={{
                  display: 'inline-block',
                  padding: '0.5rem 1rem',
                  borderRadius: '5px',
                  transition: 'background 0.3s ease'
                }}
              >
                Companies
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === '/home/reviews' ? 'active' : ''}`}
                to="/home/reviews"
                state={{ id }}
                onClick={handleLinkClick}
                style={{
                  display: 'inline-block',
                  padding: '0.5rem 1rem',
                  borderRadius: '5px',
                  transition: 'background 0.3s ease'
                }}
              >
                Reviews
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === '/home/salaries' ? 'active' : ''}`}
                to="/home/salaries"
                state={{ id }}
                onClick={handleLinkClick}
                style={{
                  display: 'inline-block',
                  padding: '0.5rem 1rem',
                  borderRadius: '5px',
                  transition: 'background 0.3s ease'
                }}
              >
                Salaries
              </Link>
            </li>
          </ul>
          <div className="nav-item dropdown ms-3" style={{ display: 'flex', alignItems: 'center' }}>
            <div
              className="nav-link dropdown-toggle d-inline-flex align-items-center"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              onClick={handleProfileClick}
              style={{
                width: 'auto',
                padding: '0.5rem 1rem',
                borderRadius: '5px',
                cursor: 'pointer',
                justifyContent: 'center',
              }}
            >
              <img
                src={userProfile.avatar}
                alt="Profile"
                className="profile-picture"
                style={{ width: "30px", height: "30px", borderRadius: "50%" }}
              />
            </div>
            <ul
              className={`dropdown-menu dropdown-menu-end profile-dropdown ${showProfileMenu ? 'show' : ''}`}
              style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                width: "auto",
                minWidth: "200px",
                marginTop: '10px',
                zIndex: 100000
              }}
            >
              <li className="p-3 d-flex align-items-center">
                <img
                  src={userProfile.avatar}
                  alt="Profile"
                  className="profile-picture-lg me-3"
                  style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                />
                <div>
                  <h6 className="mb-0">{userProfile.name}</h6>
                  <small className="text-muted">{userProfile.email}</small>
                </div>
              </li>
              <li><hr className="dropdown-divider" /></li>
              <li>
                <Link
                  className="dropdown-item d-flex align-items-center"
                  to="profile"
                  state={{
                    name: userProfile.name,
                    email: userProfile.email,
                    id: userProfile.userid,
                    method: userProfile.method
                  }}
                  onClick={handleLinkClick}
                >
                  <User size={18} className="me-2" />
                  Profile
                </Link>
              </li>
              <li><hr className="dropdown-divider" /></li>
              <li>
                <button
                  className="dropdown-item d-flex align-items-center text-danger"
                  onClick={handleSignOut}
                >
                  <LogOut size={18} className="me-2" />
                  Log Out
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