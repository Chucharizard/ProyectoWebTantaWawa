import { useState } from 'react';
import { useCursos, useCrearCurso, useActualizarCurso, useEliminarCurso } from '../../hooks/useCursos';
import { useUsuarios } from '../../hooks/useUsuarios';
import Table from '../../components/common/Table';
import Modal from '../../components/common/Modal';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Card from '../../components/common/Card';

const Cursos = () => {
  const { data: cursos, isLoading } = useCursos();
  const { data: usuarios } = useUsuarios();
  const crearCurso = useCrearCurso();
  const actualizarCurso = useActualizarCurso();
  const eliminarCurso = useEliminarCurso();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCurso, setEditingCurso] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    codigo: '',
    docenteId: '',
  });

  const docentes = usuarios?.filter(u => u.rol?.nombre === 'Docente') || [];

  const columns = [
    { key: 'codigo', label: 'Código' },
    { key: 'nombre', label: 'Nombre' },
    { key: 'descripcion', label: 'Descripción' },
    {
      key: 'docente',
      label: 'Docente',
      render: (docente) => docente ? `${docente.nombre} ${docente.apellido}` : '-'
    },
  ];

  const handleOpenModal = (curso = null) => {
    if (curso) {
      setEditingCurso(curso);
      setFormData({
        nombre: curso.nombre,
        descripcion: curso.descripcion,
        codigo: curso.codigo,
        docenteId: curso.docenteId,
      });
    } else {
      setEditingCurso(null);
      setFormData({
        nombre: '',
        descripcion: '',
        codigo: '',
        docenteId: '',
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCurso(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCurso) {
        await actualizarCurso.mutateAsync({
          id: editingCurso.id,
          ...formData,
        });
      } else {
        await crearCurso.mutateAsync(formData);
      }
      handleCloseModal();
    } catch (error) {
      console.error('Error al guardar curso:', error);
      alert(error.response?.data?.message || 'Error al guardar curso');
    }
  };

  const handleDelete = async (curso) => {
    if (window.confirm(`¿Está seguro de eliminar el curso ${curso.nombre}?`)) {
      try {
        await eliminarCurso.mutateAsync(curso.id);
      } catch (error) {
        console.error('Error al eliminar curso:', error);
        alert(error.response?.data?.message || 'Error al eliminar curso');
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Gestión de Cursos</h1>
        <Button onClick={() => handleOpenModal()}>
          Nuevo Curso
        </Button>
      </div>

      <Card>
        <Table
          columns={columns}
          data={cursos || []}
          loading={isLoading}
          onEdit={handleOpenModal}
          onDelete={handleDelete}
        />
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingCurso ? 'Editar Curso' : 'Nuevo Curso'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Código"
            type="text"
            value={formData.codigo}
            onChange={(e) => setFormData({ ...formData, codigo: e.target.value })}
            required
          />
          <Input
            label="Nombre"
            type="text"
            value={formData.nombre}
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            required
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descripción
            </label>
            <textarea
              value={formData.descripcion}
              onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Docente
            </label>
            <select
              value={formData.docenteId}
              onChange={(e) => setFormData({ ...formData, docenteId: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Seleccione un docente</option>
              {docentes.map((docente) => (
                <option key={docente.id} value={docente.id}>
                  {docente.nombre} {docente.apellido}
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
              loading={crearCurso.isPending || actualizarCurso.isPending}
            >
              {editingCurso ? 'Actualizar' : 'Crear'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Cursos;
