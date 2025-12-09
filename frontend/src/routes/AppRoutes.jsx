import { Routes, Route, Navigate } from 'react-router-dom';
import { RoleRoute } from './RoleRoute';
import { Login } from '../pages/Login';
import { NotFound } from '../pages/NotFound';
import { AdminDashboard } from '../pages/admin/Dashboard';
import { DocenteDashboard } from '../pages/docente/Dashboard';
import { EstudianteDashboard } from '../pages/estudiante/Dashboard';
import Usuarios from '../pages/admin/Usuarios';
import Cursos from '../pages/admin/Cursos';
import Inscripciones from '../pages/admin/Inscripciones';
import Roles from '../pages/admin/Roles';
import DocenteMisCursos from '../pages/docente/MisCursos';
import DocenteMateriales from '../pages/docente/Materiales';
import DocenteMensajes from '../pages/docente/Mensajes';
import DocenteEvaluaciones from '../pages/docente/Evaluaciones';
import EstudianteMisCursos from '../pages/estudiante/MisCursos';
import EstudianteMateriales from '../pages/estudiante/Materiales';
import EstudianteMisNotas from '../pages/estudiante/MisNotas';
import { ROLES } from '../utils/constants';
import { useAuth } from '../contexts/AuthContext';

export const AppRoutes = () => {
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
        <Route path="/admin/usuarios" element={<Usuarios />} />
        <Route path="/admin/cursos" element={<Cursos />} />
        <Route path="/admin/inscripciones" element={<Inscripciones />} />
        <Route path="/admin/roles" element={<Roles />} />
      </Route>

      {/* Docente routes */}
      <Route element={<RoleRoute allowedRoles={[ROLES.DOCENTE]} />}>
        <Route path="/docente/dashboard" element={<DocenteDashboard />} />
        <Route path="/docente/mis-cursos" element={<DocenteMisCursos />} />
        <Route path="/docente/materiales" element={<DocenteMateriales />} />
        <Route path="/docente/mensajes" element={<DocenteMensajes />} />
        <Route path="/docente/evaluaciones" element={<DocenteEvaluaciones />} />
      </Route>

      {/* Estudiante routes */}
      <Route element={<RoleRoute allowedRoles={[ROLES.ESTUDIANTE]} />}>
        <Route path="/estudiante/dashboard" element={<EstudianteDashboard />} />
        <Route path="/estudiante/mis-cursos" element={<EstudianteMisCursos />} />
        <Route path="/estudiante/materiales" element={<EstudianteMateriales />} />
        <Route path="/estudiante/mis-notas" element={<EstudianteMisNotas />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
