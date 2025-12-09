import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { usuarioService } from '../services/usuarioService';

export const useUsuarios = () => {
  return useQuery({
    queryKey: ['usuarios'],
    queryFn: usuarioService.obtenerTodos,
  });
};

export const useCrearUsuario = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: usuarioService.crear,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['usuarios'] });
    },
  });
};

export const useActualizarUsuario = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: usuarioService.actualizar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['usuarios'] });
    },
  });
};

export const useEliminarUsuario = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: usuarioService.eliminar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['usuarios'] });
    },
  });
};
