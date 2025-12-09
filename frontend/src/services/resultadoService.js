import axiosInstance from '../api/axiosConfig';
import { ENDPOINTS } from '../api/endpoints';

export const resultadoService = {
  obtenerTodos: async () => {
    const response = await axiosInstance.get(ENDPOINTS.RESULTADO.OBTENER_TODOS);
    return response.data;
  },

  obtenerPorEvaluacion: async (evaluacionId) => {
    const response = await axiosInstance.get(ENDPOINTS.RESULTADO.POR_EVALUACION(evaluacionId));
    return response.data;
  },

  obtenerPorEstudiante: async (estudianteId) => {
    const response = await axiosInstance.get(ENDPOINTS.RESULTADO.POR_ESTUDIANTE(estudianteId));
    return response.data;
  },

  obtenerPorEstudianteCurso: async (estudianteId, cursoId) => {
    const response = await axiosInstance.get(ENDPOINTS.RESULTADO.POR_ESTUDIANTE_CURSO(estudianteId, cursoId));
    return response.data;
  },

  obtenerPorId: async (id) => {
    const response = await axiosInstance.get(ENDPOINTS.RESULTADO.OBTENER_POR_ID(id));
    return response.data;
  },

  crear: async (data) => {
    const response = await axiosInstance.post(ENDPOINTS.RESULTADO.CREAR, data);
    return response.data;
  },

  actualizar: async (data) => {
    const response = await axiosInstance.put(ENDPOINTS.RESULTADO.ACTUALIZAR, data);
    return response.data;
  },

  eliminar: async (id) => {
    const response = await axiosInstance.delete(ENDPOINTS.RESULTADO.ELIMINAR, { data: { id } });
    return response.data;
  },
};
