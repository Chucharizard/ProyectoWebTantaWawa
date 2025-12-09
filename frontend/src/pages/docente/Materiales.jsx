import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useMaterialesPorCurso, useCrearMaterial, useEliminarMaterial } from '../../hooks/useMateriales';
import { useCursosPorDocente } from '../../hooks/useCursos';
import { useAuth } from '../../contexts/AuthContext';
import Table from '../../components/common/Table';
import Modal from '../../components/common/Modal';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Card from '../../components/common/Card';

const Materiales = () => {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCursoId, setSelectedCursoId] = useState(searchParams.get('curso') || '');

  const { data: cursos } = useCursosPorDocente(user?.id);
  const { data: materiales, isLoading } = useMaterialesPorCurso(selectedCursoId);
  const crearMaterial = useCrearMaterial();
  const eliminarMaterial = useEliminarMaterial();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    tipo: 'PDF',
    url: '',
  });

  useEffect(() => {
    if (selectedCursoId) {
      setSearchParams({ curso: selectedCursoId });
    }
  }, [selectedCursoId, setSearchParams]);

  const columns = [
    { key: 'titulo', label: 'Título' },
    { key: 'descripcion', label: 'Descripción' },
    { key: 'tipo', label: 'Tipo' },
    {
      key: 'url',
      label: 'Enlace',
      render: (url) => (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800"
        >
          Abrir
        </a>
      )
    },
    {
      key: 'fechaCreacion',
      label: 'Fecha',
      render: (fecha) => new Date(fecha).toLocaleDateString()
    },
  ];

  const handleOpenModal = () => {
    setFormData({
      titulo: '',
      descripcion: '',
      tipo: 'PDF',
      url: '',
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCursoId) {
      alert('Por favor seleccione un curso');
      return;
    }
    try {
      await crearMaterial.mutateAsync({
        ...formData,
        cursoId: selectedCursoId,
      });
      handleCloseModal();
    } catch (error) {
      console.error('Error al crear material:', error);
      alert(error.response?.data?.message || 'Error al crear material');
    }
  };

  const handleDelete = async (material) => {
    if (window.confirm(`¿Está seguro de eliminar el material ${material.titulo}?`)) {
      try {
        await eliminarMaterial.mutateAsync(material.id);
      } catch (error) {
        console.error('Error al eliminar material:', error);
        alert(error.response?.data?.message || 'Error al eliminar material');
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Materiales del Curso</h1>
        <Button onClick={handleOpenModal} disabled={!selectedCursoId}>
          Nuevo Material
        </Button>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Seleccionar Curso
        </label>
        <select
          value={selectedCursoId}
          onChange={(e) => setSelectedCursoId(e.target.value)}
          className="w-full md:w-96 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Seleccione un curso</option>
          {cursos?.map((curso) => (
            <option key={curso.id} value={curso.id}>
              {curso.codigo} - {curso.nombre}
            </option>
          ))}
        </select>
      </div>

      {selectedCursoId && (
        <Card>
          <Table
            columns={columns}
            data={materiales || []}
            loading={isLoading}
            onDelete={handleDelete}
          />
        </Card>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Nuevo Material"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Título"
            type="text"
            value={formData.titulo}
            onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
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
              Tipo
            </label>
            <select
              value={formData.tipo}
              onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="PDF">PDF</option>
              <option value="Video">Video</option>
              <option value="Enlace">Enlace</option>
              <option value="Documento">Documento</option>
            </select>
          </div>
          <Input
            label="URL"
            type="url"
            value={formData.url}
            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
            required
          />
          <div className="flex justify-end gap-2 mt-6">
            <Button type="button" variant="secondary" onClick={handleCloseModal}>
              Cancelar
            </Button>
            <Button type="submit" isLoading={crearMaterial.isPending}>
              Crear
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Materiales;
