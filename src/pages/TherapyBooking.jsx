import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import UserLayout from '../layouts/UserLayout';

const initialForm = {
  topic: '',
  date: '',
  time: '',
  mode: 'online',
};

const TherapyBooking = () => {
  const { addSession, sessions, currentUser } = useAuth();
  const [formData, setFormData] = useState(initialForm);
  const [status, setStatus] = useState({ type: '', text: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setStatus({ type: '', text: '' });

    // Validate date and time are in future
    const selectedDateTime = new Date(`${formData.date}T${formData.time}`);
    const now = new Date();

    if (selectedDateTime <= now) {
      setStatus({
        type: 'error',
        text: 'Please select a future date and time. Past dates are not allowed.',
      });
      setSubmitting(false);
      return;
    }

    try {
      await addSession(formData);
      setFormData(initialForm);
      setStatus({
        type: 'success',
        text: 'Session booked! A counselor will reach out with next steps.',
      });
    } catch (error) {
      setStatus({ type: 'error', text: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  const mySessions = sessions.filter((session) => session.userId === currentUser?.id);

  return (
    <UserLayout>
      <section className="page-section">
        <h2>Book a therapy session</h2>
        <p>Let us know what you need support with and pick a time that works.</p>

        <form className="form-card" onSubmit={handleSubmit}>
          {status.text && (
            <p className={status.type === 'error' ? 'form-error' : 'form-success'}>
              {status.text}
            </p>
          )}

          <label>
            Topic or concern
            <input
              type="text"
              name="topic"
              value={formData.topic}
              onChange={handleChange}
              placeholder="e.g. Anxiety before exams"
              required
            />
          </label>

          <label>
            Preferred date
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Preferred time
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Mode
            <select name="mode" value={formData.mode} onChange={handleChange}>
              <option value="online">Online</option>
              <option value="offline">Offline</option>
            </select>
          </label>

          <button type="submit" className="primary-btn" disabled={submitting}>
            {submitting ? 'Booking...' : 'Book Session'}
          </button>
        </form>
      </section>

      <section className="page-section">
        <h3>My booked sessions</h3>
        {mySessions.length === 0 ? (
          <p>You have not scheduled any sessions yet.</p>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Topic</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Mode</th>
                  <th>Status</th>
                  <th>Link</th>
                </tr>
              </thead>
              <tbody>
                {mySessions.map((session) => (
                  <tr key={session.id}>
                    <td>{session.topic}</td>
                    <td>{session.date}</td>
                    <td>{session.time}</td>
                    <td>{session.mode}</td>
                    <td>
                      <span className={`status-badge status-${session.status || 'pending'}`}>
                        {session.status || 'pending'}
                      </span>
                    </td>
                    <td>
                      {session.meetingLink && session.status === 'approved' ? (
                        <a href={session.meetingLink} target="_blank" rel="noreferrer">
                          Open
                        </a>
                      ) : (
                        '-'
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {mySessions.map((session) => (
              session.status === 'cancelled' && session.cancelReason && (
                <div key={session.id} className="cancellation-notice">
                  <p>
                    <strong>Session cancelled:</strong> {session.topic} on {session.date}
                  </p>
                  <p className="form-error">
                    <strong>Reason:</strong> {session.cancelReason}
                  </p>
                </div>
              )
            ))}
          </div>
        )}
      </section>
    </UserLayout>
  );
};

export default TherapyBooking;
