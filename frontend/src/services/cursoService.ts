import axiosInstance from '../api/axiosConfig';
import { ENDPOINTS } from '../api/endpoints';
import { Curso, CursoCrearDto, CursoActualizarDto } from '../types/curso.types';
import { ApiResponse } from '../types/api.types';

export const cursoService = {
  obtenerTodos: async (): Promise<Curso[]> => {
    const response = await axiosInstance.get<Curso[]>(ENDPOINTS.CURSO.OBTENER_TODOS);
    return response.data;
  },

  obtenerPorId: async (id: number): Promise<Curso> => {
    const response = await axiosInstance.get<Curso>(ENDPOINTS.CURSO.OBTENER_POR_ID(id));
    return response.data;
  },

  buscarPorNombre: async (nombre: string): Promise<Curso[]> => {
    const response = await axiosInstance.get<Curso[]>(ENDPOINTS.CURSO.BUSCAR_POR_NOMBRE(nombre));
    return response.data;
  },

  crear: async (data: CursoCrearDto): Promise<ApiResponse<Curso>> => {
    const response = await axiosInstance.post<ApiResponse<Curso>>(ENDPOINTS.CURSO.CREAR, data);
    return response.data;
  },

  actualizar: async (data: CursoActualizarDto): Promise<ApiResponse<Curso>> => {
    const response = await axiosInstance.put<ApiResponse<Curso>>(ENDPOINTS.CURSO.ACTUALIZAR, data);
    return response.data;
  },

  activar: async (id: number): Promise<ApiResponse<Curso>> => {
    const response = await axiosInstance.put<ApiResponse<Curso>>(ENDPOINTS.CURSO.ACTIVAR, { id });
    return response.data;
  },

  eliminar: async (id: number): Promise<ApiResponse<Curso>> => {
    const response = await axiosInstance.put<ApiResponse<Curso>>(ENDPOINTS.CURSO.ELIMINAR, { id });
    return response.data;
  },
};
