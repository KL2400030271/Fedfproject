import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '', password: '', role: 'student'
  });
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true); setError(''); setStatus('');
    
    try {
      const user = await login(formData);
      setStatus(`Welcome back, ${user.name}!`);
      setTimeout(() => {
        navigate(user.role === 'admin' ? '/admin' : '/dashboard');
      }, 1500);
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="auth-page">
      <form className="form-card" onSubmit={handleSubmit}>
        <h2>Welcome back</h2>
        <p>Sign in to continue your wellbeing journey.</p>
        
        {error && <p className="form-error">{error}</p>}
        {status && <p className="form-info">{status}</p>}
        
        <label>Email
          <input 
            type="email" name="email" 
            value={formData.email} 
            onChange={handleChange} required 
          />
        </label>
        
        <label>Password
          <input 
            type="password" name="password" 
            value={formData.password} 
            onChange={handleChange} required 
          />
        </label>
        
        <label>Login as
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>
        </label>
        
        <button type="submit" disabled={submitting}>
          {submitting ? 'Signing in...' : 'Login'}
        </button>
        
        <p>
          <Link to="/forgot-password">Forgot password?</Link> | 
          <Link to="/register">Create account</Link>
        </p>
      </form>
    </section>
  );
};

export default Login;
