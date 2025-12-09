import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card } from '../../components/common/Card';
import { useAuth } from '../../contexts/AuthContext';

export const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Bienvenido, {user?.nombreCompleto}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card title="Usuarios">
            <p className="text-3xl font-bold text-blue-600">-</p>
            <p className="text-gray-600 text-sm">Total de usuarios</p>
          </Card>

          <Card title="Cursos">
            <p className="text-3xl font-bold text-green-600">-</p>
            <p className="text-gray-600 text-sm">Cursos activos</p>
          </Card>

          <Card title="Inscripciones">
            <p className="text-3xl font-bold text-purple-600">-</p>
            <p className="text-gray-600 text-sm">Total inscripciones</p>
          </Card>

          <Card title="Docentes">
            <p className="text-3xl font-bold text-orange-600">-</p>
            <p className="text-gray-600 text-sm">Docentes activos</p>
          </Card>
        </div>

        <Card title="Panel de Administración">
          <p className="text-gray-600">
            Desde aquí puedes gestionar usuarios, cursos e inscripciones del sistema.
          </p>
        </Card>
      </div>
    </DashboardLayout>
  );
};
