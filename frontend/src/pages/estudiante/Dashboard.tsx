import React from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card } from '../../components/common/Card';
import { useAuth } from '../../contexts/AuthContext';

export const EstudianteDashboard: React.FC = () => {
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
            <p className="text-gray-600 text-sm">Cursos inscritos</p>
          </Card>

          <Card title="Evaluaciones">
            <p className="text-3xl font-bold text-green-600">-</p>
            <p className="text-gray-600 text-sm">Evaluaciones realizadas</p>
          </Card>

          <Card title="Promedio">
            <p className="text-3xl font-bold text-purple-600">-</p>
            <p className="text-gray-600 text-sm">Promedio general</p>
          </Card>
        </div>

        <Card title="Mis Cursos">
          <p className="text-gray-600">
            Aquí verás todos tus cursos inscritos, materiales y evaluaciones.
          </p>
        </Card>
      </div>
    </DashboardLayout>
  );
};
