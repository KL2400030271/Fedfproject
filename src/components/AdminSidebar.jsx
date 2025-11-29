import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const AdminSidebar = ({ activeSection, onSectionChange }) => {
  const navigate = useNavigate();
  const { logout, currentUser } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'resources', label: 'Resources' },
    { id: 'sessions', label: 'Sessions' },
    { id: 'users', label: 'Users' },
  ];

  return (
    <aside className="admin-sidebar">
      <div className="sidebar-header">
        <h2>Admin Portal</h2>
        <p className="admin-welcome">Welcome, {currentUser?.name || 'Admin'}</p>
      </div>
      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className={activeSection === item.id ? 'active' : ''}
                onClick={() => onSectionChange(item.id)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="sidebar-footer">
        <button type="button" className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;

