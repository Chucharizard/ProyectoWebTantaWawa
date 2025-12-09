import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useResultadosPorEstudianteCurso } from '../../hooks/useResultados';
import { useInscripcionesPorEstudiante } from '../../hooks/useInscripciones';
import { useAuth } from '../../contexts/AuthContext';
import Table from '../../components/common/Table';
import Card from '../../components/common/Card';

const MisNotas = () => {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCursoId, setSelectedCursoId] = useState(searchParams.get('curso') || '');

  const { data: inscripciones } = useInscripcionesPorEstudiante(user?.id);
  const { data: resultados, isLoading } = useResultadosPorEstudianteCurso(user?.id, selectedCursoId);

  useEffect(() => {
    if (selectedCursoId) {
      setSearchParams({ curso: selectedCursoId });
    }
  }, [selectedCursoId, setSearchParams]);

  const cursos = inscripciones?.map(i => i.curso) || [];

  const columns = [
    {
      key: 'evaluacion',
      label: 'Evaluación',
      render: (evaluacion) => evaluacion?.titulo || '-'
    },
    {
      key: 'evaluacion',
      label: 'Descripción',
      render: (evaluacion) => evaluacion?.descripcion || '-'
    },
    {
      key: 'evaluacion',
      label: 'Fecha',
      render: (evaluacion) => evaluacion?.fechaEvaluacion
        ? new Date(evaluacion.fechaEvaluacion).toLocaleDateString()
        : '-'
    },
    {
      key: 'puntosObtenidos',
      label: 'Puntos Obtenidos',
    },
    {
      key: 'evaluacion',
      label: 'Puntos Totales',
      render: (evaluacion) => evaluacion?.puntosTotales || '-'
    },
    {
      key: 'porcentaje',
      label: 'Porcentaje',
      render: (_, resultado) => {
        const porcentaje = (resultado.puntosObtenidos / resultado.evaluacion.puntosTotales) * 100;
        const color = porcentaje >= 70 ? 'text-green-600' : porcentaje >= 50 ? 'text-yellow-600' : 'text-red-600';
        return <span className={`font-semibold ${color}`}>{porcentaje.toFixed(2)}%</span>;
      }
    },
  ];

  const calcularPromedio = () => {
    if (!resultados || resultados.length === 0) return 0;
    const total = resultados.reduce((acc, resultado) => {
      const porcentaje = (resultado.puntosObtenidos / resultado.evaluacion.puntosTotales) * 100;
      return acc + porcentaje;
    }, 0);
    return (total / resultados.length).toFixed(2);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Mis Notas</h1>

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
          {cursos.map((curso) => (
            <option key={curso.id} value={curso.id}>
              {curso.codigo} - {curso.nombre}
            </option>
          ))}
        </select>
      </div>

      {selectedCursoId && (
        <>
          {resultados && resultados.length > 0 && (
            <Card className="mb-4">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Resumen del Curso
                </h3>
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Promedio General</p>
                    <p className="text-3xl font-bold text-blue-600">
                      {calcularPromedio()}%
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total de Evaluaciones</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {resultados.length}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          )}

          <Card>
            <Table
              columns={columns}
              data={resultados || []}
              loading={isLoading}
            />
          </Card>
        </>
      )}
    </div>
  );
};

export default MisNotas;
