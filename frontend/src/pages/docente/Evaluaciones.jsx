import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useEvaluacionesPorCurso, useCrearEvaluacion, useEliminarEvaluacion } from '../../hooks/useEvaluaciones';
import { useCrearResultado } from '../../hooks/useResultados';
import { useInscripciones } from '../../hooks/useInscripciones';
import { useCursosPorDocente } from '../../hooks/useCursos';
import { useAuth } from '../../contexts/AuthContext';
import Table from '../../components/common/Table';
import Modal from '../../components/common/Modal';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Card from '../../components/common/Card';

const Evaluaciones = () => {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCursoId, setSelectedCursoId] = useState(searchParams.get('curso') || '');

  const { data: cursos } = useCursosPorDocente(user?.id);
  const { data: evaluaciones, isLoading } = useEvaluacionesPorCurso(selectedCursoId);
  const { data: inscripciones } = useInscripciones();
  const crearEvaluacion = useCrearEvaluacion();
  const eliminarEvaluacion = useEliminarEvaluacion();
  const crearResultado = useCrearResultado();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNotasModalOpen, setIsNotasModalOpen] = useState(false);
  const [selectedEvaluacion, setSelectedEvaluacion] = useState(null);
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    fechaEvaluacion: '',
    puntosTotales: '',
  });
  const [notasData, setNotasData] = useState([]);

  useEffect(() => {
    if (selectedCursoId) {
      setSearchParams({ curso: selectedCursoId });
    }
  }, [selectedCursoId, setSearchParams]);

  const estudiantesDelCurso = inscripciones?.filter(
    i => i.cursoId === selectedCursoId
  ).map(i => i.estudiante) || [];

  const columns = [
    { key: 'titulo', label: 'Título' },
    { key: 'descripcion', label: 'Descripción' },
    {
      key: 'fechaEvaluacion',
      label: 'Fecha',
      render: (fecha) => new Date(fecha).toLocaleDateString()
    },
    { key: 'puntosTotales', label: 'Puntos Totales' },
  ];

  const handleOpenModal = () => {
    setFormData({
      titulo: '',
      descripcion: '',
      fechaEvaluacion: '',
      puntosTotales: '',
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
      await crearEvaluacion.mutateAsync({
        ...formData,
        cursoId: selectedCursoId,
        puntosTotales: parseFloat(formData.puntosTotales),
      });
      handleCloseModal();
    } catch (error) {
      console.error('Error al crear evaluación:', error);
      alert(error.response?.data?.message || 'Error al crear evaluación');
    }
  };

  const handleDelete = async (evaluacion) => {
    if (window.confirm(`¿Está seguro de eliminar la evaluación ${evaluacion.titulo}?`)) {
      try {
        await eliminarEvaluacion.mutateAsync(evaluacion.id);
      } catch (error) {
        console.error('Error al eliminar evaluación:', error);
        alert(error.response?.data?.message || 'Error al eliminar evaluación');
      }
    }
  };

  const handleRegistrarNotas = (evaluacion) => {
    setSelectedEvaluacion(evaluacion);
    setNotasData(
      estudiantesDelCurso.map(estudiante => ({
        estudianteId: estudiante.id,
        estudianteNombre: `${estudiante.nombre} ${estudiante.apellido}`,
        puntosObtenidos: '',
      }))
    );
    setIsNotasModalOpen(true);
  };

  const handleNotaChange = (estudianteId, valor) => {
    setNotasData(prev =>
      prev.map(nota =>
        nota.estudianteId === estudianteId
          ? { ...nota, puntosObtenidos: valor }
          : nota
      )
    );
  };

  const handleSubmitNotas = async (e) => {
    e.preventDefault();
    try {
      for (const nota of notasData) {
        if (nota.puntosObtenidos !== '') {
          await crearResultado.mutateAsync({
            estudianteId: nota.estudianteId,
            evaluacionId: selectedEvaluacion.id,
            puntosObtenidos: parseFloat(nota.puntosObtenidos),
          });
        }
      }
      setIsNotasModalOpen(false);
      alert('Notas registradas exitosamente');
    } catch (error) {
      console.error('Error al registrar notas:', error);
      alert(error.response?.data?.message || 'Error al registrar notas');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Evaluaciones y Notas</h1>
        <Button onClick={handleOpenModal} disabled={!selectedCursoId}>
          Nueva Evaluación
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
            columns={[
              ...columns,
              {
                key: 'acciones',
                label: 'Registrar Notas',
                render: (_, evaluacion) => (
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => handleRegistrarNotas(evaluacion)}
                  >
                    Registrar Notas
                  </Button>
                ),
              },
            ]}
            data={evaluaciones || []}
            loading={isLoading}
            onDelete={handleDelete}
          />
        </Card>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Nueva Evaluación"
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
          <Input
            label="Fecha de Evaluación"
            type="date"
            value={formData.fechaEvaluacion}
            onChange={(e) => setFormData({ ...formData, fechaEvaluacion: e.target.value })}
            required
          />
          <Input
            label="Puntos Totales"
            type="number"
            step="0.01"
            value={formData.puntosTotales}
            onChange={(e) => setFormData({ ...formData, puntosTotales: e.target.value })}
            required
          />
          <div className="flex justify-end gap-2 mt-6">
            <Button type="button" variant="secondary" onClick={handleCloseModal}>
              Cancelar
            </Button>
            <Button type="submit" isLoading={crearEvaluacion.isPending}>
              Crear
            </Button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={isNotasModalOpen}
        onClose={() => setIsNotasModalOpen(false)}
        title={`Registrar Notas - ${selectedEvaluacion?.titulo}`}
        size="lg"
      >
        <form onSubmit={handleSubmitNotas} className="space-y-4">
          <div className="max-h-96 overflow-y-auto">
            {notasData.map((nota) => (
              <div key={nota.estudianteId} className="flex items-center gap-4 mb-3">
                <label className="flex-1 text-sm font-medium text-gray-700">
                  {nota.estudianteNombre}
                </label>
                <Input
                  type="number"
                  step="0.01"
                  max={selectedEvaluacion?.puntosTotales}
                  value={nota.puntosObtenidos}
                  onChange={(e) => handleNotaChange(nota.estudianteId, e.target.value)}
                  placeholder="Puntos"
                />
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <Button type="button" variant="secondary" onClick={() => setIsNotasModalOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" isLoading={crearResultado.isPending}>
              Guardar Notas
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Evaluaciones;
