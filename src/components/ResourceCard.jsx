const ResourceCard = ({ title, category, description }) => {
  return (
    <article className="resource-card">
      <p className="resource-category">{category}</p>
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  );
};

export default ResourceCard;


