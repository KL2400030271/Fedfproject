const ResourceCard = ({ title, category, description, link }) => {
  return (
    <article className="resource-card">
      <p className="resource-category">{category}</p>
      <h3>{title}</h3>
      <p>{description}</p>

      {link && (
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className="primary-btn"
          style={{ marginTop: '0.75rem', display: 'inline-block' }}
        >
          Open resource
        </a>
      )}
    </article>
  );
};

export default ResourceCard;
