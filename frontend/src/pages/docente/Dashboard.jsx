import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card } from '../../components/common/Card';
import { useAuth } from '../../contexts/AuthContext';

export const DocenteDashboard = () => {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Bienvenido, {user?.nombreCompleto}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card title="Mis Cursos">
            <p className="text-3xl font-bold text-blue-600">-</p>
            <p className="text-gray-600 text-sm">Cursos asignados</p>
          </Card>

          <Card title="Materiales">
            <p className="text-3xl font-bold text-green-600">-</p>
            <p className="text-gray-600 text-sm">Materiales publicados</p>
          </Card>

          <Card title="Evaluaciones">
            <p className="text-3xl font-bold text-purple-600">-</p>
            <p className="text-gray-600 text-sm">Evaluaciones creadas</p>
          </Card>
        </div>

        <Card title="Panel Docente">
          <p className="text-gray-600">
            Gestiona tus cursos, materiales, evaluaciones y mensajes.
          </p>
        </Card>
      </div>
    </DashboardLayout>
  );
};
