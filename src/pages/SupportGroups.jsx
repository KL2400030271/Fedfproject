import { useState, useEffect } from 'react';
import UserLayout from '../layouts/UserLayout';

const STORAGE_KEY = 'supportGroups';

const SupportGroups = () => {
  // load once from localStorage
  const [groups, setGroups] = useState(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [groupName, setGroupName] = useState('');
  const [groupLink, setGroupLink] = useState('');

  // save whenever groups change
  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(groups));
  }, [groups]);

  const handleCreateGroup = (e) => {
    e.preventDefault();
    if (!groupName.trim() || !groupLink.trim()) return;

    const newGroup = {
      id: `g-${Date.now()}`,
      name: groupName.trim(),
      focus: 'Student-led peer support group',
      meets: 'Schedule will be shared by the group facilitator',
      joinLink: groupLink.trim(),
    };

    setGroups((prev) => [...prev, newGroup]);
    setGroupName('');
    setGroupLink('');
  };

  return (
    <UserLayout>
      <section className="page-section">
        <h2>Support groups</h2>
        <p>Connect with peers who share similar experiences and goals.</p>

        <div className="support-groups-actions">
          <form className="form-card" onSubmit={handleCreateGroup}>
            <h3>Create a support group</h3>
            <p className="eyebrow">Start a new safe space</p>

            <label>
              Group name
              <input
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="e.g. Exam Stress Circle"
                required
              />
            </label>

            <label>
              Group meeting link
              <input
                type="url"
                value={groupLink}
                onChange={(e) => setGroupLink(e.target.value)}
                placeholder="Paste Teams/Meet/Zoom or WhatsApp group link"
                required
              />
            </label>

            <button type="submit" className="primary-btn">
              Create support group
            </button>
          </form>

          <div className="form-card">
            <h3>Join a support group</h3>
            <p className="eyebrow">Pick a group and use its link</p>
            <p style={{ fontSize: '0.85rem', color: '#9ca3af' }}>
              Click “Join” to open the creator&apos;s link in a new tab.
            </p>
          </div>
        </div>
      </section>

      <section className="page-section" style={{ marginTop: '1.5rem' }}>
        <h3>Available support groups</h3>
        {groups.length === 0 ? (
          <p>No support groups are available right now. Be the first to create one!</p>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Group name</th>
                  <th>Focus</th>
                  <th>Meeting details</th>
                  <th>Join</th>
                </tr>
              </thead>
              <tbody>
                {groups.map((group) => (
                  <tr key={group.id}>
                    <td>{group.name}</td>
                    <td>{group.focus}</td>
                    <td>{group.meets}</td>
                    <td>
                      <a
                        href={group.joinLink}
                        target="_blank"
                        rel="noreferrer"
                        className="primary-btn"
                        style={{ padding: '0.25rem 0.7rem', fontSize: '0.8rem' }}
                      >
                        Join
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </UserLayout>
  );
};

export default SupportGroups;
