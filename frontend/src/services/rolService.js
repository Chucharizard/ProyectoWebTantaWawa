import axiosInstance from '../api/axiosConfig';
import { ENDPOINTS } from '../api/endpoints';

export const rolService = {
  obtenerTodos: async () => {
    const response = await axiosInstance.get(ENDPOINTS.ROL.OBTENER_TODOS);
    return response.data;
  },

  obtenerPorId: async (id) => {
    const response = await axiosInstance.get(ENDPOINTS.ROL.OBTENER_POR_ID(id));
    return response.data;
  },
};
