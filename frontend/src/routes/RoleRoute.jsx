import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Loading } from '../components/common/Loading';
import { DashboardLayout } from '../components/layout/DashboardLayout';

export const RoleRoute = ({ allowedRoles }) => {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const hasAccess = user && allowedRoles.includes(user.rol);

  if (!hasAccess) {
    return <Navigate to="/login" replace />;
  }

  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
};
