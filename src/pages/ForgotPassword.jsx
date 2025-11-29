import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { users } = useAuth();

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const userExists = users.some((u) => u.email === email);

    if (!userExists) {
      setError('Email not found. Please check and try again.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setSuccess(`Password reset link sent to ${email}`);
      setEmail('');
      setLoading(false);

      setTimeout(() => {
        navigate('/login');
      }, 3000);
    }, 1000);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Forgot Password</h2>

        {error && <p className="form-error">{error}</p>}
        {success && <p className="form-success">{success}</p>}

        <form onSubmit={handleSubmit}>
          <label>
            Registered Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </label>

          <button type="submit" className="primary-btn" disabled={loading}>
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        <p>
          Remember your password? <a href="/login">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
