import axiosInstance from '../api/axiosConfig';
import { ENDPOINTS } from '../api/endpoints';

export const materialService = {
  obtenerTodos: async () => {
    const response = await axiosInstance.get(ENDPOINTS.MATERIAL.OBTENER_TODOS);
    return response.data;
  },

  obtenerPorCurso: async (cursoId) => {
    const response = await axiosInstance.get(ENDPOINTS.MATERIAL.POR_CURSO(cursoId));
    return response.data;
  },

  obtenerPorId: async (id) => {
    const response = await axiosInstance.get(ENDPOINTS.MATERIAL.OBTENER_POR_ID(id));
    return response.data;
  },

  buscarPorTitulo: async (cursoId, titulo) => {
    const response = await axiosInstance.get(ENDPOINTS.MATERIAL.BUSCAR_POR_TITULO(cursoId, titulo));
    return response.data;
  },

  crear: async (data) => {
    const response = await axiosInstance.post(ENDPOINTS.MATERIAL.CREAR, data);
    return response.data;
  },

  actualizar: async (data) => {
    const response = await axiosInstance.put(ENDPOINTS.MATERIAL.ACTUALIZAR, data);
    return response.data;
  },

  eliminar: async (id) => {
    const response = await axiosInstance.delete(ENDPOINTS.MATERIAL.ELIMINAR(id));
    return response.data;
  },
};
