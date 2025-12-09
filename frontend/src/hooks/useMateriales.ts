import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { materialService } from '../services/materialService';
import { MaterialCrearDto, MaterialActualizarDto } from '../types/material.types';

const QUERY_KEY = 'materiales';

export const useMaterialesPorCurso = (cursoId: number) => {
  return useQuery({
    queryKey: [QUERY_KEY, 'curso', cursoId],
    queryFn: () => materialService.obtenerPorCurso(cursoId),
    enabled: !!cursoId,
  });
};

export const useMaterial = (id: number) => {
  return useQuery({
    queryKey: [QUERY_KEY, id],
    queryFn: () => materialService.obtenerPorId(id),
    enabled: !!id,
  });
};

export const useCrearMaterial = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: MaterialCrearDto) => materialService.crear(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'curso', variables.cursoId] });
    },
  });
};

export const useActualizarMaterial = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: MaterialActualizarDto) => materialService.actualizar(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      if (data.data?.cursoId) {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'curso', data.data.cursoId] });
      }
    },
  });
};

export const useEliminarMaterial = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => materialService.eliminar(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
};
