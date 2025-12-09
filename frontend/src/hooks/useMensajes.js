import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { mensajeService } from '../services/mensajeService';

export const useMensajesPorCurso = (cursoId) => {
  return useQuery({
    queryKey: ['mensajes', 'curso', cursoId],
    queryFn: () => mensajeService.obtenerPorCurso(cursoId),
    enabled: !!cursoId,
  });
};

export const useCrearMensaje = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: mensajeService.crear,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mensajes'] });
    },
  });
};

export const useEliminarMensaje = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: mensajeService.eliminar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mensajes'] });
    },
  });
};
