const AboutMe = () => {
  return (
    <section className="page-section about-me-page">
      <div className="about-me-content">
        <p className="eyebrow">About the Application</p>
        <h2>Student Mental Health Support Platform</h2>
        
        <div className="about-me-section">
          <h3>Our Mission</h3>
          <p>
            The Student Mental Health Support Platform is designed to provide a safe, accessible, and comprehensive 
            resource for students to manage their mental health and wellbeing. We understand that academic life can be 
            challenging, and we're here to support you every step of the way.
          </p>
        </div>

        <div className="about-me-section">
          <h3>What We Offer</h3>
          <ul className="feature-list">
            <li>
              <strong>Self-Guided Resources:</strong> Access a curated library of mental health resources, including 
              articles, guides, and tools covering topics like stress management, anxiety, wellness, and community support.
            </li>
            <li>
              <strong>Therapy Booking:</strong> Schedule one-on-one therapy sessions with qualified counselors, available 
              both online and in-person to fit your schedule and preferences.
            </li>
            <li>
              <strong>Personal Dashboard:</strong> Track your progress, view your booked sessions, and easily access 
              resources tailored to your needs.
            </li>
            <li>
              <strong>Admin Management:</strong> Our administrators continuously manage and update resources to ensure 
              you have access to the latest and most relevant mental health support materials.
            </li>
          </ul>
        </div>

        <div className="about-me-section">
          <h3>Who Can Use This Platform</h3>
          <div className="user-roles">
            <div className="role-card">
              <h4>Students</h4>
              <p>
                Students can register for an account to access all resources, book therapy sessions, and manage their 
                mental health journey. Your privacy and confidentiality are our top priorities.
              </p>
            </div>
            <div className="role-card">
              <h4>Administrators</h4>
              <p>
                Administrators manage the platform's content, add and update resources, and monitor therapy bookings 
                to ensure the platform serves the student community effectively.
              </p>
            </div>
          </div>
        </div>

        <div className="about-me-section">
          <h3>Getting Started</h3>
          <p>
            New to the platform? Simply register for an account as either a student or administrator, and you'll have 
            immediate access to all features. If you already have an account, log in to continue your journey.
          </p>
          <p>
            Remember, taking care of your mental health is just as important as your academic success. We're here to 
            support you, and there's no shame in asking for help.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;


