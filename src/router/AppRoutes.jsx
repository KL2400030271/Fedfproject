import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import AboutMe from '../pages/AboutMe';
import Resources from '../pages/Resources';
import TherapyBooking from '../pages/TherapyBooking';
import UserDashboard from '../pages/UserDashboard';
import AdminDashboard from '../pages/AdminDashboard';
import NotFound from '../pages/NotFound';
import PrivateRoute from '../protected/PrivateRoute';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/aboutme" element={<AboutMe />} />
      <Route path="/resources" element={<Resources />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute allowedRoles={['student']}>
            <UserDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/therapy"
        element={
          <PrivateRoute allowedRoles={['student']}>
            <TherapyBooking />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <PrivateRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;

