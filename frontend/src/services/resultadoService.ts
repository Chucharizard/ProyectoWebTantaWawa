import axiosInstance from '../api/axiosConfig';
import { ENDPOINTS } from '../api/endpoints';
import {
  ResultadoEvaluacionObtenerDto,
  ResultadoEvaluacionSimpleDto,
  ResultadoPorEstudianteDto,
  ResultadoPorCursoEstudianteDto,
  ResultadoEvaluacionCrearDto,
  ResultadoEvaluacionActualizarDto,
} from '../types/resultado.types';
import { ApiResponse } from '../types/api.types';

export const resultadoService = {
  obtenerTodos: async (): Promise<ResultadoEvaluacionObtenerDto[]> => {
    const response = await axiosInstance.get<ResultadoEvaluacionObtenerDto[]>(ENDPOINTS.RESULTADO.OBTENER_TODOS);
    return response.data;
  },

  obtenerPorEvaluacion: async (evaluacionId: number): Promise<ResultadoEvaluacionSimpleDto[]> => {
    const response = await axiosInstance.get<ResultadoEvaluacionSimpleDto[]>(
      ENDPOINTS.RESULTADO.POR_EVALUACION(evaluacionId)
    );
    return response.data;
  },

  obtenerPorEstudiante: async (estudianteId: number): Promise<ResultadoPorEstudianteDto[]> => {
    const response = await axiosInstance.get<ResultadoPorEstudianteDto[]>(
      ENDPOINTS.RESULTADO.POR_ESTUDIANTE(estudianteId)
    );
    return response.data;
  },

  obtenerPorEstudianteCurso: async (
    estudianteId: number,
    cursoId: number
  ): Promise<ResultadoPorCursoEstudianteDto[]> => {
    const response = await axiosInstance.get<ResultadoPorCursoEstudianteDto[]>(
      ENDPOINTS.RESULTADO.POR_ESTUDIANTE_CURSO(estudianteId, cursoId)
    );
    return response.data;
  },

  obtenerPorId: async (id: number): Promise<ResultadoEvaluacionObtenerDto> => {
    const response = await axiosInstance.get<ResultadoEvaluacionObtenerDto>(ENDPOINTS.RESULTADO.OBTENER_POR_ID(id));
    return response.data;
  },

  crear: async (data: ResultadoEvaluacionCrearDto): Promise<ApiResponse<ResultadoEvaluacionObtenerDto>> => {
    const response = await axiosInstance.post<ApiResponse<ResultadoEvaluacionObtenerDto>>(
      ENDPOINTS.RESULTADO.CREAR,
      data
    );
    return response.data;
  },

  actualizar: async (data: ResultadoEvaluacionActualizarDto): Promise<ApiResponse<ResultadoEvaluacionObtenerDto>> => {
    const response = await axiosInstance.put<ApiResponse<ResultadoEvaluacionObtenerDto>>(
      ENDPOINTS.RESULTADO.ACTUALIZAR,
      data
    );
    return response.data;
  },

  eliminar: async (id: number): Promise<ApiResponse<ResultadoEvaluacionObtenerDto>> => {
    const response = await axiosInstance.delete<ApiResponse<ResultadoEvaluacionObtenerDto>>(
      ENDPOINTS.RESULTADO.ELIMINAR,
      {
        data: { id },
      }
    );
    return response.data;
  },
};
