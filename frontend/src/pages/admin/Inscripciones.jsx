import { useState } from 'react';
import { useInscripciones, useCrearInscripcion, useEliminarInscripcion } from '../../hooks/useInscripciones';
import { useUsuarios } from '../../hooks/useUsuarios';
import { useCursos } from '../../hooks/useCursos';
import Table from '../../components/common/Table';
import Modal from '../../components/common/Modal';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';

const Inscripciones = () => {
  const { data: inscripciones, isLoading } = useInscripciones();
  const { data: usuarios } = useUsuarios();
  const { data: cursos } = useCursos();
  const crearInscripcion = useCrearInscripcion();
  const eliminarInscripcion = useEliminarInscripcion();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    estudianteId: '',
    cursoId: '',
  });

  const estudiantes = usuarios?.filter(u => u.rol?.nombre === 'Estudiante') || [];

  const columns = [
    {
      key: 'estudiante',
      label: 'Estudiante',
      render: (estudiante) => estudiante ? `${estudiante.nombre} ${estudiante.apellido}` : '-'
    },
    {
      key: 'curso',
      label: 'Curso',
      render: (curso) => curso ? `${curso.codigo} - ${curso.nombre}` : '-'
    },
    {
      key: 'fechaInscripcion',
      label: 'Fecha de Inscripción',
      render: (fecha) => new Date(fecha).toLocaleDateString()
    },
  ];

  const handleOpenModal = () => {
    setFormData({
      estudianteId: '',
      cursoId: '',
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await crearInscripcion.mutateAsync(formData);
      handleCloseModal();
    } catch (error) {
      console.error('Error al crear inscripción:', error);
      alert(error.response?.data?.message || 'Error al crear inscripción');
    }
  };

  const handleDelete = async (inscripcion) => {
    if (window.confirm(`¿Está seguro de eliminar esta inscripción?`)) {
      try {
        await eliminarInscripcion.mutateAsync(inscripcion.id);
      } catch (error) {
        console.error('Error al eliminar inscripción:', error);
        alert(error.response?.data?.message || 'Error al eliminar inscripción');
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Gestión de Inscripciones</h1>
        <Button onClick={handleOpenModal}>
          Nueva Inscripción
        </Button>
      </div>

      <Card>
        <Table
          columns={columns}
          data={inscripciones || []}
          loading={isLoading}
          onDelete={handleDelete}
        />
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Nueva Inscripción"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Estudiante
            </label>
            <select
              value={formData.estudianteId}
              onChange={(e) => setFormData({ ...formData, estudianteId: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Seleccione un estudiante</option>
              {estudiantes.map((estudiante) => (
                <option key={estudiante.id} value={estudiante.id}>
                  {estudiante.nombre} {estudiante.apellido} ({estudiante.ci})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Curso
            </label>
            <select
              value={formData.cursoId}
              onChange={(e) => setFormData({ ...formData, cursoId: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Seleccione un curso</option>
              {cursos?.map((curso) => (
                <option key={curso.id} value={curso.id}>
                  {curso.codigo} - {curso.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <Button type="button" variant="secondary" onClick={handleCloseModal}>
              Cancelar
            </Button>
            <Button type="submit" loading={crearInscripcion.isPending}>
              Crear
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Inscripciones;
