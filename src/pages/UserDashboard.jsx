import { useMemo } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import UserLayout from '../layouts/UserLayout';
import { useAuth } from '../hooks/useAuth';

const UserDashboard = () => {
  const navigate = useNavigate();
  const { currentUser, resources, sessions } = useAuth();

  // Redirect if not logged in
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  const mySessions = useMemo(
    () => sessions.filter((session) => session.userId === currentUser?.id),
    [sessions, currentUser]
  );

  // Get next upcoming session (earliest date/time)
  const nextUpcomingSession = useMemo(() => {
    if (mySessions.length === 0) return null;

    const sortedSessions = [...mySessions]
      .filter((s) => s.status !== 'cancelled')
      .sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.time}`);
        const dateB = new Date(`${b.date}T${b.time}`);
        return dateA - dateB;
      });

    const today = new Date();
    const upcoming = sortedSessions.find((s) => {
      const sessionDate = new Date(`${s.date}T${s.time}`);
      return sessionDate >= today;
    });

    return upcoming || sortedSessions[0] || null;
  }, [mySessions]);

  return (
    <UserLayout>
      <section className="page-section">
        <p className="eyebrow">Welcome back</p>
        <h2>Hi {currentUser?.name}, we are glad you are here.</h2>
        <p>
          Keep exploring resources and schedule time with a counselor whenever you need additional
          support.
        </p>
      </section>

      <section className="stats-grid">
        <div className="stat-card">
          <p className="stat-label">Total Resources Available</p>
          <strong className="stat-value">{resources.length}</strong>
        </div>
        <div className="stat-card">
          <p className="stat-label">Total Sessions Booked</p>
          <strong className="stat-value">{mySessions.length}</strong>
        </div>
        <div className="stat-card">
          <p className="stat-label">Next Upcoming Session</p>
          {nextUpcomingSession ? (
            <div className="next-session-info">
              <strong className="session-topic">{nextUpcomingSession.topic}</strong>
              <p className="session-date">
                {nextUpcomingSession.date} at {nextUpcomingSession.time}
              </p>
            </div>
          ) : (
            <p className="no-session">No upcoming session</p>
          )}
        </div>
      </section>

      <section className="page-section">
        <h3>My Booked Sessions</h3>
        {mySessions.length === 0 ? (
          <p>No sessions scheduled. Book one to get started.</p>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Topic</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {mySessions.map((session) => (
                  <tr key={session.id}>
                    <td>{session.topic}</td>
                    <td>{session.date}</td>
                    <td>{session.time}</td>
                    <td>
                      <span className={`status-badge status-${session.status || 'pending'}`}>
                        {session.status || 'pending'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="page-section">
        <div className="dashboard-actions">
          <button type="button" className="primary-btn" onClick={() => navigate('/therapy')}>
            Book New Session
          </button>
          <button type="button" className="secondary-btn" onClick={() => navigate('/resources')}>
            Explore Resources
          </button>
        </div>
      </section>
    </UserLayout>
  );
};

export default UserDashboard;


