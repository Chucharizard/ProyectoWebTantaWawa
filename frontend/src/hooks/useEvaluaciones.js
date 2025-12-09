import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { evaluacionService } from '../services/evaluacionService';

export const useEvaluacionesPorCurso = (cursoId) => {
  return useQuery({
    queryKey: ['evaluaciones', 'curso', cursoId],
    queryFn: () => evaluacionService.obtenerPorCurso(cursoId),
    enabled: !!cursoId,
  });
};

export const useCrearEvaluacion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: evaluacionService.crear,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['evaluaciones'] });
    },
  });
};

export const useEliminarEvaluacion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: evaluacionService.eliminar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['evaluaciones'] });
    },
  });
};
