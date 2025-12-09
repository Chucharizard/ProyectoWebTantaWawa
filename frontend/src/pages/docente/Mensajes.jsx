import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useMensajesPorCurso, useCrearMensaje, useEliminarMensaje } from '../../hooks/useMensajes';
import { useCursosPorDocente } from '../../hooks/useCursos';
import { useAuth } from '../../contexts/AuthContext';
import Modal from '../../components/common/Modal';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Card from '../../components/common/Card';

const Mensajes = () => {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCursoId, setSelectedCursoId] = useState(searchParams.get('curso') || '');

  const { data: cursos } = useCursosPorDocente(user?.id);
  const { data: mensajes, isLoading } = useMensajesPorCurso(selectedCursoId);
  const crearMensaje = useCrearMensaje();
  const eliminarMensaje = useEliminarMensaje();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    asunto: '',
    contenido: '',
  });

  useEffect(() => {
    if (selectedCursoId) {
      setSearchParams({ curso: selectedCursoId });
    }
  }, [selectedCursoId, setSearchParams]);

  const handleOpenModal = () => {
    setFormData({
      asunto: '',
      contenido: '',
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
      await crearMensaje.mutateAsync({
        ...formData,
        cursoId: selectedCursoId,
        remitenteId: user.id,
      });
      handleCloseModal();
    } catch (error) {
      console.error('Error al crear mensaje:', error);
      alert(error.response?.data?.message || 'Error al crear mensaje');
    }
  };

  const handleDelete = async (mensaje) => {
    if (window.confirm(`¿Está seguro de eliminar este mensaje?`)) {
      try {
        await eliminarMensaje.mutateAsync(mensaje.id);
      } catch (error) {
        console.error('Error al eliminar mensaje:', error);
        alert(error.response?.data?.message || 'Error al eliminar mensaje');
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Mensajes del Curso</h1>
        <Button onClick={handleOpenModal} disabled={!selectedCursoId}>
          Nuevo Mensaje
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
        <div className="space-y-4">
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : !mensajes || mensajes.length === 0 ? (
            <Card>
              <p className="text-center text-gray-500 py-8">
                No hay mensajes en este curso
              </p>
            </Card>
          ) : (
            mensajes.map((mensaje) => (
              <Card key={mensaje.id}>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {mensaje.asunto}
                      </h3>
                      <p className="text-sm text-gray-500">
                        De: {mensaje.remitente?.nombre} {mensaje.remitente?.apellido} - {' '}
                        {new Date(mensaje.fechaEnvio).toLocaleString()}
                      </p>
                    </div>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(mensaje)}
                      size="sm"
                    >
                      Eliminar
                    </Button>
                  </div>
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {mensaje.contenido}
                  </p>
                </div>
              </Card>
            ))
          )}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Nuevo Mensaje"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Asunto"
            type="text"
            value={formData.asunto}
            onChange={(e) => setFormData({ ...formData, asunto: e.target.value })}
            required
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contenido
            </label>
            <textarea
              value={formData.contenido}
              onChange={(e) => setFormData({ ...formData, contenido: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="6"
              required
            />
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <Button type="button" variant="secondary" onClick={handleCloseModal}>
              Cancelar
            </Button>
            <Button type="submit" isLoading={crearMensaje.isPending}>
              Enviar
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Mensajes;
