import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { cursoService } from '../services/cursoService';

const QUERY_KEY = 'cursos';

export const useCursos = () => {
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: cursoService.obtenerTodos,
  });
};

export const useCursosPorDocente = (docenteId) => {
  return useQuery({
    queryKey: [QUERY_KEY, 'docente', docenteId],
    queryFn: async () => {
      const cursos = await cursoService.obtenerTodos();
      return cursos.filter(curso => curso.docenteId === docenteId);
    },
    enabled: !!docenteId,
  });
};

export const useCurso = (id) => {
  return useQuery({
    queryKey: [QUERY_KEY, id],
    queryFn: () => cursoService.obtenerPorId(id),
    enabled: !!id,
  });
};

export const useCrearCurso = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => cursoService.crear(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
};

export const useActualizarCurso = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => cursoService.actualizar(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, variables.id] });
    },
  });
};

export const useEliminarCurso = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => cursoService.eliminar(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
};
