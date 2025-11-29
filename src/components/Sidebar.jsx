import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ title, links }) => {
  const location = useLocation();
  const activePath = `${location.pathname}${location.hash ?? ''}`;

  return (
    <aside className="sidebar">
      <h2>{title}</h2>
      <ul>
        {links.map((link) => (
          <li key={link.path} className={activePath === link.path ? 'active' : ''}>
            <Link to={link.path}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;

