import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <section className="auth-page">
      <div className="form-card">
        <h2>We lost that page</h2>
        <p>The link you followed might be broken or the page may have moved.</p>
        <Link to="/" className="primary-btn" style={{ textAlign: 'center' }}>
          Go back home
        </Link>
      </div>
    </section>
  );
};

export default NotFound;



