import Sidebar from '../components/Sidebar';

const userLinks = [
  { path: '/dashboard', label: 'Dashboard' },
  { path: '/therapy', label: 'Therapy' },
  { path: '/resources', label: 'Resources' },
];

const UserLayout = ({ children }) => {
  return (
    <section className="dashboard-layout">
      <Sidebar title="Student Portal" links={userLinks} />
      <div className="dashboard-content">{children}</div>
    </section>
  );
};

export default UserLayout;



