import { createContext, useEffect, useState } from 'react';
import {
  fakeLogin,
  fakeRegister,
  getResources,
  getSessions,
  getUsers,
  createSession,
  createResource,
  deleteResource,
  updateSessionStatus,
} from '../services/apiClient';

export const AuthContext = createContext(null);

// NEW: read initial user from localStorage
const getInitialUser = () => {
  try {
    const saved = localStorage.getItem('currentUser');
    return saved ? JSON.parse(saved) : null;
  } catch (e) {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(getInitialUser);
  const [resources, setResources] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bootstrapData = async () => {
      try {
        const [resourceList, sessionList, userList] = await Promise.all([
          getResources(),
          getSessions(),
          getUsers(),
        ]);
        setResources(resourceList);
        setSessions(sessionList);
        setUsers(userList);
      } catch (error) {
        console.error('Failed to load initial data', error);
      } finally {
        setLoading(false);
      }
    };

    bootstrapData();
  }, []);

  // UPDATED: persist to localStorage
  const login = async ({ email, password, role }) => {
    const user = await fakeLogin({ email, password, role });
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    return user;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  // UPDATED: also refresh users list and persist
  const register = async ({ name, email, password, role }) => {
    const user = await fakeRegister({ name, email, password, role });
    // Refresh users list from localStorage to ensure consistency
    const userList = await getUsers();
    setUsers(userList);
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    return user;
  };

  const addSession = async (sessionData) => {
    if (!currentUser) {
      throw new Error('You must be logged in to book a session.');
    }

    const newSession = await createSession({
      ...sessionData,
      userId: currentUser.id,
      userName: currentUser.name,
    });

    setSessions((prev) => [...prev, newSession]);
    return newSession;
  };

  const addResource = async (resourceData) => {
    const newResource = await createResource(resourceData);
    setResources((prev) => [...prev, newResource]);
    return newResource;
  };

  const removeResource = async (resourceId) => {
    await deleteResource(resourceId);
    setResources((prev) => prev.filter((resource) => resource.id !== resourceId));
    return { id: resourceId };
  };

  // version that supports meetingLink and cancelReason
  const updateSession = async (sessionId, status, meetingLink, cancelReason) => {
    const updatedSession = await updateSessionStatus(sessionId, status, meetingLink, cancelReason);
    setSessions((prev) =>
      prev.map((session) => (session.id === sessionId ? updatedSession : session))
    );
    return updatedSession;
  };

  const value = {
    currentUser,
    resources,
    sessions,
    users,
    loading,
    login,
    logout,
    register,
    addSession,
    addResource,
    removeResource,
    updateSession,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
