import axiosInstance from '../api/axiosConfig';
import { ENDPOINTS } from '../api/endpoints';
import {
  Usuario,
  UsuarioCrearDto,
  UsuarioActualizarDto,
  UsuarioCambiarPasswordDto,
  UsuarioResetPasswordDto,
} from '../types/usuario.types';
import { ApiResponse } from '../types/api.types';

export const usuarioService = {
  obtenerTodos: async (): Promise<Usuario[]> => {
    const response = await axiosInstance.get<Usuario[]>(ENDPOINTS.USUARIO.OBTENER_TODOS);
    return response.data;
  },

  obtenerPorId: async (id: number): Promise<Usuario> => {
    const response = await axiosInstance.get<Usuario>(ENDPOINTS.USUARIO.OBTENER_POR_ID(id));
    return response.data;
  },

  buscarPorCI: async (ci: string): Promise<Usuario[]> => {
    const response = await axiosInstance.get<Usuario[]>(ENDPOINTS.USUARIO.BUSCAR_POR_CI(ci));
    return response.data;
  },

  buscarPorNombre: async (nombre: string): Promise<Usuario[]> => {
    const response = await axiosInstance.get<Usuario[]>(ENDPOINTS.USUARIO.BUSCAR_POR_NOMBRE(nombre));
    return response.data;
  },

  crear: async (data: UsuarioCrearDto): Promise<ApiResponse<Usuario>> => {
    const response = await axiosInstance.post<ApiResponse<Usuario>>(ENDPOINTS.USUARIO.CREAR, data);
    return response.data;
  },

  actualizar: async (data: UsuarioActualizarDto): Promise<ApiResponse<Usuario>> => {
    const response = await axiosInstance.put<ApiResponse<Usuario>>(ENDPOINTS.USUARIO.ACTUALIZAR, data);
    return response.data;
  },

  cambiarPassword: async (data: UsuarioCambiarPasswordDto): Promise<ApiResponse<void>> => {
    const response = await axiosInstance.put<ApiResponse<void>>(ENDPOINTS.USUARIO.CAMBIAR_PASSWORD, data);
    return response.data;
  },

  resetPassword: async (data: UsuarioResetPasswordDto): Promise<ApiResponse<void>> => {
    const response = await axiosInstance.put<ApiResponse<void>>(ENDPOINTS.USUARIO.RESET_PASSWORD, data);
    return response.data;
  },

  activar: async (id: number): Promise<ApiResponse<Usuario>> => {
    const response = await axiosInstance.put<ApiResponse<Usuario>>(ENDPOINTS.USUARIO.ACTIVAR, { id });
    return response.data;
  },

  eliminar: async (id: number): Promise<ApiResponse<Usuario>> => {
    const response = await axiosInstance.put<ApiResponse<Usuario>>(ENDPOINTS.USUARIO.ELIMINAR, { id });
    return response.data;
  },
};
