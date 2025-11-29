import { useMemo, useState } from 'react';
import ResourceCard from '../components/ResourceCard';
import { useAuth } from '../hooks/useAuth';

const Resources = () => {
  const { resources } = useAuth();
  const [category, setCategory] = useState('all');

  const categories = useMemo(() => {
    const uniqueCategories = new Set(resources.map((resource) => resource.category));
    return ['all', ...uniqueCategories];
  }, [resources]);

  const visibleResources = useMemo(() => {
    if (category === 'all') return resources;
    return resources.filter((resource) => resource.category === category);
  }, [category, resources]);

  return (
    <section className="resources-page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Self-guided care</p>
          <h2>Curated mental health resources</h2>
          <p>Browse guides, toolkits, and community programs built for students.</p>
        </div>
        <label className="select-field">
          Filter by category
          <select value={category} onChange={(event) => setCategory(event.target.value)}>
            {categories.map((option) => (
              <option key={option} value={option}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </option>
            ))}
          </select>
        </label>
      </header>

      <div className="resource-grid">
        {visibleResources.length === 0 ? (
          <p>No resources match that category yet.</p>
        ) : (
          visibleResources.map((resource) => <ResourceCard key={resource.id} {...resource} />)
        )}
      </div>
    </section>
  );
};

export default Resources;



