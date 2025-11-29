import { defaultUsersData, defaultResourcesData, defaultSessionsData, createId } from '../utils/mockData';

// localStorage keys
const STORAGE_KEYS = {
  USERS: 'appUsers',
  RESOURCES: 'resources',
  SESSIONS: 'sessions',
};

// Helper functions to initialize and manage localStorage
const initializeStorage = (key, defaultData) => {
  try {
    const existing = localStorage.getItem(key);
    if (!existing) {
      localStorage.setItem(key, JSON.stringify(defaultData));
      return defaultData;
    }
    const parsed = JSON.parse(existing);
    if (!Array.isArray(parsed)) {
      localStorage.setItem(key, JSON.stringify(defaultData));
      return defaultData;
    }
    return parsed;
  } catch (e) {
    console.error(`Failed to initialize ${key}`, e);
    localStorage.setItem(key, JSON.stringify(defaultData));
    return defaultData;
  }
};

const getFromStorage = (key, defaultData) => {
  try {
    const data = localStorage.getItem(key);
    if (!data) {
      return initializeStorage(key, defaultData);
    }
    const parsed = JSON.parse(data);
    if (!Array.isArray(parsed)) {
      return initializeStorage(key, defaultData);
    }
    return parsed;
  } catch (e) {
    console.error(`Failed to read ${key}`, e);
    return initializeStorage(key, defaultData);
  }
};

const saveToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error(`Failed to save ${key}`, e);
    throw new Error(`Failed to save ${key}`);
  }
};

const simulateDelay = (promise) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      promise.then(resolve).catch(reject);
    }, 400);
  });

// Initialize storage on module load
initializeStorage(STORAGE_KEYS.USERS, defaultUsersData);
initializeStorage(STORAGE_KEYS.RESOURCES, defaultResourcesData);
initializeStorage(STORAGE_KEYS.SESSIONS, defaultSessionsData);

export const fakeLogin = async ({ email, password, role }) => {
  return simulateDelay(
    new Promise((resolve, reject) => {
      const users = getFromStorage(STORAGE_KEYS.USERS, defaultUsersData);
      const user = users.find(
        (item) => item.email === email && item.password === password && item.role === role
      );

      if (!user) {
        reject(new Error('Invalid credentials. Please try again.'));
        return;
      }

      const { password: _ignored, ...safeUser } = user;
      resolve(safeUser);
    })
  );
};

export const fakeRegister = async ({ name, email, password, role = 'student' }) => {
  return simulateDelay(
    new Promise((resolve, reject) => {
      const users = getFromStorage(STORAGE_KEYS.USERS, defaultUsersData);
      const alreadyExists = users.some((user) => user.email === email);

      if (alreadyExists) {
        reject(new Error('A user with that email already exists.'));
        return;
      }

      const newUser = {
        id: createId('u'),
        name,
        email,
        password,
        role: role || 'student',
      };

      const updatedUsers = [...users, newUser];
      saveToStorage(STORAGE_KEYS.USERS, updatedUsers);

      const { password: _ignored, ...safeUser } = newUser;
      resolve(safeUser);
    })
  );
};

export const getResources = async () => {
  return simulateDelay(
    Promise.resolve([...getFromStorage(STORAGE_KEYS.RESOURCES, [])])
  );
};

export const createResource = async ({ title, category, description, link, visibleTo }) => {
  return simulateDelay(
    new Promise((resolve, reject) => {
      if (!title || !category || !description || !link) {
        reject(new Error('All fields are required.'));
        return;
      }

      const resources = getFromStorage(STORAGE_KEYS.RESOURCES, []);
      const newResource = {
        id: createId('r'),
        title,
        category,
        description,
        link,
        visibleTo: visibleTo || { type: 'all' },
      };

      const updatedResources = [...resources, newResource];
      saveToStorage(STORAGE_KEYS.RESOURCES, updatedResources);
      resolve(newResource);
    })
  );
};

export const deleteResource = async (resourceId) => {
  return simulateDelay(
    new Promise((resolve, reject) => {
      const resources = getFromStorage(STORAGE_KEYS.RESOURCES, []);
      const index = resources.findIndex((resource) => resource.id === resourceId);

      if (index === -1) {
        reject(new Error('Resource not found.'));
        return;
      }

      const updatedResources = resources.filter((resource) => resource.id !== resourceId);
      saveToStorage(STORAGE_KEYS.RESOURCES, updatedResources);
      resolve({ id: resourceId });
    })
  );
};

export const getSessions = async () => {
  return simulateDelay(
    Promise.resolve([...getFromStorage(STORAGE_KEYS.SESSIONS, defaultSessionsData)])
  );
};

export const createSession = async ({ topic, date, time, mode, userId, userName }) => {
  return simulateDelay(
    new Promise((resolve, reject) => {
      if (!topic || !date || !time || !mode) {
        reject(new Error('Please complete all fields before booking.'));
        return;
      }

      const sessions = getFromStorage(STORAGE_KEYS.SESSIONS, defaultSessionsData);
      const newSession = {
        id: createId('s'),
        topic,
        date,
        time,
        mode,
        userId,
        userName,
        status: 'pending',
      };

      const updatedSessions = [...sessions, newSession];
      saveToStorage(STORAGE_KEYS.SESSIONS, updatedSessions);
      resolve(newSession);
    })
  );
};

export const getUsers = async () => {
  return simulateDelay(
    Promise.resolve(
      getFromStorage(STORAGE_KEYS.USERS, defaultUsersData)
        .map(({ password, ...user }) => user)
        .filter((user) => user.role === 'student')
    )
  );
};

export const updateSessionStatus = async (sessionId, status, meetingLink, cancelReason) => {
  return simulateDelay(
    new Promise((resolve, reject) => {
      const sessions = getFromStorage(STORAGE_KEYS.SESSIONS, defaultSessionsData);
      const session = sessions.find((s) => s.id === sessionId);

      if (!session) {
        reject(new Error('Session not found.'));
        return;
      }

      if (!['pending', 'approved', 'cancelled'].includes(status)) {
        reject(new Error('Invalid status.'));
        return;
      }

      const updatedSession = {
        ...session,
        status,
      };

      if (typeof meetingLink === 'string' && meetingLink.trim() !== '') {
        updatedSession.meetingLink = meetingLink.trim();
      }

      if (typeof cancelReason === 'string' && cancelReason.trim() !== '') {
        updatedSession.cancelReason = cancelReason.trim();
      }

      const updatedSessions = sessions.map((s) => (s.id === sessionId ? updatedSession : s));
      saveToStorage(STORAGE_KEYS.SESSIONS, updatedSessions);
      resolve(updatedSession);
    })
  );
};
