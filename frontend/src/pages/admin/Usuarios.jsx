import { useState } from 'react';
import { useUsuarios, useCrearUsuario, useActualizarUsuario, useEliminarUsuario } from '../../hooks/useUsuarios';
import { useRoles } from '../../hooks/useRoles';
import Table from '../../components/common/Table';
import Modal from '../../components/common/Modal';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Card from '../../components/common/Card';

const Usuarios = () => {
  const { data: usuarios, isLoading } = useUsuarios();
  const { data: roles } = useRoles();
  const crearUsuario = useCrearUsuario();
  const actualizarUsuario = useActualizarUsuario();
  const eliminarUsuario = useEliminarUsuario();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUsuario, setEditingUsuario] = useState(null);
  const [formData, setFormData] = useState({
    ci: '',
    nombre: '',
    apellido: '',
    email: '',
    contrasena: '',
    rolId: '',
  });

  const columns = [
    { key: 'ci', label: 'CI' },
    { key: 'nombre', label: 'Nombre' },
    { key: 'apellido', label: 'Apellido' },
    { key: 'email', label: 'Email' },
    {
      key: 'rol',
      label: 'Rol',
      render: (rol) => rol?.nombre || '-'
    },
  ];

  const handleOpenModal = (usuario = null) => {
    if (usuario) {
      setEditingUsuario(usuario);
      setFormData({
        ci: usuario.ci,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        contrasena: '',
        rolId: usuario.rolId,
      });
    } else {
      setEditingUsuario(null);
      setFormData({
        ci: '',
        nombre: '',
        apellido: '',
        email: '',
        contrasena: '',
        rolId: '',
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingUsuario(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUsuario) {
        await actualizarUsuario.mutateAsync({
          id: editingUsuario.id,
          ...formData,
        });
      } else {
        await crearUsuario.mutateAsync(formData);
      }
      handleCloseModal();
    } catch (error) {
      console.error('Error al guardar usuario:', error);
      alert(error.response?.data?.message || 'Error al guardar usuario');
    }
  };

  const handleDelete = async (usuario) => {
    if (window.confirm(`¿Está seguro de eliminar al usuario ${usuario.nombre} ${usuario.apellido}?`)) {
      try {
        await eliminarUsuario.mutateAsync(usuario.id);
      } catch (error) {
        console.error('Error al eliminar usuario:', error);
        alert(error.response?.data?.message || 'Error al eliminar usuario');
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Gestión de Usuarios</h1>
        <Button onClick={() => handleOpenModal()}>
          Nuevo Usuario
        </Button>
      </div>

      <Card>
        <Table
          columns={columns}
          data={usuarios || []}
          loading={isLoading}
          onEdit={handleOpenModal}
          onDelete={handleDelete}
        />
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingUsuario ? 'Editar Usuario' : 'Nuevo Usuario'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="CI"
            type="text"
            value={formData.ci}
            onChange={(e) => setFormData({ ...formData, ci: e.target.value })}
            required
            disabled={!!editingUsuario}
          />
          <Input
            label="Nombre"
            type="text"
            value={formData.nombre}
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            required
          />
          <Input
            label="Apellido"
            type="text"
            value={formData.apellido}
            onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
            required
          />
          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <Input
            label={editingUsuario ? 'Nueva Contraseña (dejar vacío para mantener)' : 'Contraseña'}
            type="password"
            value={formData.contrasena}
            onChange={(e) => setFormData({ ...formData, contrasena: e.target.value })}
            required={!editingUsuario}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rol
            </label>
            <select
              value={formData.rolId}
              onChange={(e) => setFormData({ ...formData, rolId: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Seleccione un rol</option>
              {roles?.map((rol) => (
                <option key={rol.id} value={rol.id}>
                  {rol.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <Button type="button" variant="secondary" onClick={handleCloseModal}>
              Cancelar
            </Button>
            <Button
              type="submit"
              loading={crearUsuario.isPending || actualizarUsuario.isPending}
            >
              {editingUsuario ? 'Actualizar' : 'Crear'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Usuarios;
