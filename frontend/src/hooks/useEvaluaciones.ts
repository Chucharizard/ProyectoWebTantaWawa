import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { evaluacionService } from '../services/evaluacionService';
import { EvaluacionCrearDto, EvaluacionActualizarDto } from '../types/evaluacion.types';

const QUERY_KEY = 'evaluaciones';

export const useEvaluacionesPorCurso = (cursoId: number) => {
  return useQuery({
    queryKey: [QUERY_KEY, 'curso', cursoId],
    queryFn: () => evaluacionService.obtenerPorCurso(cursoId),
    enabled: !!cursoId,
  });
};

export const useEvaluacion = (id: number) => {
  return useQuery({
    queryKey: [QUERY_KEY, id],
    queryFn: () => evaluacionService.obtenerPorId(id),
    enabled: !!id,
  });
};

export const useResultadosEvaluacion = (evaluacionId: number) => {
  return useQuery({
    queryKey: [QUERY_KEY, evaluacionId, 'resultados'],
    queryFn: () => evaluacionService.obtenerResultados(evaluacionId),
    enabled: !!evaluacionId,
  });
};

export const useCrearEvaluacion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: EvaluacionCrearDto) => evaluacionService.crear(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'curso', variables.cursoId] });
    },
  });
};

export const useActualizarEvaluacion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: EvaluacionActualizarDto) => evaluacionService.actualizar(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, variables.id] });
    },
  });
};

export const useEliminarEvaluacion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => evaluacionService.eliminar(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
};
