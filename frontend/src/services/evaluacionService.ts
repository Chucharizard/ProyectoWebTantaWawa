import axiosInstance from '../api/axiosConfig';
import { ENDPOINTS } from '../api/endpoints';
import {
  EvaluacionObtenerDto,
  EvaluacionSimpleDto,
  EvaluacionCrearDto,
  EvaluacionActualizarDto,
} from '../types/evaluacion.types';
import { ResultadoEvaluacionSimpleDto } from '../types/resultado.types';
import { ApiResponse } from '../types/api.types';

export const evaluacionService = {
  obtenerTodos: async (): Promise<EvaluacionObtenerDto[]> => {
    const response = await axiosInstance.get<EvaluacionObtenerDto[]>(ENDPOINTS.EVALUACION.OBTENER_TODOS);
    return response.data;
  },

  obtenerPorCurso: async (cursoId: number): Promise<EvaluacionSimpleDto[]> => {
    const response = await axiosInstance.get<EvaluacionSimpleDto[]>(ENDPOINTS.EVALUACION.POR_CURSO(cursoId));
    return response.data;
  },

  obtenerPorId: async (id: number): Promise<EvaluacionObtenerDto> => {
    const response = await axiosInstance.get<EvaluacionObtenerDto>(ENDPOINTS.EVALUACION.OBTENER_POR_ID(id));
    return response.data;
  },

  buscarPorTitulo: async (cursoId: number, titulo: string): Promise<EvaluacionSimpleDto[]> => {
    const response = await axiosInstance.get<EvaluacionSimpleDto[]>(
      ENDPOINTS.EVALUACION.BUSCAR_POR_TITULO(cursoId, titulo)
    );
    return response.data;
  },

  obtenerResultados: async (evaluacionId: number): Promise<ResultadoEvaluacionSimpleDto[]> => {
    const response = await axiosInstance.get<ResultadoEvaluacionSimpleDto[]>(
      ENDPOINTS.EVALUACION.OBTENER_RESULTADOS(evaluacionId)
    );
    return response.data;
  },

  crear: async (data: EvaluacionCrearDto): Promise<ApiResponse<EvaluacionObtenerDto>> => {
    const response = await axiosInstance.post<ApiResponse<EvaluacionObtenerDto>>(ENDPOINTS.EVALUACION.CREAR, data);
    return response.data;
  },

  actualizar: async (data: EvaluacionActualizarDto): Promise<ApiResponse<EvaluacionObtenerDto>> => {
    const response = await axiosInstance.put<ApiResponse<EvaluacionObtenerDto>>(
      ENDPOINTS.EVALUACION.ACTUALIZAR,
      data
    );
    return response.data;
  },

  eliminar: async (id: number): Promise<ApiResponse<EvaluacionObtenerDto>> => {
    const response = await axiosInstance.delete<ApiResponse<EvaluacionObtenerDto>>(ENDPOINTS.EVALUACION.ELIMINAR, {
      data: { id },
    });
    return response.data;
  },
};
