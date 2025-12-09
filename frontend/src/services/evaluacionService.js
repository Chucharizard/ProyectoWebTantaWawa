import axiosInstance from '../api/axiosConfig';
import { ENDPOINTS } from '../api/endpoints';

export const evaluacionService = {
  obtenerTodos: async () => {
    const response = await axiosInstance.get(ENDPOINTS.EVALUACION.OBTENER_TODOS);
    return response.data;
  },

  obtenerPorCurso: async (cursoId) => {
    const response = await axiosInstance.get(ENDPOINTS.EVALUACION.POR_CURSO(cursoId));
    return response.data;
  },

  obtenerPorId: async (id) => {
    const response = await axiosInstance.get(ENDPOINTS.EVALUACION.OBTENER_POR_ID(id));
    return response.data;
  },

  obtenerResultados: async (evaluacionId) => {
    const response = await axiosInstance.get(ENDPOINTS.EVALUACION.OBTENER_RESULTADOS(evaluacionId));
    return response.data;
  },

  buscarPorTitulo: async (cursoId, titulo) => {
    const response = await axiosInstance.get(ENDPOINTS.EVALUACION.BUSCAR_POR_TITULO(cursoId, titulo));
    return response.data;
  },

  crear: async (data) => {
    const response = await axiosInstance.post(ENDPOINTS.EVALUACION.CREAR, data);
    return response.data;
  },

  actualizar: async (data) => {
    const response = await axiosInstance.put(ENDPOINTS.EVALUACION.ACTUALIZAR, data);
    return response.data;
  },

  eliminar: async (id) => {
    const response = await axiosInstance.delete(ENDPOINTS.EVALUACION.ELIMINAR(id));
    return response.data;
  },
};
