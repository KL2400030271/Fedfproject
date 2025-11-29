import { useState, useMemo } from 'react';
import { Navigate } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import { useAuth } from '../hooks/useAuth';

const AdminDashboard = () => {
  const {
    currentUser,
    resources,
    sessions,
    users,
    addResource,
    removeResource,
    updateSession,
  } = useAuth();
  const [activeSection, setActiveSection] = useState('overview');

  const [resourceForm, setResourceForm] = useState({
    title: '',
    category: '',
    description: '',
    link: '',
  });

  const [resourceVisibility, setResourceVisibility] = useState({
    allStudents: true,
    selectedUserIds: [],
  });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState('');

  if (!currentUser || currentUser.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  const stats = useMemo(() => {
    const totalResources = resources.length;
    const totalSessions = sessions.length;
    const totalStudents = users.filter((u) => u.role === 'student').length;
    const pendingSessions = sessions.filter((s) => s.status === 'pending').length;
    const approvedSessions = sessions.filter((s) => s.status === 'approved').length;

    return {
      totalResources,
      totalSessions,
      totalStudents,
      pendingSessions,
      approvedSessions,
    };
  }, [resources, sessions, users]);

  const handleResourceChange = (e) => {
    const { name, value } = e.target;
    setResourceForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddResource = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus('');

    try {
      const visibleTo = resourceVisibility.allStudents
        ? { type: 'all' }
        : { type: 'users', userIds: resourceVisibility.selectedUserIds };

      await addResource({ ...resourceForm, visibleTo });

      setResourceForm({ title: '', category: '', description: '', link: '' });
      setResourceVisibility({ allStudents: true, selectedUserIds: [] });
      setStatus('Resource added successfully!');
      setTimeout(() => setStatus(''), 3000);
    } catch (error) {
      setStatus(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteResource = async (resourceId) => {
    if (!window.confirm('Are you sure you want to delete this resource?')) {
      return;
    }

    try {
      await removeResource(resourceId);
      setStatus('Resource deleted successfully!');
      setTimeout(() => setStatus(''), 3000);
    } catch (error) {
      setStatus(error.message);
    }
  };

  const handleSessionStatus = async (sessionId, newStatus, currentMode) => {
    let meetingLink;
    let cancelReason = '';

    if (newStatus === 'approved') {
      if (currentMode === 'online') {
        meetingLink = window.prompt('Enter Microsoft Teams meeting link:');
      } else if (currentMode === 'offline') {
        meetingLink = window.prompt('Paste Google Maps location link:');
      }
      if (!meetingLink) {
        return;
      }
    }

    if (newStatus === 'cancelled') {
      cancelReason = window.prompt('Enter cancellation reason:');
      if (!cancelReason) {
        return;
      }
    }

    try {
      await updateSession(sessionId, newStatus, meetingLink, cancelReason);
      setStatus(`Session ${newStatus} successfully!`);
      setTimeout(() => setStatus(''), 3000);
    } catch (error) {
      setStatus(error.message);
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div>
            <section className="page-section">
              <p className="eyebrow">Administrator dashboard</p>
              <h2>Welcome back, {currentUser.name} </h2>
              <p>Track student sessions, resources, and well‑being in one place.</p>
            </section>

            <section className="stats-section">
              <div className="stats-grid">
                <div className="stat-card">
                  <p className="stat-label">Total resources</p>
                  <strong className="stat-value">{stats.totalResources}</strong>
                </div>
                <div className="stat-card">
                  <p className="stat-label">Total sessions</p>
                  <strong className="stat-value">{stats.totalSessions}</strong>
                </div>
                <div className="stat-card">
                  <p className="stat-label">Total students</p>
                  <strong className="stat-value">{stats.totalStudents}</strong>
                </div>
                <div className="stat-card">
                  <p className="stat-label">Pending sessions</p>
                  <strong className="stat-value">{stats.pendingSessions}</strong>
                </div>
              </div>
            </section>
          </div>
        );

      case 'resources':
        return (
          <section className="page-section">
            <h2>Resources library</h2>
            {status && (
              <p className={status.includes('success') ? 'form-success' : 'form-error'}>
                {status}
              </p>
            )}

            <div className="admin-grid">
              <div>
                <h3>Existing resources</h3>
                {resources.length === 0 ? (
                  <p>No resources yet. Add your first resource below.</p>
                ) : (
                  <div className="table-wrapper">
                    <table>
                      <thead>
                        <tr>
                          <th>Title</th>
                          <th>Category</th>
                          <th>Description</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {resources.map((resource) => (
                          <tr key={resource.id}>
                            <td>{resource.title}</td>
                            <td>
                              <span className="resource-category">{resource.category}</span>
                            </td>
                            <td>{resource.description}</td>
                            <td>
                              <button
                                type="button"
                                className="delete-btn-small"
                                onClick={() => handleDeleteResource(resource.id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              <form className="form-card" onSubmit={handleAddResource}>
                <h3>Add new resource</h3>

                <label>
                  Title
                  <input
                    type="text"
                    name="title"
                    value={resourceForm.title}
                    onChange={handleResourceChange}
                    required
                  />
                </label>

                <label>
                  Category
                  <input
                    type="text"
                    name="category"
                    value={resourceForm.category}
                    onChange={handleResourceChange}
                    placeholder="e.g. stress, anxiety, wellness"
                    required
                  />
                </label>

                <label>
                  Description
                  <textarea
                    name="description"
                    rows="3"
                    value={resourceForm.description}
                    onChange={handleResourceChange}
                    required
                  />
                </label>

                <label>
                  Resource link
                  <input
                    type="url"
                    name="link"
                    value={resourceForm.link}
                    onChange={handleResourceChange}
                    placeholder="https://example.com/article-or-video"
                    required
                  />
                </label>

                <label className="visibility-toggle">
                  <span>Visible to all students</span>
                  <input
                    type="checkbox"
                    checked={resourceVisibility.allStudents}
                    onChange={(e) =>
                      setResourceVisibility((prev) => ({
                        ...prev,
                        allStudents: e.target.checked,
                        selectedUserIds: e.target.checked ? [] : prev.selectedUserIds,
                      }))
                    }
                  />
                </label>

                {!resourceVisibility.allStudents && (
                  <label>
                    Choose specific students (name – user id)
                    <select
                      multiple
                      value={resourceVisibility.selectedUserIds}
                      onChange={(e) => {
                        const options = Array.from(e.target.selectedOptions);
                        const ids = options.map((opt) => opt.value);
                        setResourceVisibility((prev) => ({ ...prev, selectedUserIds: ids }));
                      }}
                    >
                      {users
                        .filter((u) => u.role === 'student')
                        .map((u) => (
                          <option key={u.id} value={u.id}>
                            {u.name} – {u.id}
                          </option>
                        ))}
                    </select>
                  </label>
                )}

                <button type="submit" className="primary-btn" disabled={submitting}>
                  {submitting ? 'Adding...' : 'Add resource'}
                </button>
              </form>
            </div>
          </section>
        );

      case 'sessions':
        return (
          <section className="page-section">
            <h2>Therapy sessions queue</h2>
            {status && (
              <p className={status.includes('success') ? 'form-success' : 'form-error'}>
                {status}
              </p>
            )}

            {sessions.length === 0 ? (
              <p>No sessions booked yet.</p>
            ) : (
              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>Topic</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Mode</th>
                      <th>Status</th>
                      <th>Link</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sessions.map((session) => (
                      <tr key={session.id}>
                        <td>{session.userName}</td>
                        <td>{session.topic}</td>
                        <td>{session.date}</td>
                        <td>{session.time}</td>
                        <td>{session.mode}</td>
                        <td>
                          <span
                            className={`status-badge status-${session.status || 'pending'}`}
                          >
                            {session.status || 'pending'}
                          </span>
                        </td>
                        <td>
                          {session.meetingLink ? (
                            <a href={session.meetingLink} target="_blank" rel="noreferrer">
                              Open
                            </a>
                          ) : (
                            '-'
                          )}
                        </td>
                        <td>
                          <div className="action-buttons">
                            {session.status === 'pending' && (
                              <>
                                <button
                                  type="button"
                                  className="approve-btn"
                                  onClick={() =>
                                    handleSessionStatus(session.id, 'approved', session.mode)
                                  }
                                >
                                  Approve
                                </button>
                                <button
                                  type="button"
                                  className="cancel-btn"
                                  onClick={() =>
                                    handleSessionStatus(session.id, 'cancelled', session.mode)
                                  }
                                >
                                  Cancel
                                </button>
                              </>
                            )}
                            {session.status === 'approved' && (
                              <button
                                type="button"
                                className="cancel-btn"
                                onClick={() =>
                                  handleSessionStatus(session.id, 'cancelled', session.mode)
                                }
                              >
                                Cancel
                              </button>
                            )}
                            {session.status === 'cancelled' && (
                              <button
                                type="button"
                                className="approve-btn"
                                onClick={() =>
                                  handleSessionStatus(session.id, 'approved', session.mode)
                                }
                              >
                                Re‑approve
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        );

      case 'users': {
        const studentUsers = users.filter((u) => u.role === 'student');

        return (
          <section className="page-section">
            <h2>Registered students</h2>
            <p className="eyebrow">Only student accounts are listed here</p>
            {studentUsers.length === 0 ? (
              <p>No students registered yet.</p>
            ) : (
              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentUsers.map((user) => (
                      <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        );
      }

      default:
        return null;
    }
  };

  return (
    <AdminLayout activeSection={activeSection} onSectionChange={setActiveSection}>
      {renderSection()}
    </AdminLayout>
  );
};

export default AdminDashboard;
