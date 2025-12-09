import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useMaterialesPorCurso } from '../../hooks/useMateriales';
import { useInscripcionesPorEstudiante } from '../../hooks/useInscripciones';
import { useAuth } from '../../contexts/AuthContext';
import Card from '../../components/common/Card';

const Materiales = () => {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCursoId, setSelectedCursoId] = useState(searchParams.get('curso') || '');

  const { data: inscripciones } = useInscripcionesPorEstudiante(user?.id);
  const { data: materiales, isLoading } = useMaterialesPorCurso(selectedCursoId);

  useEffect(() => {
    if (selectedCursoId) {
      setSearchParams({ curso: selectedCursoId });
    }
  }, [selectedCursoId, setSearchParams]);

  const cursos = inscripciones?.map(i => i.curso) || [];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Materiales del Curso</h1>

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
        <div>
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : !materiales || materiales.length === 0 ? (
            <Card>
              <p className="text-center text-gray-500 py-8">
                No hay materiales disponibles en este curso
              </p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {materiales.map((material) => (
                <Card key={material.id}>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {material.titulo}
                      </h3>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {material.tipo}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      {material.descripcion}
                    </p>
                    <p className="text-xs text-gray-500 mb-4">
                      Subido el {new Date(material.fechaCreacion).toLocaleDateString()}
                    </p>
                    <a
                      href={material.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Abrir Material
                    </a>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Materiales;
