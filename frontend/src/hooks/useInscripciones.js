import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { inscripcionService } from '../services/inscripcionService';

export const useInscripciones = () => {
  return useQuery({
    queryKey: ['inscripciones'],
    queryFn: inscripcionService.obtenerTodas,
  });
};

export const useInscripcionesPorEstudiante = (estudianteId) => {
  return useQuery({
    queryKey: ['inscripciones', 'estudiante', estudianteId],
    queryFn: () => inscripcionService.obtenerPorEstudiante(estudianteId),
    enabled: !!estudianteId,
  });
};

export const useCrearInscripcion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: inscripcionService.crear,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inscripciones'] });
    },
  });
};

export const useEliminarInscripcion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: inscripcionService.eliminar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inscripciones'] });
    },
  });
};
