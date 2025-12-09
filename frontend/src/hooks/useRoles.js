import { useQuery } from '@tanstack/react-query';
import { rolService } from '../services/rolService';

export const useRoles = () => {
  return useQuery({
    queryKey: ['roles'],
    queryFn: rolService.obtenerTodos,
  });
};
