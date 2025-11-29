import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Home = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleSupportClick = () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    if (currentUser.role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <section className="hero">
      <div>
        <p className="eyebrow">Campus wellbeing</p>
        <h1>Student Mental Health Support Platform</h1>
        <p>
          Access resources, book therapy sessions, and connect with administrators who care about
          your wellbeing. Everything is in one safe place designed for students.
        </p>
        <div className="hero-actions">
          <button type="button" className="primary-btn" onClick={handleSupportClick}>
            Get Support
          </button>
          <button type="button" className="secondary-btn" onClick={() => navigate('/resources')}>
            Explore Resources
          </button>
        </div>
      </div>
    </section>
  );
};

export default Home;



