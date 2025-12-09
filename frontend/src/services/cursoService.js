import axiosInstance from '../api/axiosConfig';
import { ENDPOINTS } from '../api/endpoints';

export const cursoService = {
  obtenerTodos: async () => {
    const response = await axiosInstance.get(ENDPOINTS.CURSO.OBTENER_TODOS);
    return response.data;
  },

  obtenerPorId: async (id) => {
    const response = await axiosInstance.get(ENDPOINTS.CURSO.OBTENER_POR_ID(id));
    return response.data;
  },

  crear: async (data) => {
    const response = await axiosInstance.post(ENDPOINTS.CURSO.CREAR, data);
    return response.data;
  },

  actualizar: async (data) => {
    const response = await axiosInstance.put(ENDPOINTS.CURSO.ACTUALIZAR, data);
    return response.data;
  },

  eliminar: async (id) => {
    const response = await axiosInstance.put(ENDPOINTS.CURSO.ELIMINAR, { id });
    return response.data;
  },
};
