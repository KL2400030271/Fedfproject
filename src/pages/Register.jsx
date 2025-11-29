import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
  });

  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [loading, setLoading] = useState(false);

  const validatePassword = (pwd) => {
    const hasCapital = /[A-Z]/.test(pwd);
    const hasNumber = /[0-9]/.test(pwd);
    const hasSpecial = /[!@#$%^&*]/.test(pwd);
    const isLongEnough = pwd.length >= 8;

    if (!isLongEnough) return 'weak';
    if (hasCapital && hasNumber && hasSpecial) return 'strong';
    if ((hasCapital && hasNumber) || (hasCapital && hasSpecial) || (hasNumber && hasSpecial)) return 'medium';
    return 'weak';
  };

  const getPasswordFeedback = (pwd) => {
    const feedback = [];
    if (!/[A-Z]/.test(pwd)) feedback.push('✗ At least 1 capital letter');
    else feedback.push('✓ Capital letter');
    
    if (!/[0-9]/.test(pwd)) feedback.push('✗ At least 1 number');
    else feedback.push('✓ Number');
    
    if (!/[!@#$%^&*]/.test(pwd)) feedback.push('✗ At least 1 special character (!@#$%^&*)');
    else feedback.push('✓ Special character');
    
    if (pwd.length < 8) feedback.push('✗ At least 8 characters');
    else feedback.push('✓ 8+ characters');
    
    return feedback;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'password') {
      setPasswordStrength(validatePassword(value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate name
    if (formData.name.trim().length < 2) {
      setError('Name must be at least 2 characters.');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Validate password strength
    if (validatePassword(formData.password) === 'weak') {
      setError('Password must have: 1 capital letter, 1 number, 1 special character (!@#$%^&*), and 8+ characters.');
      return;
    }

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });

      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create Account</h2>

        {error && <p className="form-error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <label>
            Full Name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </label>

          <label>
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter strong password"
              required
            />
            {formData.password && (
              <div className={`password-feedback password-${passwordStrength}`}>
                {getPasswordFeedback(formData.password).map((item, idx) => (
                  <div key={idx}>{item}</div>
                ))}
              </div>
            )}
          </label>

          <label>
            Confirm Password
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter password"
              required
            />
            {formData.confirmPassword && formData.password !== formData.confirmPassword && (
              <p className="form-error" style={{ margin: '0.25rem 0 0 0', fontSize: '0.85rem' }}>
                Passwords do not match
              </p>
            )}
            {formData.confirmPassword && formData.password === formData.confirmPassword && (
              <p className="form-success" style={{ margin: '0.25rem 0 0 0', fontSize: '0.85rem' }}>
                Passwords match
              </p>
            )}
          </label>

          <label>
            Register as
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="student">Student</option>
              <option value="admin">Admin</option>
            </select>
          </label>

          <button type="submit" className="primary-btn" disabled={loading}>
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>

        <p>
          Already have an account? <a href="/login">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
