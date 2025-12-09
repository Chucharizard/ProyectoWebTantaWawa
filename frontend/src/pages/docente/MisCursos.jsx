import { useCursosPorDocente } from '../../hooks/useCursos';
import { useAuth } from '../../contexts/AuthContext';
import Card from '../../components/common/Card';
import { Link } from 'react-router-dom';

const MisCursos = () => {
  const { user } = useAuth();
  const { data: cursos, isLoading } = useCursosPorDocente(user?.id);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Mis Cursos</h1>

      {!cursos || cursos.length === 0 ? (
        <Card>
          <p className="text-center text-gray-500 py-8">
            No tiene cursos asignados actualmente
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cursos.map((curso) => (
            <Card key={curso.id}>
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {curso.nombre}
                  </h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {curso.codigo}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  {curso.descripcion}
                </p>
                <div className="flex gap-2">
                  <Link
                    to={`/docente/materiales?curso=${curso.id}`}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Ver Materiales
                  </Link>
                  <span className="text-gray-300">|</span>
                  <Link
                    to={`/docente/mensajes?curso=${curso.id}`}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Ver Mensajes
                  </Link>
                  <span className="text-gray-300">|</span>
                  <Link
                    to={`/docente/evaluaciones?curso=${curso.id}`}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Ver Evaluaciones
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MisCursos;
