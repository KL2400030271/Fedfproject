import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import hasRole from '../utils/roleCheck';

const PrivateRoute = ({ children, allowedRoles }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <p className="loading-text">Loading...</p>;
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !hasRole(currentUser, allowedRoles)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;



