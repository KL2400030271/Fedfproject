import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const guestLinks = [
    { path: '/', label: 'Home' },
    { path: '/aboutme', label: 'About Me' },
    { path: '/register', label: 'Register' },
    { path: '/login', label: 'Login' },
  ];

  const studentLinks = [
    { path: '/', label: 'Home' },
    { path: '/resources', label: 'Resources' },
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/therapy', label: 'Therapy' },
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

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
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
          <button type="button" className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        )}
      </nav>
    </header>
  );
};

export default Navbar;


