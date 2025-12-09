import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { resultadoService } from '../services/resultadoService';

export const useResultadosPorEstudiante = (estudianteId) => {
  return useQuery({
    queryKey: ['resultados', 'estudiante', estudianteId],
    queryFn: () => resultadoService.obtenerPorEstudiante(estudianteId),
    enabled: !!estudianteId,
  });
};

export const useResultadosPorEstudianteCurso = (estudianteId, cursoId) => {
  return useQuery({
    queryKey: ['resultados', 'estudiante', estudianteId, 'curso', cursoId],
    queryFn: () => resultadoService.obtenerPorEstudianteCurso(estudianteId, cursoId),
    enabled: !!estudianteId && !!cursoId,
  });
};

export const useCrearResultado = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: resultadoService.crear,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resultados'] });
      queryClient.invalidateQueries({ queryKey: ['evaluaciones'] });
    },
  });
};
