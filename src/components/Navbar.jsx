import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const guestLinks = [
    { path: '/', label: 'Home' },
    { path: '/aboutme', label: 'About Me' },
    { path: '/register', label: 'Register' },
    { path: '/login', label: 'Login' },
  ];

  const studentLinks = [
    { path: '/', label: 'Home' },
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/therapy', label: 'Therapy' },
    { path: '/resources', label: 'Resources' },
    { path: '/support-groups', label: 'Support Groups' },
  ];

  const adminLinks = [
    { path: '/', label: 'Home' },
    { path: '/resources', label: 'Resources' },
    { path: '/admin', label: 'Admin' },
  ];

  const linksToRender = (() => {
    if (!currentUser) return guestLinks;
    if (currentUser.role === 'admin') return adminLinks;
    return studentLinks;
  })();

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    logout();
    navigate('/');
    setShowLogoutModal(false);
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  return (
    <>
      <header className="navbar">
        <Link to="/" className="logo">
          <img src={logo} alt="Platform logo" />
          <span>Student Support</span>
        </Link>
        <nav className="nav-links">
          {linksToRender.map((link) => (
            <Link key={link.label} to={link.path} className="nav-link">
              {link.label}
            </Link>
          ))}
          {currentUser && (
            <button
              type="button"
              className="logout-button"
              onClick={handleLogoutClick}
            >
              Logout
            </button>
          )}
        </nav>
      </header>

      {showLogoutModal && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <h3>Logout</h3>
            <p>Are you sure you want to logout?</p>
            <div className="modal-actions">
              <button
                type="button"
                className="secondary-btn"
                onClick={cancelLogout}
              >
                Cancel
              </button>
              <button
                type="button"
                className="primary-btn"
                onClick={confirmLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
