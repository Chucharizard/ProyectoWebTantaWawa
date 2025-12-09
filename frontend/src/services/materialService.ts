import axiosInstance from '../api/axiosConfig';
import { ENDPOINTS } from '../api/endpoints';
import {
  MaterialObtenerDto,
  MaterialSimpleDto,
  MaterialCrearDto,
  MaterialActualizarDto,
} from '../types/material.types';
import { ApiResponse } from '../types/api.types';

export const materialService = {
  obtenerTodos: async (): Promise<MaterialObtenerDto[]> => {
    const response = await axiosInstance.get<MaterialObtenerDto[]>(ENDPOINTS.MATERIAL.OBTENER_TODOS);
    return response.data;
  },

  obtenerPorCurso: async (cursoId: number): Promise<MaterialSimpleDto[]> => {
    const response = await axiosInstance.get<MaterialSimpleDto[]>(ENDPOINTS.MATERIAL.POR_CURSO(cursoId));
    return response.data;
  },

  obtenerPorId: async (id: number): Promise<MaterialObtenerDto> => {
    const response = await axiosInstance.get<MaterialObtenerDto>(ENDPOINTS.MATERIAL.OBTENER_POR_ID(id));
    return response.data;
  },

  buscarPorTitulo: async (cursoId: number, titulo: string): Promise<MaterialSimpleDto[]> => {
    const response = await axiosInstance.get<MaterialSimpleDto[]>(
      ENDPOINTS.MATERIAL.BUSCAR_POR_TITULO(cursoId, titulo)
    );
    return response.data;
  },

  crear: async (data: MaterialCrearDto): Promise<ApiResponse<MaterialObtenerDto>> => {
    const response = await axiosInstance.post<ApiResponse<MaterialObtenerDto>>(ENDPOINTS.MATERIAL.CREAR, data);
    return response.data;
  },

  actualizar: async (data: MaterialActualizarDto): Promise<ApiResponse<MaterialObtenerDto>> => {
    const response = await axiosInstance.put<ApiResponse<MaterialObtenerDto>>(ENDPOINTS.MATERIAL.ACTUALIZAR, data);
    return response.data;
  },

  eliminar: async (id: number): Promise<ApiResponse<MaterialObtenerDto>> => {
    const response = await axiosInstance.delete<ApiResponse<MaterialObtenerDto>>(ENDPOINTS.MATERIAL.ELIMINAR(id));
    return response.data;
  },
};
