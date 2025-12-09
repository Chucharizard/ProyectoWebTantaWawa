import axiosInstance from '../api/axiosConfig';
import { ENDPOINTS } from '../api/endpoints';

export const inscripcionService = {
  obtenerTodas: async () => {
    const response = await axiosInstance.get(ENDPOINTS.INSCRIPCION.OBTENER_TODOS);
    return response.data;
  },

  obtenerPorId: async (id) => {
    const response = await axiosInstance.get(ENDPOINTS.INSCRIPCION.OBTENER_POR_ID(id));
    return response.data;
  },

  obtenerPorEstudiante: async (estudianteId) => {
    const response = await axiosInstance.get(ENDPOINTS.INSCRIPCION.POR_ESTUDIANTE(estudianteId));
    return response.data;
  },

  obtenerPorCurso: async (cursoId) => {
    const response = await axiosInstance.get(ENDPOINTS.INSCRIPCION.POR_CURSO(cursoId));
    return response.data;
  },

  crear: async (data) => {
    const response = await axiosInstance.post(ENDPOINTS.INSCRIPCION.CREAR, data);
    return response.data;
  },

  actualizar: async (data) => {
    const response = await axiosInstance.put(ENDPOINTS.INSCRIPCION.ACTUALIZAR, data);
    return response.data;
  },

  eliminar: async (id) => {
    const response = await axiosInstance.delete(ENDPOINTS.INSCRIPCION.ELIMINAR, { data: { id } });
    return response.data;
  },
};
