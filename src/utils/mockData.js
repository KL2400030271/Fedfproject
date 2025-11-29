export const usersData = [
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

export const resourcesData = [
  {
    id: 'r-1',
    title: 'Mindfulness Basics',
    category: 'stress',
    description: 'Simple breathing techniques to ease stress before exams.',
  },
  {
    id: 'r-2',
    title: 'Managing Anxiety',
    category: 'anxiety',
    description: 'Grounding exercises to stay present during anxious moments.',
  },
  {
    id: 'r-3',
    title: 'Peer Support Circles',
    category: 'community',
    description: 'Join weekly student-led circles to share and feel heard.',
  },
  {
    id: 'r-4',
    title: 'Sleep Hygiene Guide',
    category: 'wellness',
    description: 'Build a bedtime routine that helps you recharge.',
  },
  {
    id: 'r-5',
    title: 'Nutrition for Mood',
    category: 'wellness',
    description: 'Learn how balanced meals can stabilize energy and mood.',
  },
  {
    id: 'r-6',
    title: 'Quick Grounding Audio',
    category: 'anxiety',
    description: '5-minute guided audio to help calm racing thoughts.',
  },
  {
    id: 'r-7',
    title: 'Group Therapy Interest Form',
    category: 'community',
    description: 'Sign up to join themed peer-led support cohorts.',
  },
  {
    id: 'r-8',
    title: 'Burnout Recovery Plan',
    category: 'stress',
    description: 'Step-by-step workbook to reset expectations mid-semester.',
  },
];

export const sessionsData = [
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

export const createId = (prefix) => `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

