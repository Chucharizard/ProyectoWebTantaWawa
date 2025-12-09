import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import { RoleRoute } from './RoleRoute';
import { Login } from '../pages/Login';
import { NotFound } from '../pages/NotFound';
import { AdminDashboard } from '../pages/admin/Dashboard';
import { DocenteDashboard } from '../pages/docente/Dashboard';
import { EstudianteDashboard } from '../pages/estudiante/Dashboard';
import { ROLES } from '../types/rol.types';
import { useAuth } from '../contexts/AuthContext';

export const AppRoutes: React.FC = () => {
  const { user } = useAuth();

  // Redirect root based on role
  const getRootRedirect = () => {
    if (!user) return '/login';

    switch (user.rol) {
      case ROLES.ADMINISTRADOR:
        return '/admin/dashboard';
      case ROLES.DOCENTE:
        return '/docente/dashboard';
      case ROLES.ESTUDIANTE:
        return '/estudiante/dashboard';
      default:
        return '/login';
    }
  };

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate to={getRootRedirect()} replace />} />

      {/* Admin routes */}
      <Route element={<RoleRoute allowedRoles={[ROLES.ADMINISTRADOR]} />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        {/* Add more admin routes here */}
      </Route>

      {/* Docente routes */}
      <Route element={<RoleRoute allowedRoles={[ROLES.DOCENTE]} />}>
        <Route path="/docente/dashboard" element={<DocenteDashboard />} />
        {/* Add more docente routes here */}
      </Route>

      {/* Estudiante routes */}
      <Route element={<RoleRoute allowedRoles={[ROLES.ESTUDIANTE]} />}>
        <Route path="/estudiante/dashboard" element={<EstudianteDashboard />} />
        {/* Add more estudiante routes here */}
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
