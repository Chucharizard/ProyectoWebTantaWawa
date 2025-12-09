import axiosInstance from '../api/axiosConfig';
import { ENDPOINTS } from '../api/endpoints';

export const mensajeService = {
  obtenerTodos: async () => {
    const response = await axiosInstance.get(ENDPOINTS.MENSAJE.OBTENER_TODOS);
    return response.data;
  },

  obtenerPorCurso: async (cursoId) => {
    const response = await axiosInstance.get(ENDPOINTS.MENSAJE.POR_CURSO(cursoId));
    return response.data;
  },

  obtenerPorUsuario: async (usuarioId) => {
    const response = await axiosInstance.get(ENDPOINTS.MENSAJE.POR_USUARIO(usuarioId));
    return response.data;
  },

  obtenerPorId: async (id) => {
    const response = await axiosInstance.get(ENDPOINTS.MENSAJE.OBTENER_POR_ID(id));
    return response.data;
  },

  crear: async (data) => {
    const response = await axiosInstance.post(ENDPOINTS.MENSAJE.CREAR, data);
    return response.data;
  },

  actualizar: async (data) => {
    const response = await axiosInstance.put(ENDPOINTS.MENSAJE.ACTUALIZAR, data);
    return response.data;
  },

  eliminar: async (id) => {
    const response = await axiosInstance.delete(ENDPOINTS.MENSAJE.ELIMINAR(id));
    return response.data;
  },
};
