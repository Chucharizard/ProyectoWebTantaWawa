import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { cursoService } from '../services/cursoService';
import { CursoCrearDto, CursoActualizarDto } from '../types/curso.types';

const QUERY_KEY = 'cursos';

export const useCursos = () => {
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: cursoService.obtenerTodos,
  });
};

export const useCurso = (id: number) => {
  return useQuery({
    queryKey: [QUERY_KEY, id],
    queryFn: () => cursoService.obtenerPorId(id),
    enabled: !!id,
  });
};

export const useCrearCurso = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CursoCrearDto) => cursoService.crear(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
};

export const useActualizarCurso = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CursoActualizarDto) => cursoService.actualizar(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, variables.id] });
    },
  });
};

export const useEliminarCurso = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => cursoService.eliminar(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
};
