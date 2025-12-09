// Rol Types
export interface Rol {
  id: number;
  nombreRol: string;
}

export const ROLES = {
  ADMINISTRADOR: 'Administrador',
  DOCENTE: 'Docente',
  ESTUDIANTE: 'Estudiante',
} as const;

export type RoleName = typeof ROLES[keyof typeof ROLES];
