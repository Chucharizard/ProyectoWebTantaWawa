import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { usuarioService } from '../services/usuarioService';
import {
  Usuario,
  UsuarioCrearDto,
  UsuarioActualizarDto,
  UsuarioCambiarPasswordDto,
  UsuarioResetPasswordDto,
} from '../types/usuario.types';

const QUERY_KEY = 'usuarios';

export const useUsuarios = () => {
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: usuarioService.obtenerTodos,
  });
};

export const useUsuario = (id: number) => {
  return useQuery({
    queryKey: [QUERY_KEY, id],
    queryFn: () => usuarioService.obtenerPorId(id),
    enabled: !!id,
  });
};

export const useBuscarUsuariosPorCI = (ci: string) => {
  return useQuery({
    queryKey: [QUERY_KEY, 'buscar-ci', ci],
    queryFn: () => usuarioService.buscarPorCI(ci),
    enabled: ci.length >= 3,
  });
};

export const useCrearUsuario = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UsuarioCrearDto) => usuarioService.crear(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
};

export const useActualizarUsuario = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UsuarioActualizarDto) => usuarioService.actualizar(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, variables.id] });
    },
  });
};

export const useCambiarPassword = () => {
  return useMutation({
    mutationFn: (data: UsuarioCambiarPasswordDto) => usuarioService.cambiarPassword(data),
  });
};

export const useEliminarUsuario = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => usuarioService.eliminar(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
};
