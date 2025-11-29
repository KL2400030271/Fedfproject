import AdminSidebar from '../components/AdminSidebar';

const AdminLayout = ({ children, activeSection, onSectionChange }) => {
  return (
    <section className="dashboard-layout">
      <AdminSidebar activeSection={activeSection} onSectionChange={onSectionChange} />
      <div className="dashboard-content">{children}</div>
    </section>
  );
};

export default AdminLayout;


