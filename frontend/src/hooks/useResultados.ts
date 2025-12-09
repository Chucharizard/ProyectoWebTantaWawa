import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { resultadoService } from '../services/resultadoService';
import { ResultadoEvaluacionCrearDto, ResultadoEvaluacionActualizarDto } from '../types/resultado.types';

const QUERY_KEY = 'resultados';

export const useResultadosPorEstudiante = (estudianteId: number) => {
  return useQuery({
    queryKey: [QUERY_KEY, 'estudiante', estudianteId],
    queryFn: () => resultadoService.obtenerPorEstudiante(estudianteId),
    enabled: !!estudianteId,
  });
};

export const useResultadosPorEstudianteCurso = (estudianteId: number, cursoId: number) => {
  return useQuery({
    queryKey: [QUERY_KEY, 'estudiante', estudianteId, 'curso', cursoId],
    queryFn: () => resultadoService.obtenerPorEstudianteCurso(estudianteId, cursoId),
    enabled: !!estudianteId && !!cursoId,
  });
};

export const useCrearResultado = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ResultadoEvaluacionCrearDto) => resultadoService.crear(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'estudiante', variables.estudianteId] });
      queryClient.invalidateQueries({ queryKey: ['evaluaciones', variables.evaluacionId, 'resultados'] });
    },
  });
};

export const useActualizarResultado = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ResultadoEvaluacionActualizarDto) => resultadoService.actualizar(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: ['evaluaciones'] });
    },
  });
};

export const useEliminarResultado = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => resultadoService.eliminar(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: ['evaluaciones'] });
    },
  });
};
