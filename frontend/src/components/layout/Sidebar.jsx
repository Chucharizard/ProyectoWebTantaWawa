import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ROLES } from '../../utils/constants';

const menuItems = [
  { path: '/admin/dashboard', label: 'Dashboard', roles: [ROLES.ADMINISTRADOR] },
  { path: '/admin/usuarios', label: 'Usuarios', roles: [ROLES.ADMINISTRADOR] },
  { path: '/admin/cursos', label: 'Cursos', roles: [ROLES.ADMINISTRADOR] },
  { path: '/admin/inscripciones', label: 'Inscripciones', roles: [ROLES.ADMINISTRADOR] },
  { path: '/admin/roles', label: 'Roles', roles: [ROLES.ADMINISTRADOR] },

  { path: '/docente/dashboard', label: 'Dashboard', roles: [ROLES.DOCENTE] },
  { path: '/docente/mis-cursos', label: 'Mis Cursos', roles: [ROLES.DOCENTE] },
  { path: '/docente/materiales', label: 'Materiales', roles: [ROLES.DOCENTE] },
  { path: '/docente/mensajes', label: 'Mensajes', roles: [ROLES.DOCENTE] },
  { path: '/docente/evaluaciones', label: 'Evaluaciones y Notas', roles: [ROLES.DOCENTE] },

  { path: '/estudiante/dashboard', label: 'Dashboard', roles: [ROLES.ESTUDIANTE] },
  { path: '/estudiante/mis-cursos', label: 'Mis Cursos', roles: [ROLES.ESTUDIANTE] },
  { path: '/estudiante/materiales', label: 'Materiales', roles: [ROLES.ESTUDIANTE] },
  { path: '/estudiante/mis-notas', label: 'Mis Notas', roles: [ROLES.ESTUDIANTE] },
];

export const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuth();

  const filteredMenuItems = menuItems.filter((item) =>
    item.roles.includes(user?.rol || '')
  );

  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen">
      <div className="p-4">
        <h2 className="text-lg font-bold mb-4">Menú</h2>
        <nav className="space-y-2">
          {filteredMenuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`
                block px-4 py-2 rounded-lg transition-colors
                ${location.pathname === item.path
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700'
                }
              `}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
};
