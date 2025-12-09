import { useRoles } from '../../hooks/useRoles';
import Table from '../../components/common/Table';
import Card from '../../components/common/Card';

const Roles = () => {
  const { data: roles, isLoading } = useRoles();

  const columns = [
    { key: 'nombreRol', label: 'Nombre del Rol' },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Roles del Sistema</h1>
      </div>

      <Card>
        <Table
          columns={columns}
          data={roles || []}
          loading={isLoading}
        />
      </Card>
    </div>
  );
};

export default Roles;
