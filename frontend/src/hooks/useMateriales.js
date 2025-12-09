import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { materialService } from '../services/materialService';

export const useMaterialesPorCurso = (cursoId) => {
  return useQuery({
    queryKey: ['materiales', 'curso', cursoId],
    queryFn: () => materialService.obtenerPorCurso(cursoId),
    enabled: !!cursoId,
  });
};

export const useCrearMaterial = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: materialService.crear,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['materiales'] });
    },
  });
};

export const useEliminarMaterial = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: materialService.eliminar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['materiales'] });
    },
  });
};
