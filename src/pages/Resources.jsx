import { useAuth } from '../hooks/useAuth';
import UserLayout from '../layouts/UserLayout';
import ResourceCard from '../components/ResourceCard';

const Resources = () => {
  const { resources, currentUser } = useAuth();

  const visibleResources = resources.filter((resource) => {
    if (!resource.visibleTo) return true;
    if (resource.visibleTo.type === 'all') return true;
    if (resource.visibleTo.type === 'users') {
      return resource.visibleTo.userIds.includes(currentUser.id);
    }
    return false;
  });

  console.log('visibleResources', visibleResources); // put it HERE

  return (
    <UserLayout>
      <section className="page-section">
        <h2>Resources</h2>
        <p>Explore helpful articles, videos, and tools.</p>

        {visibleResources.length === 0 ? (
          <p>No resources available yet.</p>
        ) : (
          <div className="resources-grid">
            {visibleResources.map((res) => (
              <ResourceCard
                key={res.id}
                title={res.title}
                category={res.category}
                description={res.description}
                link={res.link}
              />
            ))}
          </div>
        )}
      </section>
    </UserLayout>
  );
};

export default Resources;
