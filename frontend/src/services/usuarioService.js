import axiosInstance from '../api/axiosConfig';
import { ENDPOINTS } from '../api/endpoints';

export const usuarioService = {
  obtenerTodos: async () => {
    const response = await axiosInstance.get(ENDPOINTS.USUARIO.OBTENER_TODOS);
    return response.data;
  },

  obtenerPorId: async (id) => {
    const response = await axiosInstance.get(ENDPOINTS.USUARIO.OBTENER_POR_ID(id));
    return response.data;
  },

  buscarPorCI: async (ci) => {
    const response = await axiosInstance.get(ENDPOINTS.USUARIO.BUSCAR_POR_CI(ci));
    return response.data;
  },

  buscarPorNombre: async (nombre) => {
    const response = await axiosInstance.get(ENDPOINTS.USUARIO.BUSCAR_POR_NOMBRE(nombre));
    return response.data;
  },

  crear: async (data) => {
    const response = await axiosInstance.post(ENDPOINTS.USUARIO.CREAR, data);
    return response.data;
  },

  actualizar: async (data) => {
    const response = await axiosInstance.put(ENDPOINTS.USUARIO.ACTUALIZAR, data);
    return response.data;
  },

  cambiarPassword: async (data) => {
    const response = await axiosInstance.put(ENDPOINTS.USUARIO.CAMBIAR_PASSWORD, data);
    return response.data;
  },

  resetPassword: async (data) => {
    const response = await axiosInstance.put(ENDPOINTS.USUARIO.RESET_PASSWORD, data);
    return response.data;
  },

  activar: async (id) => {
    const response = await axiosInstance.put(ENDPOINTS.USUARIO.ACTIVAR, { id });
    return response.data;
  },

  eliminar: async (id) => {
    const response = await axiosInstance.put(ENDPOINTS.USUARIO.ELIMINAR, { id });
    return response.data;
  },
};
