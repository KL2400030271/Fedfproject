import { usersData, resourcesData, sessionsData, createId } from '../utils/mockData';

const simulateDelay = (promise) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      promise.then(resolve).catch(reject);
    }, 400);
  });

export const fakeLogin = async ({ email, password, role }) => {
  return simulateDelay(
    new Promise((resolve, reject) => {
      const user = usersData.find(
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
      const alreadyExists = usersData.some((user) => user.email === email);

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

      usersData.push(newUser);
      const { password: _ignored, ...safeUser } = newUser;
      resolve(safeUser);
    })
  );
};

export const getResources = async () => {
  return simulateDelay(Promise.resolve([...resourcesData]));
};

export const createResource = async ({ title, category, description }) => {
  return simulateDelay(
    new Promise((resolve, reject) => {
      if (!title || !category) {
        reject(new Error('All fields are required.'));
        return;
      }

      const newResource = {
        id: createId('r'),
        title,
        category,
        description,
      };

      resourcesData.push(newResource);
      resolve(newResource);
    })
  );
};

export const deleteResource = async (resourceId) => {
  return simulateDelay(
    new Promise((resolve, reject) => {
      const index = resourcesData.findIndex((resource) => resource.id === resourceId);
      
      if (index === -1) {
        reject(new Error('Resource not found.'));
        return;
      }

      resourcesData.splice(index, 1);
      resolve({ id: resourceId });
    })
  );
};

export const getSessions = async () => {
  return simulateDelay(Promise.resolve([...sessionsData]));
};

export const createSession = async ({ topic, date, time, mode, userId, userName }) => {
  return simulateDelay(
    new Promise((resolve, reject) => {
      if (!topic || !date || !time || !mode) {
        reject(new Error('Please complete all fields before booking.'));
        return;
      }

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

      sessionsData.push(newSession);
      resolve(newSession);
    })
  );
};

export const getUsers = async () => {
  return simulateDelay(
    Promise.resolve(
      usersData.map(({ password, ...user }) => user).filter((user) => user.role === 'student')
    )
  );
};

export const updateSessionStatus = async (sessionId, status) => {
  return simulateDelay(
    new Promise((resolve, reject) => {
      const session = sessionsData.find((s) => s.id === sessionId);
      
      if (!session) {
        reject(new Error('Session not found.'));
        return;
      }

      if (!['pending', 'approved', 'cancelled'].includes(status)) {
        reject(new Error('Invalid status.'));
        return;
      }

      session.status = status;
      resolve(session);
    })
  );
};


