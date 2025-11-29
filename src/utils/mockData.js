// mockData.js

// Default users data (initial seed)
export const defaultUsersData = [
  {
    id: 'u-100',
    name: 'Alex Student',
    email: 'alex@campus.edu',
    password: 'student123',
    role: 'student',
  },
  {
    id: 'u-110',
    name: 'Jamie Lee',
    email: 'jamie@campus.edu',
    password: 'student456',
    role: 'student',
  },
  {
    id: 'u-200',
    name: 'Morgan Admin',
    email: 'admin@campus.edu',
    password: 'admin123',
    role: 'admin',
  },
];

// Default resources data
export const defaultResourcesData = [];

// Default sessions data
export const defaultSessionsData = [
  {
    id: 's-1',
    userId: 'u-100',
    userName: 'Alex Student',
    topic: 'Exam Stress',
    date: '2025-12-01',
    time: '10:00',
    mode: 'online',
    status: 'pending',
  },
  {
    id: 's-2',
    userId: 'u-100',
    userName: 'Alex Student',
    topic: 'Sleep Routine Reset',
    date: '2025-12-05',
    time: '15:30',
    mode: 'offline',
    status: 'approved',
  },
  {
    id: 's-3',
    userId: 'u-110',
    userName: 'Jamie Lee',
    topic: 'First-year Adjustment',
    date: '2025-11-29',
    time: '09:00',
    mode: 'online',
    status: 'approved',
  },
  {
    id: 's-4',
    userId: 'u-110',
    userName: 'Jamie Lee',
    topic: 'Group Therapy Orientation',
    date: '2025-12-10',
    time: '14:00',
    mode: 'offline',
    status: 'pending',
  },
];

export const createId = (prefix) =>
  `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
